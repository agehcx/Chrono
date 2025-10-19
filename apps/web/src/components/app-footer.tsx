import Link from 'next/link';
import {Github, Linkedin} from 'lucide-react';

const socialLinks = [
  {href: 'https://github.com/chrono-hq', icon: Github, label: 'GitHub'},
  {href: 'https://www.linkedin.com/company/chrono-hq', icon: Linkedin, label: 'LinkedIn'}
];

export const AppFooter = () => {
  return (
  <footer id="partners" className="relative mt-24 border-t border-white/10 bg-neutral-950/80 py-12 text-sm text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-teal-200">Chrono</p>
          <p className="mt-2 max-w-md text-sm text-slate-400">
            Building a momentum engine for Thailand&apos;s developers with verified identity, live competitions, and real hiring signals.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {socialLinks.map(({href, icon: Icon, label}) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 bg-neutral-900/70 p-2 text-slate-300 transition hover:border-teal-400/60 hover:text-teal-200"
            >
              <Icon className="h-5 w-5" aria-hidden />
              <span className="sr-only">{label}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-6 max-w-6xl px-4 text-xs text-slate-600">
        © {new Date().getFullYear()} Chrono Collective. Crafted in Bangkok.
      </div>
    </footer>
  );
};
