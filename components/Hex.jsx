const f1 = (x) => x.toFixed(1);
const pts = (vals) =>
  vals.map((x, i) => {
    const t = -Math.PI / 2 + (i * Math.PI) / 3;
    return (160 + ((105 * x) / 10) * Math.cos(t)).toFixed(1) + ',' + (160 + ((105 * x) / 10) * Math.sin(t)).toFixed(1);
  });

export default function Hex({ sub }) {
  const p = pts(sub.map((q) => q[1]));
  return (
    <svg viewBox="-30 4 380 320">
      {[2.5, 5, 7.5, 10].map((v) => <polygon key={v} className="ring" points={pts(Array(6).fill(v)).join(' ')} />)}
      {sub.map((q, i) => {
        const t = -Math.PI / 2 + (i * Math.PI) / 3, c = Math.cos(t), s = Math.sin(t), x = (160 + 134 * c).toFixed(1);
        return (
          <g key={q[0]}>
            <line className="ax" x1="160" y1="160" x2={(160 + 105 * c).toFixed(1)} y2={(160 + 105 * s).toFixed(1)} />
            <text x={x} y={(162 + 134 * s).toFixed(1)} textAnchor={Math.abs(c) < 0.3 ? 'middle' : c > 0 ? 'start' : 'end'}>
              {q[0].replace('Flavour c', 'C')}
              <tspan x={x} dy="18">{f1(q[1])}</tspan>
            </text>
          </g>
        );
      })}
      <polygon className="sh" points={p.join(' ')} />
      {p.map((z, i) => { const k = z.split(','); return <circle key={i} className="dt" cx={k[0]} cy={k[1]} r="4.5" />; })}
    </svg>
  );
}
