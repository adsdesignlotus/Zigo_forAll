interface ZigiProps {
  size?: number;
  mood?: 'default' | 'wave' | 'read' | 'think' | 'sad';
}

export function ZigiMascot({ size = 80, mood = 'default' }: ZigiProps) {
  const w = size;
  const h = Math.round(size * 1.15);

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 100 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── ear tufts ── */}
      <path d="M30 22 L24 5 L39 18Z" fill="#0552C8" />
      <path d="M70 22 L76 5 L61 18Z" fill="#0552C8" />

      {/* ── head ── */}
      <circle cx="50" cy="40" r="28" fill="#1A78FF" />

      {/* face highlight */}
      <ellipse cx="50" cy="46" rx="19" ry="16" fill="#60A5FA" opacity="0.35" />

      {/* ── left eye ── */}
      <circle cx="37" cy="37" r="10.5" fill="white" />
      <circle cx="37" cy="37" r="6.8" fill="#0F172A" />
      <circle cx="40" cy="34" r="2.6" fill="white" />

      {/* ── right eye ── */}
      <circle cx="63" cy="37" r="10.5" fill="white" />
      <circle cx="63" cy="37" r="6.8" fill="#0F172A" />
      <circle cx="66" cy="34" r="2.6" fill="white" />

      {/* blush */}
      <circle cx="26" cy="46" r="5" fill="#FF9EC4" opacity="0.5" />
      <circle cx="74" cy="46" r="5" fill="#FF9EC4" opacity="0.5" />

      {/* ── beak ── */}
      <path d="M43 49 L50 57 L57 49Z" fill="#FF9500" />

      {/* ── body ── */}
      <ellipse cx="50" cy="84" rx="27" ry="24" fill="#1A78FF" />
      {/* chest */}
      <ellipse cx="50" cy="87" rx="18" ry="17" fill="#60A5FA" opacity="0.4" />

      {/* ── wings ── */}
      {mood === 'wave' ? (
        <>
          {/* left wing normal */}
          <path d="M23 70 Q11 75 13 88 Q17 95 25 86Z" fill="#0552C8" />
          {/* right wing raised */}
          <path d="M77 70 Q92 55 90 66 Q86 76 77 72Z" fill="#0552C8" />
        </>
      ) : mood === 'read' ? (
        <>
          <path d="M23 70 Q11 75 13 88 Q17 95 25 86Z" fill="#0552C8" />
          <path d="M77 70 Q89 74 87 87 Q83 94 75 85Z" fill="#0552C8" />
          {/* tiny book */}
          <rect x="34" y="96" width="32" height="22" rx="3" fill="#FFCC00" />
          <rect x="50" y="96" width="2" height="22" fill="#F59E0B" />
          <line x1="38" y1="103" x2="48" y2="103" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="38" y1="108" x2="48" y2="108" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="52" y1="103" x2="62" y2="103" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="52" y1="108" x2="62" y2="108" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
        </>
      ) : mood === 'think' ? (
        <>
          <path d="M23 70 Q11 75 13 88 Q17 95 25 86Z" fill="#0552C8" />
          <path d="M77 70 Q89 74 87 87 Q83 94 75 85Z" fill="#0552C8" />
          {/* thought dots */}
          <circle cx="72" cy="18" r="3" fill="#FFCC00" />
          <circle cx="80" cy="11" r="4.5" fill="#FFCC00" />
          <circle cx="89" cy="4" r="6" fill="#FFCC00" />
          <text x="84" y="9" textAnchor="middle" fontSize="7" fill="#0F172A" fontFamily="Nunito, sans-serif" fontWeight="900">?</text>
        </>
      ) : mood === 'sad' ? (
        <>
          <path d="M23 70 Q11 75 13 88 Q17 95 25 86Z" fill="#0552C8" />
          <path d="M77 70 Q89 74 87 87 Q83 94 75 85Z" fill="#0552C8" />
          {/* sad mouth */}
          <path d="M44 60 Q50 55 56 60" stroke="#0552C8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          {/* default wings */}
          <path d="M23 70 Q11 75 13 88 Q17 95 25 86Z" fill="#0552C8" />
          <path d="M77 70 Q89 74 87 87 Q83 94 75 85Z" fill="#0552C8" />
        </>
      )}

      {/* ── feet ── (only when not reading) */}
      {mood !== 'read' && (
        <g stroke="#FF9500" strokeWidth="2.8" strokeLinecap="round">
          <line x1="40" y1="106" x2="33" y2="113" />
          <line x1="40" y1="106" x2="40" y2="114" />
          <line x1="40" y1="106" x2="47" y2="113" />
          <line x1="60" y1="106" x2="53" y2="113" />
          <line x1="60" y1="106" x2="60" y2="114" />
          <line x1="60" y1="106" x2="67" y2="113" />
        </g>
      )}
    </svg>
  );
}

export function ZigiSmall({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#1A78FF" />
      {/* ear tufts */}
      <path d="M12 9 L9 3 L15 8Z" fill="#0552C8" />
      <path d="M28 9 L31 3 L25 8Z" fill="#0552C8" />
      {/* eyes */}
      <circle cx="15" cy="18" r="5.5" fill="white" />
      <circle cx="15" cy="18" r="3.5" fill="#0F172A" />
      <circle cx="16.5" cy="16.5" r="1.3" fill="white" />
      <circle cx="25" cy="18" r="5.5" fill="white" />
      <circle cx="25" cy="18" r="3.5" fill="#0F172A" />
      <circle cx="26.5" cy="16.5" r="1.3" fill="white" />
      {/* beak */}
      <path d="M17.5 22 L20 25 L22.5 22Z" fill="#FF9500" />
    </svg>
  );
}
