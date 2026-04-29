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
        <path d="M2 11.5V2.5" stroke="#fffdf6" strokeWidth="1.4" strokeLinecap="square" />
        <path d="M2 2.5L5.2 8" stroke="#fffdf6" strokeWidth="1.4" strokeLinecap="square" />
        <path d="M5.2 8L8.4 2.5" stroke="#fffdf6" strokeWidth="1.4" strokeLinecap="square" />
        <path d="M8.4 2.5V11.5" stroke="#fffdf6" strokeWidth="1.4" strokeLinecap="square" />
        <path d="M11 2.5V11.5" stroke="#fffdf6" strokeWidth="1.4" strokeLinecap="square" />
      </svg>
    </span>
  );
}
