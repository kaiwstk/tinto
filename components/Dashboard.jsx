'use client';
import { useState } from 'react';
import { AX, V, P, R, O } from '../lib/data';
import { compute } from '../lib/model';
import Nav from './Nav';
import Hex from './Hex';
import { useProfiles } from '../lib/store';

const f1 = (x) => x.toFixed(1);
const en = (x) => x.toLocaleString('en-US');
const REGIONS = ['Africa', 'Asia', 'Americas'];
const TABS = [['p', 'Profile'], ['b', 'Breakdown'], ['n', 'Additional Notes']];

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
  const [tab, setTab] = useState('p');
  const on = (k) => (e) => setS((prev) => ({ ...prev, [k]: +e.target.value }));
  const { o, v, p, a, pre, altv, sub, pick, fam, out } = compute(s);
  const alt = s.alt, r = s.r;
  const { add } = useProfiles();
  const [flash, setFlash] = useState('');
  const save = () => {
    setFlash(add(s) === 'dup' ? 'Already saved' : 'Saved ✓');
    setTimeout(() => setFlash(''), 1800);
  };
  const mx = Math.max(...sub.map((q) => q[1]));

  return (
    <div className="wrap">
      <Nav />
      <div className="head">
        <h1>Coffee Flavour Index</h1>
        <p className="meta">{[o[0], v[0], p[0], R[r][0] + ' roast', en(alt) + ' m'].join(' · ')}</p>
      </div>

      <div className="grid">
        <form className="card ctl" onSubmit={(e) => e.preventDefault()}>
          <div className="f">
            <label htmlFor="o">Origin</label>
            <select id="o" value={s.o} onChange={on('o')}>
              {REGIONS.map((g) => (
                <optgroup key={g} label={g}>
                  {O.map((x, i) => x[1] === g && <option key={i} value={i}>{x[0]}</option>)}
                </optgroup>
              ))}
            </select>
            <p className="hint">{o[6] + ' Book altitude range: ' + en(o[4][0]) + '–' + en(o[4][1]) + ' m.'}</p>
          </div>
          <div className="f">
            <label htmlFor="v">Varietal</label>
            <select id="v" value={s.v} onChange={on('v')}>{V.map((x, i) => <option key={i} value={i}>{x[0]}</option>)}</select>
          </div>
          <div className="f">
            <label htmlFor="p">Fermentation / processing</label>
            <select id="p" value={s.p} onChange={on('p')}>{P.map((x, i) => <option key={i} value={i}>{x[0]}</option>)}</select>
          </div>
          <div className="f">
            <label htmlFor="r">Roast level</label>
            <select id="r" value={s.r} onChange={on('r')}>{R.map((x, i) => <option key={i} value={i}>{x[0]}</option>)}</select>
          </div>
          <div className="f">
            <label htmlFor="a">Altitude</label>
            <input type="range" id="a" min="100" max="2500" step="50" value={alt} onChange={on('alt')} />
            <p className="hint">
              <b>{en(alt)} m ({en(Math.round(alt * 3.281))} ft)</b>{' '}
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

        <section className="res" id="res">
          <div className="tabs" role="tablist">
            {TABS.map(([k, label]) => (
              <button key={k} role="tab" type="button" className={tab === k ? 'on' : undefined} aria-selected={tab === k} onClick={() => setTab(k)}>{label}</button>
            ))}
          </div>

          <div className="card" hidden={tab !== 'p'}>
            <div className="ph">
              <h2>{fam}</h2>
              <button type="button" className="sv" aria-live="polite" onClick={save}>{flash || 'Save to my taste'}</button>
            </div>
            <div className="ncs">
              {pick.map((x, i) => (
                <div className={'nc' + (i ? '' : ' hl')} key={x.k}>
                  <span className="ix">{'0' + (i + 1)}</span>
                  <div><b>{x.n[0]}</b><small>from {x.by}</small></div>
                </div>
              ))}
            </div>
            <div className="pf">
              <div role="img" aria-label="Hexagon of the six tasting traits"><Hex sub={sub} /></div>
              <div className="subs">
                {sub.map((q) => (
                  <div className={'bar' + (q[1] === mx ? ' mx' : '')} key={q[0]}>
                    <span>{q[0]}</span>
                    <i><b style={{ width: q[1] * 10 + '%' }} /></i>
                    <em>{f1(q[1])}</em>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card" hidden={tab !== 'b'}>
            <h3>Where the flavour comes from</h3>
            <ul className="why">
              {[['Origin', o[0], o[6]], ['Varietal', v[0], v[6]], ['Process', p[0], p[5]], ['Roast', R[r][0], R[r][1]], ['Altitude', alt + ' m', 'Shifts acidity, fruit and floral up or down; body, cocoa and earth the other way.']].map((x) => (
                <li key={x[0]}><b>{x[0]}: {x[1]}.</b> {x[2]}</li>
              ))}
            </ul>
            <div className="tw">
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
          </div>

          <div className="card notes" hidden={tab !== 'n'}>
              <p><b>Flavour index.</b> Eight flavour values on a 0–10 scale: acidity, sweetness, body, bitterness, fruit, floral, cocoa and nut, earth and spice. Origin sets the starting profile. Varietal, process and altitude add or subtract points. Roast then rescales: the longer the roast, the less acidity, fruit and floral character and the more bitterness, as the book describes. Sweetness peaks at medium roast.</p>
              <p><b>Hexagon.</b> Each corner is scored 0–10 from the eight index values, with acidity directly opposite bitterness. The hexagon shows the shape of the cup, not whether you will like it. Dark roasts score lower on complexity because the book notes they lose much of the raw coffee’s character.</p>
              <div className="tw"><table className="hx"><thead><tr><th>Variable</th><th>How it is measured</th></tr></thead><tbody><tr><td>Bitterness</td><td>Roast bitterness plus chocolate, caramel and nut character, each counted at 60% and capped at 10.</td></tr><tr><td>Flavour complexity</td><td>How much fruit, floral, cocoa and nut, and earth and spice character the cup has (55%), and how evenly it is spread across them (45%).</td></tr><tr><td>Cleanliness</td><td>The origin’s starting cleanliness, adjusted by varietal and process. Washed raises it; natural, honey and semi-washed lower it. Roast and altitude do not change it.</td></tr><tr><td>Acidity</td><td>The acidity value after altitude, process and roast, with diminishing returns: the first points count for the most.</td></tr><tr><td>Balance</td><td>How closely sweetness matches the sharp side of the cup (80% of acidity plus bitterness), with a small penalty for an unclean cup.</td></tr><tr><td>Mouthfeel</td><td>Body, scored highest around 6 out of 10. Very thin or very heavy cups score lower.</td></tr></tbody></table></div>
              <p><b>Tasting notes.</b> Each choice carries weighted notes. Roast and altitude rescale them, then the top three win, with a small penalty for repeating the same note family.</p>
              <p><b>Modelling notes.</b> The book gives no taste notes for most varietals and no altitude figures, so outside sources fill those gaps. All numeric weights are modelling choices, not published figures. Indonesia’s starting profile removes the semi-washed signature the book describes, so selecting that process does not count it twice.</p>
              <p><b>Bibliography</b></p>
              <ul className="bib">
                <li>Avelino, J., Barboza, B., Araya, J.C., Fonseca, C., Davrieux, F., Guyot, B. and Cilas, C. (2005) ‘Effects of slope exposure, altitude and yield on coffee quality in two altitude terroirs of Costa Rica, Orosi and Santa María de Dota’, <i>Journal of the Science of Food and Agriculture</i>, 85(11), pp. 1869–1876. doi:10.1002/jsfa.2188. <em>Used for the altitude effects.</em></li>
                <li>Hoffmann, J. (2018) <i>The World Atlas of Coffee: From Beans to Brewing – Coffees Explored, Explained and Enjoyed</i>. London: Octopus. <em>Primary source for origin profiles, processing, roast effects and altitude ranges.</em></li>
                <li>Specialty Coffee Association and World Coffee Research (2016) <i>The Coffee Taster’s Flavor Wheel</i>. <em>Used for descriptor wording, such as jasmine.</em></li>
                <li>World Coffee Research (n.d.) <i>Arabica Coffee Varieties</i>. Available at: https://varieties.worldcoffeeresearch.org. <em>Used for varietals the book leaves undescribed.</em></li>
              </ul>
            </div>
        </section>
      </div>

      <div className="dock">
        <div><b>{fam}</b><small>{pick.map((x) => x.n[0]).join(' · ')}</small></div>
        <button type="button" className="gh" onClick={() => { setTab('p'); document.getElementById('res')?.scrollIntoView({ behavior: 'smooth' }); }}>View</button>
        <button type="button" aria-live="polite" onClick={save}>{flash || 'Save'}</button>
      </div>
    </div>
  );
}
