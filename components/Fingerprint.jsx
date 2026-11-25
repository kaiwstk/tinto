'use client';
import Link from 'next/link';
import { useProfiles } from '../lib/store';
import { aggregate, describe, valid } from '../lib/fingerprint';
import Nav from './Nav';
import Hex from './Hex';

const f1 = (x) => x.toFixed(1);

export default function Fingerprint() {
  const { list, ready, remove, clear } = useProfiles();
  const items = list.filter((x) => valid(x.sel));
  const fp = items.length ? aggregate(items) : null;
  const mx = fp ? Math.max(...fp.traits.map((q) => q[1])) : 0;

  return (
    <div className="wrap">
      <Nav />
      <div className="head">
        <h1>My Taste Fingerprint</h1>
        <p className="meta">
          {!ready ? 'Loading…' : fp ? 'Built from ' + fp.n + ' saved ' + (fp.n === 1 ? 'profile' : 'profiles') : 'Nothing saved yet'}
        </p>
      </div>

      {ready && !fp && (
        <div className="card empty">
          <h2>Start your fingerprint</h2>
          <p>Build a coffee in the explorer and tap Save to my taste. Every profile you save is combined into your fingerprint.</p>
          <Link className="btn" href="/">Open the explorer</Link>
        </div>
      )}

      {fp && (
        <div className="fgrid">
          <div className="card">
            <h2>Your fingerprint</h2>
            <div className="ncs">
              {fp.pick.map((x, i) => (
                <div className={'nc' + (i ? '' : ' hl')} key={x.k}>
                  <span className="ix">{'0' + (i + 1)}</span>
                  <div>
                    <b>{x.n[0]}</b>
                    <small>{fp.n === 1 ? 'From your saved profile' : 'Top five in ' + x.count + ' of ' + fp.n + ' profiles'}</small>
                  </div>
                </div>
              ))}
            </div>
            <p className="hint" style={{ marginTop: 12 }}>
              Each saved profile counts equally. Traits are averaged, and a flavour ranks higher when it is strong across several profiles.
            </p>
            <div className="pf">
              <div role="img" aria-label="Hexagon of your average tasting traits"><Hex sub={fp.traits} /></div>
              <div className="subs">
                {fp.traits.map((q) => (
                  <div className={'bar' + (q[1] === mx ? ' mx' : '')} key={q[0]}>
                    <span>{q[0]}</span>
                    <i><b style={{ width: q[1] * 10 + '%' }} /></i>
                    <em>{f1(q[1])}</em>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <h3>Saved profiles</h3>
            <ul className="plist">
              {items.map((x) => {
                const d = describe(x.sel);
                return (
                  <li key={x.id}>
                    <div><b>{d.title}</b><small>{d.sub}</small></div>
                    <button type="button" className="rm" aria-label={'Remove ' + d.title} onClick={() => remove(x.id)}>✕</button>
                  </li>
                );
              })}
            </ul>
            <button type="button" className="ghost" onClick={() => { if (window.confirm('Remove all saved profiles?')) clear(); }}>Clear all</button>
          </div>
        </div>
      )}
    </div>
  );
}
