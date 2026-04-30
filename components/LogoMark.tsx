export function LogoMark() {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 26,
        height: 26,
        backgroundColor: 'var(--ink)',
        borderRadius: 3,
        flexShrink: 0,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        {/* M */}
        <path d="M1 11.5V2.5" stroke="#fffdf6" strokeWidth="1.4" strokeLinecap="square" />
        <path d="M1 2.5L4 8" stroke="#fffdf6" strokeWidth="1.4" strokeLinecap="square" />
        <path d="M4 8L7 2.5" stroke="#fffdf6" strokeWidth="1.4" strokeLinecap="square" />
        <path d="M7 2.5V11.5" stroke="#fffdf6" strokeWidth="1.4" strokeLinecap="square" />
        {/* H */}
        <path d="M9 2.5V11.5" stroke="#fffdf6" strokeWidth="1.4" strokeLinecap="square" />
        <path d="M9 7H13" stroke="#fffdf6" strokeWidth="1.4" strokeLinecap="square" />
        <path d="M13 2.5V11.5" stroke="#fffdf6" strokeWidth="1.4" strokeLinecap="square" />
      </svg>
    </span>
  );
}
