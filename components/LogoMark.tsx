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
        <path d="M0.5 11.5V2.5H1.974L3.8 6.362L5.626 2.5H7.1V11.5H5.7V5.619L3.8 9.639L1.9 5.619V11.5Z" fill="#fffdf6" />
        {/* H */}
        <path d="M8.3 2.5H9.7V6.3H12.1V2.5H13.5V11.5H12.1V7.7H9.7V11.5H8.3Z" fill="#fffdf6" />
      </svg>
    </span>
  );
}
