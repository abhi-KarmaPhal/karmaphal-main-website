export function BrandIcon({ className, style }: { className?: string, style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M12 3L20 12L12 21L4 12L12 3Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 6.5L16.5 12L12 17.5L7.5 12L12 6.5Z" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function WebIcon({ className, style }: { className?: string, style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="9" x2="12" y2="19" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <circle cx="6" cy="7" r="0.8" fill="currentColor" />
      <circle cx="8" cy="7" r="0.8" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export function ContentIcon({ className, style }: { className?: string, style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9L15 12L10 15V9Z" fill="currentColor" />
      <circle cx="12" cy="12" r="11.5" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="2 3" />
    </svg>
  );
}

export function AIIcon({ className, style }: { className?: string, style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <circle cx="12" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="10.8" y1="8" x2="7.2" y2="14" stroke="currentColor" strokeWidth="1.5" />
      <line x1="13.2" y1="8" x2="16.8" y2="14" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="16" x2="15" y2="16" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

export function DeckIcon({ className, style }: { className?: string, style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <rect x="4" y="6" width="16" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="6" y="4" width="12" height="2" fill="currentColor" opacity="0.3" />
      <path d="M8 10L12 14L16 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function InfinityIcon({ className, style }: { className?: string, style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12ZM8 12C8 14.2091 6.20914 16 4 16C1.79086 16 0 14.2091 0 12C0 9.79086 1.79086 8 4 8C6.20914 8 8 9.79086 8 12ZM16 12C16 9.79086 17.7909 8 20 8C22.2091 8 24 9.79086 24 12C24 14.2091 22.2091 16 20 16C17.7909 16 16 14.2091 16 12Z" fill="currentColor" fillOpacity="0.2"/>
      <path d="M12 12C12 9.79086 10.2091 8 8 8C5.79086 8 4 9.79086 4 12C4 14.2091 5.79086 16 8 16C10.2091 16 12 14.2091 12 12ZM12 12C12 14.2091 13.7909 16 16 16C18.2091 16 20 14.2091 20 12C20 9.79086 18.2091 8 16 8C13.7909 8 12 9.79086 12 12Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}
