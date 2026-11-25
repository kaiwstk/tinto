import { compute } from './model';
import { N, O, V, P, R } from './data';

export const valid = (s) => !!(s && O[s.o] && V[s.v] && P[s.p] && R[s.r] && Number.isFinite(s.alt));

export function describe(s) {
  return {
    title: O[s.o][0] + ' · ' + V[s.v][0],
    sub: P[s.p][0] + ' · ' + R[s.r][0] + ' roast · ' + s.alt.toLocaleString('en-US') + ' m',
  };
}

// Combine saved profiles into one fingerprint.
// Traits: simple mean of each of the six hexagon values.
// Notes: every profile's note weights are normalised to sum to 1 so each profile counts equally,
// then summed. The top three come from that sum, with the same small penalty for repeating a note family.
export function aggregate(list) {
  const comps = list.map((x) => compute(x.sel));
  const n = comps.length;
  const traits = comps[0].sub.map((q, i) => [q[0], comps.reduce((t, c) => t + c.sub[i][1], 0) / n]);

  const W = {};
  comps.forEach((c) => {
    const tot = c.notes.reduce((t, x) => t + x.w, 0) || 1;
    const top5 = new Set([...c.notes].sort((a, b) => b.w - a.w).slice(0, 5).map((x) => x.k));
    c.notes.forEach((x) => {
      const e = W[x.k] || (W[x.k] = { k: x.k, w: 0, count: 0 });
      e.w += x.w / tot;
      if (top5.has(x.k)) e.count += 1;
    });
  });

  const pool = Object.values(W);
  const pick = [], used = {};
  while (pick.length < 3 && pool.length) {
    pool.forEach((x) => { x.e = x.w * (used[N[x.k][1]] ? 0.72 : 1); });
    pool.sort((a, b) => b.e - a.e);
    const x = pool.shift();
    pick.push({ k: x.k, n: N[x.k], count: x.count });
    used[N[x.k][1]] = 1;
  }
  return { n, traits, pick };
}
