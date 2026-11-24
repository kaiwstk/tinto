'use client';
import { useState } from 'react';
import { AX, V, P, R, O } from '../lib/data';
import { compute, TG } from '../lib/model';

const f1 = (x) => x.toFixed(1);
const REGIONS = ['Africa', 'Asia', 'Americas'];
const pts = (vals) =>
  vals
    .map((x, i) => {
      const t = -Math.PI / 2 + (i * Math.PI) / 3;
      return (160 + ((105 * x) / 10) * Math.cos(t)).toFixed(1) + ',' + (160 + ((105 * x) / 10) * Math.sin(t)).toFixed(1);
    })
    .join(' ');

const Tag = ({ t }) => <span className={TG[t][0]}>{TG[t][1]}</span>;
const Row = ({ n, x, total }) => (
  <tr className={total ? 't' : undefined}>
    <td>{n}</td>
    {x.map((y, i) => (
      <td key={i} className={total ? '' : y > 0.05 ? 'p' : y < -0.05 ? 'n' : ''}>
        {total ? f1(y) : (y > 0 ? '+' : '') + f1(y)}
      </td>
    ))}
  </tr>
);

export default function Dashboard() {
  const [s, setS] = useState({ o: 3, v: 6, p: 1, r: 0, alt: 1800 });
  const on = (k) => (e) => setS((prev) => ({ ...prev, [k]: +e.target.value }));
  const { o, v, p, a, pre, altv, sub, pick, fam, out } = compute(s);
  const alt = s.alt;

  return (
    <div className="wrap">
      <header><p className="ey">TINTO</p><h1>Coffee Flavour Index</h1>
<p>Choose a varietal, process, roast, altitude and origin. The dashboard adds up the flavour each one brings, using the figures from <i>The World Atlas of Coffee</i>, and predicts the cup.</p></header>
      <div className="grid">
        <form className="card ctl" onSubmit={(e) => e.preventDefault()}>
          <div className="f">
            <label htmlFor="o">Origin <Tag t="b" /></label>
            <select id="o" value={s.o} onChange={on('o')}>
              {REGIONS.map((g) => (
                <optgroup key={g} label={g}>
                  {O.map((x, i) => x[1] === g && <option key={i} value={i}>{x[0]}</option>)}
                </optgroup>
              ))}
            </select>
            <p className="hint">{o[6] + ' Book altitude range: ' + o[4][0].toLocaleString('en-US') + '–' + o[4][1].toLocaleString('en-US') + ' m.'}</p>
          </div>
          <div className="f">
            <label htmlFor="v">Varietal <Tag t={v[1]} /></label>
            <select id="v" value={s.v} onChange={on('v')}>
              {V.map((x, i) => <option key={i} value={i}>{x[0]}</option>)}
            </select>
          </div>
          <div className="f">
            <label htmlFor="p">Fermentation / processing <Tag t="b" /></label>
            <select id="p" value={s.p} onChange={on('p')}>
              {P.map((x, i) => <option key={i} value={i}>{x[0]}</option>)}
            </select>
          </div>
          <div className="f">
            <label htmlFor="r">Roast level <Tag t="b" /></label>
            <select id="r" value={s.r} onChange={on('r')}>
              {R.map((x, i) => <option key={i} value={i}>{x[0]}</option>)}
            </select>
          </div>
          <div className="f">
            <label htmlFor="a">Altitude <Tag t="m" /></label>
            <input type="range" id="a" min="100" max="2500" step="50" value={alt} onChange={on('alt')} />
            <p className="hint">
              <b>{alt} m ({Math.round(alt * 3.281).toLocaleString('en-US')} ft)</b>{' '}
              <button className="lk" type="button" onClick={() => setS((prev) => ({ ...prev, alt: Math.round((o[4][0] + o[4][1]) / 2 / 50) * 50 }))}>
                Use this origin’s typical altitude
              </button>
            </p>
            <p className="hint">
              {out ? <span className="warn">Outside the range the book lists for {o[0]}. The profile is still calculated.</span> : <>Within the book’s range for {o[0]}.</>}{' '}
              {alt >= 1500 ? 'High-grown coffee is denser: more acidity and fruit.' : alt <= 900 ? 'Low-grown coffee is softer: less acidity, more body.' : 'Mid altitude leaves the profile close to its starting point.'}
            </p>
          </div>
        </form>

        <div className="res">
          <section className="card">
            <div className="hero">
              <div>
                <p className="hint">Cup shape: the further a corner reaches, the stronger that trait.</p>
                <h2>{fam}</h2>
                <ul className="nt">
                  {pick.map((x) => (<li key={x.k}><b>{x.n[0]}</b><small>from {x.by}</small></li>))}
                </ul>
              </div>
              <div role="img" aria-label="Hexagon of the six tasting traits">
                <svg viewBox="-60 10 440 310">
                  {[2.5, 5, 7.5, 10].map((v2) => <polygon key={v2} className="ring" points={pts(Array(6).fill(v2))} />)}
                  {sub.map((q, i) => {
                    const t = -Math.PI / 2 + (i * Math.PI) / 3, c = Math.cos(t), sn = Math.sin(t), x = (160 + 122 * c).toFixed(1);
                    return (
                      <g key={q[0]}>
                        <line className="ax" x1="160" y1="160" x2={(160 + 105 * c).toFixed(1)} y2={(160 + 105 * sn).toFixed(1)} />
                        <text x={x} y={(164 + 122 * sn).toFixed(1)} textAnchor={Math.abs(c) < 0.3 ? 'middle' : c > 0 ? 'start' : 'end'}>
                          {q[0]}<tspan x={x} dy="14" style={{ fontWeight: 700 }}>{f1(q[1])}</tspan>
                        </text>
                      </g>
                    );
                  })}
                  <polygon className="sh" points={pts(sub.map((q) => q[1]))} />
                </svg>
              </div>
            </div>
            <div className="subs">
              {sub.map((q) => (
                <div className="bar" key={q[0]}>
                  <span>{q[0]}</span>
                  <i><b style={{ width: q[1] * 10 + '%' }} /></i>
                  <em>{f1(q[1])}</em>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h3>Where the flavour comes from</h3>
            <ul className="why">
              {[['Origin', o[0], o[6]], ['Varietal', v[0], v[6]], ['Process', p[0], p[5]], ['Roast', R[s.r][0], R[s.r][1]], ['Altitude', alt + ' m', 'Shifts acidity, fruit and floral up or down; body, cocoa and earth the other way.']].map((x) => (
                <li key={x[0]}><b>{x[0]}: {x[1]}.</b> {x[2]}</li>
              ))}
            </ul>
            <div className="tw" style={{ marginTop: '14px' }}>
              <table>
                <thead><tr><th>Source</th>{AX.map((x) => <th key={x}>{x}</th>)}</tr></thead>
                <tbody>
                  <Row n="Origin start" x={o[2]} total />
                  <Row n="Varietal" x={v[3]} />
                  <Row n="Process" x={p[2]} />
                  <Row n="Altitude" x={altv} />
                  <Row n="Roast (net)" x={a.map((x, i) => x - pre[i])} />
                  <Row n="Flavour index" x={a} total />
                </tbody>
              </table>
            </div>
            <p className="hint">Values are points on a 0–10 scale. Roast row = net change after roasting.</p>
          </section>

          <section className="card"><details><summary>Method and sources</summary>
<p><b>Flavour index.</b> Eight flavour values on a 0–10 scale: acidity, sweetness, body, bitterness, fruit, floral, cocoa and nut, earth and spice. Origin sets the starting profile. Varietal, process and altitude add or subtract points. Roast then rescales: the longer the roast, the less acidity, fruit and floral character and the more bitterness, as the book describes. Sweetness peaks at medium roast.</p>
<p><b>Hexagon.</b> Its six corners are bitterness, flavour complexity, cleanliness, acidity, balance and mouthfeel. These follow the book’s tasting traits, with sweetness replaced by bitterness, and acidity sits directly opposite bitterness. Bitterness combines roast bitterness with the chocolate, caramel and nut character. Each is scored 0–10 from the eight index values. It shows the shape of the cup, not whether you will like it. Dark roasts score lower on complexity because the book notes they lose much of the raw coffee’s character.</p>
<p><b>Tasting notes.</b> Each choice carries weighted notes. Roast and altitude rescale them, then the top three win, with a small penalty for repeating the same note family.</p>
<p><b>Evidence tags.</b> <span className="tg">Book</span> values come straight from the epub. <span className="tg m">Book + outside</span> means the book gives the direction and I set the size. <span className="tg x">Outside</span> means the book gives no taste notes (it says so for most varietals), so I filled the gap.</p>
<ul><li>Outside source 1: World Coffee Research, Arabica Coffee Varieties catalog, for varietals the book leaves undescribed.</li>
<li>Outside source 2: SCA Coffee Taster’s Flavor Wheel, for descriptor wording such as jasmine.</li>
<li>Outside source 3: altitude and cup-quality research, for example Avelino et al. 2005 (Journal of the Science of Food and Agriculture). The book says denser, higher-grown coffee is more acidic and fruitier, but gives no numbers.</li>
<li>These outside sources come from my background knowledge. I have not re-checked them live, and all numeric weights are my own modelling choices.</li>
<li>Indonesia’s starting profile removes the semi-washed signature the book describes, so selecting that process does not count it twice.</li></ul></details></section>
        </div>
      </div>
    </div>
  );
}
