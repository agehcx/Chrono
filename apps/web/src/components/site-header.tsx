"use client";

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Button} from '@code-arena/ui';
import {LoginButton} from './login-button';

const links = [
  {href: '#play', label: 'Play Chrono'},
  {href: '#learn-more', label: 'Why Chrono'},
  {href: '#impact', label: 'Impact'},
  {href: '#partners', label: 'Partners'}
];

export const SiteHeader = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 mx-auto mt-6 flex w-full max-w-6xl items-center justify-between rounded-full border border-white/10 bg-neutral-950/70 px-4 py-3 text-slate-200 shadow-lg backdrop-blur">
      <Link href={pathname === '/' ? '#hero' : '/'} className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-teal-200">
        <span className="glow-ring px-4 py-1 text-xs">Chrono</span>
      </Link>
      <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
        {links.map((item) => (
          <Link key={item.href} href={item.href} className="transition hover:text-teal-200">
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" className="hidden md:inline-flex border border-teal-500/40 bg-neutral-900/50 text-slate-200">
          <Link href="#roadmap">Roadmap</Link>
        </Button>
        <LoginButton />
      </div>
    </header>
  );
};
