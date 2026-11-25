import { ALT, N, V, P, R, RM, O } from './data';

export const TG = { b: ['tg', 'Book'], m: ['tg m', 'Book + outside'], x: ['tg x', 'Outside'] };
export const cl = (x, a = 0, b = 10) => Math.max(a, Math.min(b, x));

// s = { o: origin index, v: varietal index, p: process index, r: roast index (0-2), alt: metres }
export function compute(s) {
  const o = O[s.o], v = V[s.v], p = P[s.p], r = s.r, alt = s.alt;
  const d = cl((alt - 1300) / 700, -1.4, 1.5) * v[2];
  const altv = ALT.map((x) => x * d);
  const pre = o[2].map((b, i) => cl(b + v[3][i] + p[2][i] + altv[i]));
  const a = pre.slice();
  a[0] *= RM.A[r]; a[4] *= RM.F[r]; a[5] *= RM.L[r];
  a[1] += RM.S[r]; a[2] += RM.B[r]; a[3] += RM.T[r]; a[6] += RM.C[r];
  for (let i = 0; i < 8; i++) a[i] = cl(a[i]);
  const [A, S, Bo, Bt, Fr, Fl, Cn, Es] = a;
  const clean = cl(o[3] + v[4] + p[3]);

  const aq = 10 * (1 - Math.exp(-A / 4.5));
  const mq = cl(10 - Math.abs(Bo - 6) * 1.3);
  const q = [Fr, Fl, Cn, 0.6 * Es];
  const sm = q.reduce((x, y) => x + y, 0) || 1;
  const H = -q.reduce((x, y) => x + (y > 0 ? (y / sm) * Math.log(y / sm) : 0), 0) / Math.log(4);
  const cx = 10 * (0.55 * Math.min(1, sm / 14) + 0.45 * H);
  const bal = cl(10 - 1.6 * Math.abs(0.8 * (A + Bt) - S) - 0.25 * (10 - clean));
  // Hexagon order: acidity (index 3) sits directly opposite bitterness (index 0)
  const sub = [
    ['Bitterness', cl(0.6 * Bt + 0.6 * Cn)],
    ['Flavour complexity', cx],
    ['Cleanliness', clean],
    ['Acidity', aq],
    ['Balance', bal],
    ['Mouthfeel', mq],
  ];

  const W = {};
  const add = (src, who) => {
    for (const k in src) {
      W[k] = W[k] || { t: 0, by: {} };
      W[k].t += src[k];
      W[k].by[who] = (W[k].by[who] || 0) + src[k];
    }
  };
  add(o[5], o[0]); add(v[5], v[0]); add(p[4], p[0]); add(R[r][2], R[r][0] + ' roast');
  const sc = Object.keys(W).map((k) => {
    const n = N[k];
    return {
      k, n,
      w: W[k].t * n[2][r] * Math.max(0.2, 1 + 0.35 * n[3] * d),
      by: Object.entries(W[k].by).sort((x, y) => y[1] - x[1])[0][0],
    };
  });
  const notes = sc.map((x) => ({ k: x.k, w: x.w }));
  const pick = [], used = {};
  while (pick.length < 3 && sc.length) {
    sc.forEach((x) => { x.e = x.w * (used[x.n[1]] ? 0.72 : 1); });
    sc.sort((x, y) => y.e - x.e);
    const x = sc.shift();
    pick.push(x);
    used[x.n[1]] = 1;
  }

  let fam =
    Bt >= 5.5 ? 'Bold and roasty'
    : Es >= 4.5 ? 'Earthy and spiced'
    : Fl >= 5.5 && Fl >= Fr - 1 ? 'Floral and delicate'
    : Fr >= 6 && A >= 6 ? 'Bright and fruity'
    : Fr >= 5.5 ? 'Sweet and fruity'
    : Cn >= 4 ? 'Chocolatey and round'
    : 'Soft and sweet';
  if (clean < 4.5) fam += ', with a wild edge';

  const out = alt < o[4][0] || alt > o[4][1];
  return { o, v, p, a, pre, altv, sub, pick, fam, out, notes };
}
