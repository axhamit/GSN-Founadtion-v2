import type { Theme } from "@/data/courses";

/** Original SVG illustrations, one visual personality per theme. No external assets. */
export default function CourseArt({ theme, large = false }: { theme: Theme; large?: boolean }) {
  const id = `g-${theme}`;
  return (
    <svg viewBox="0 0 400 240" role="img" aria-hidden="true" className={large ? "art art-lg" : "art"} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0876C9" />
          <stop offset="1" stopColor="#19A8E0" />
        </linearGradient>
        <radialGradient id={`${id}-r`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#19A8E0" stopOpacity=".9" />
          <stop offset="1" stopColor="#0876C9" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="240" fill="#0D1426" />
      {theme === "genai" && (
        <g>
          <circle cx="200" cy="120" r="95" fill={`url(#${id}-r)`} opacity=".55" />
          <circle cx="200" cy="120" r="46" fill={`url(#${id})`} />
          {Array.from({ length: 14 }).map((_, i) => {
            const a = (i / 14) * Math.PI * 2;
            const x = 200 + Math.cos(a) * 92, y = 120 + Math.sin(a) * 70;
            return <g key={i}><line x1="200" y1="120" x2={x} y2={y} stroke="#0876C9" strokeOpacity=".5" /><circle cx={x} cy={y} r="4" fill="#19A8E0" /></g>;
          })}
        </g>
      )}
      {theme === "ml" && (
        <g fill="none" stroke={`url(#${id})`} strokeWidth="2">
          <rect x="30" y="90" width="70" height="60" rx="8" /><rect x="165" y="50" width="70" height="60" rx="8" /><rect x="165" y="130" width="70" height="60" rx="8" /><rect x="300" y="90" width="70" height="60" rx="8" />
          <path d="M100 120 H130 V80 H165 M100 120 H130 V160 H165 M235 80 H265 V120 H300 M235 160 H265 V120" />
          <path d="M45 135 l14 -18 14 10 14 -22" stroke="#19A8E0" />
          <circle cx="335" cy="120" r="14" stroke="#103F78" />
        </g>
      )}
      {theme === "engineering" && (
        <g stroke="#103F78" strokeWidth="2" fill="#0D1426">
          <path d="M200 60 L120 110 M200 60 L280 110 M120 110 V170 M280 110 V170 M120 170 L200 200 L280 170 M200 60 V200" strokeOpacity=".6" fill="none" />
          {[[200, 60], [120, 110], [280, 110], [120, 170], [280, 170], [200, 200]].map(([x, y], i) => (
            <rect key={i} x={x - 22} y={y - 14} width="44" height="28" rx="6" stroke={i % 2 ? "#19A8E0" : "#0876C9"} />
          ))}
        </g>
      )}
      {theme === "rag" && (
        <g>
          {[0, 1, 2].map((i) => <rect key={i} x={36 + i * 14} y={60 + i * 14} width="70" height="90" rx="6" fill="#111A33" stroke="#19A8E0" strokeOpacity={0.9 - i * 0.25} />)}
          <path d="M120 120 C170 120 160 70 220 70 M120 120 C170 120 160 170 220 170 M120 120 H220" stroke="#0876C9" strokeWidth="2" fill="none" />
          {[[240, 70], [240, 120], [240, 170], [300, 95], [300, 145], [350, 120]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i > 2 ? 7 : 10} fill={i === 5 ? "#19A8E0" : "#103F78"} />)}
          <path d="M250 70 L292 95 M250 120 L292 95 M250 120 L292 145 M250 170 L292 145 M308 95 L344 120 M308 145 L344 120" stroke="#A7B0C0" strokeOpacity=".5" />
        </g>
      )}
      {theme === "prompt" && (
        <g>
          <rect x="30" y="50" width="150" height="140" rx="10" fill="#111A33" stroke="#0876C9" />
          <rect x="220" y="50" width="150" height="140" rx="10" fill="#111A33" stroke="#19A8E0" />
          {[0, 1, 2, 3].map((i) => <rect key={i} x="44" y={68 + i * 24} width={i === 3 ? 60 : 120 - i * 10} height="8" rx="4" fill="#0876C9" opacity=".7" />)}
          {[0, 1, 2, 3].map((i) => <rect key={i} x="234" y={68 + i * 24} width={110 - i * 14} height="8" rx="4" fill="#19A8E0" opacity=".7" />)}
          <path d="M188 120 H212 M204 112 L212 120 L204 128" stroke="url(#g-prompt)" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      )}
      {theme === "exam" && (
        <g fill="none" strokeWidth="2">
          <circle cx="120" cy="120" r="46" stroke="#19A8E0" /><ellipse cx="120" cy="120" rx="46" ry="16" stroke="#19A8E0" strokeOpacity=".6" /><ellipse cx="120" cy="120" rx="16" ry="46" stroke="#19A8E0" strokeOpacity=".6" /><circle cx="120" cy="120" r="5" fill="#19A8E0" />
          <path d="M230 170 L270 70 L310 170 M246 134 H294" stroke="#0876C9" /><path d="M330 90 q20 -30 40 0 t-20 40" stroke="#103F78" />
        </g>
      )}
      {theme === "career" && (
        <g fill="none" stroke={`url(#${id})`} strokeWidth="3" strokeLinecap="round">
          <path d="M40 190 L120 150 L190 160 L270 90 L360 50" /><path d="M360 50 h-26 M360 50 v26" />
          {[[40, 190], [120, 150], [190, 160], [270, 90]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="7" fill="#0D1426" stroke="#19A8E0" />)}
        </g>
      )}
    </svg>
  );
}
