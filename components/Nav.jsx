'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProfiles } from '../lib/store';

export default function Nav() {
  const path = usePathname();
  const { list } = useProfiles();
  return (
    <div className="top">
      <div className="brand">
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <circle cx="16" cy="16" r="16" fill="#d4ff4a" />
          <ellipse cx="16" cy="16" rx="6" ry="9.5" transform="rotate(32 16 16)" fill="#101010" />
          <path d="M11.5 21.5c4-3.5 5-6.5 9-11" stroke="#d4ff4a" strokeWidth="1.7" fill="none" strokeLinecap="round" />
        </svg>
        TINTO
      </div>
      <nav className="nav" aria-label="Pages">
        <Link href="/" className={path === '/' ? 'on' : undefined}>Explorer</Link>
        <Link href="/fingerprint" className={path === '/fingerprint' ? 'on' : undefined}>
          My taste{list.length > 0 && <span className="cnt">{list.length}</span>}
        </Link>
      </nav>
    </div>
  );
}
