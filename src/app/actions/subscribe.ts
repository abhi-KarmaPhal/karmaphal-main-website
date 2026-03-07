"use server";

import { supabase } from "@/lib/supabase";
import { sendWelcomeEmail } from "@/lib/email";
import { headers } from "next/headers";

// ── TYPES ──
interface SubscribeResult {
  success: boolean;
  message: string;
  type: "success" | "duplicate" | "error" | "bot";
}

// ── VALIDATION ──
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const MAX_EMAIL_LENGTH = 254;

// Disposable email domains (basic list — expand as needed)
const DISPOSABLE_DOMAINS = new Set([
  "tempmail.com", "throwaway.email", "guerrillamail.com",
  "mailinator.com", "yopmail.com", "10minutemail.com",
  "trashmail.com", "fakeinbox.com", "sharklasers.com",
  "guerrillamailblock.com", "grr.la", "dispostable.com",
]);

// ── RATE LIMITING (in-memory, resets on server restart) ──
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

// ── SERVER ACTION ──
export async function subscribeEmail(formData: FormData): Promise<SubscribeResult> {
  try {
    // 1. Honeypot check (bot trap — hidden field should be empty)
    const honeypot = formData.get("website") as string;
    if (honeypot) {
      // Bot detected — return fake success (don't reveal the trap)
      return { success: true, message: "You're on the list!", type: "bot" };
    }

    // 2. Extract & sanitize email
    const rawEmail = formData.get("email") as string;
    if (!rawEmail) {
      return { success: false, message: "Please enter your email address.", type: "error" };
    }

    const email = rawEmail.trim().toLowerCase();

    // 3. Validate email format
    if (email.length > MAX_EMAIL_LENGTH) {
      return { success: false, message: "Email address is too long.", type: "error" };
    }

    if (!EMAIL_REGEX.test(email)) {
      return { success: false, message: "Please enter a valid email address.", type: "error" };
    }

    // 4. Check disposable domains
    const domain = email.split("@")[1];
    if (DISPOSABLE_DOMAINS.has(domain)) {
      return { success: false, message: "Please use a permanent email address.", type: "error" };
    }

    // 5. Rate limiting
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const userAgent = headersList.get("user-agent") || "unknown";

    if (!checkRateLimit(ip)) {
      return { success: false, message: "Too many attempts. Please try again later.", type: "error" };
    }

    // 6. Insert into Supabase
    const { error } = await supabase
      .from("subscribers")
      .insert({
        email,
        source: "coming-soon",
        ip_address: ip,
        user_agent: userAgent,
      });

    // 7. Handle duplicate
    if (error) {
      if (error.code === "23505") {
        // Unique constraint violation — already subscribed
        return { success: true, message: "You're already on the list! We'll notify you.", type: "duplicate" };
      }
      console.error("Supabase error:", error.code, error.message, error.details, error.hint);
      return { success: false, message: "Something went wrong. Please try again.", type: "error" };
    }

    // 8. Send welcome email (fire-and-forget — don't block response)
    sendWelcomeEmail(email).catch(() => {});

    // 9. Success
    return { success: true, message: "You're on the list! We'll notify you when we launch.", type: "success" };

  } catch (err) {
    console.error("Subscribe error:", err instanceof Error ? err.message : err, err);
    return { success: false, message: "Something went wrong. Please try again.", type: "error" };
  }
}
