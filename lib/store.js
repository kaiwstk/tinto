'use client';
import { useCallback, useEffect, useState } from 'react';

const KEY = 'tinto.profiles.v1';
const EVT = 'tinto:profiles';
const MAX = 24;

function read() {
  try { const x = JSON.parse(window.localStorage.getItem(KEY) || '[]'); return Array.isArray(x) ? x : []; }
  catch { return []; }
}
function write(list) {
  try { window.localStorage.setItem(KEY, JSON.stringify(list)); } catch {}
}

// Saved profiles live in this browser's localStorage. Each one stores only the five selections;
// the flavour values are recomputed from them, so the fingerprint always follows the current model.
export function useProfiles() {
  const [list, setList] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setList(read());
    sync();
    setReady(true);
    window.addEventListener('storage', sync);
    window.addEventListener(EVT, sync);
    return () => { window.removeEventListener('storage', sync); window.removeEventListener(EVT, sync); };
  }, []);

  const commit = useCallback((next) => { write(next); window.dispatchEvent(new Event(EVT)); }, []);

  const add = useCallback((sel) => {
    const cur = read();
    const key = JSON.stringify(sel);
    if (cur.some((x) => JSON.stringify(x.sel) === key)) return 'dup';
    const item = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), ts: Date.now(), sel };
    commit([...cur, item].slice(-MAX));
    return 'ok';
  }, [commit]);

  const remove = useCallback((id) => commit(read().filter((x) => x.id !== id)), [commit]);
  const clear = useCallback(() => commit([]), [commit]);

  return { list, ready, add, remove, clear };
}
