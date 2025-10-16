import Link from 'next/link';
import {Github, Linkedin} from 'lucide-react';

const socialLinks = [
  {href: 'https://github.com/code-arena', icon: Github, label: 'GitHub'},
  {href: 'https://www.linkedin.com/company/code-arena', icon: Linkedin, label: 'LinkedIn'}
];

export const AppFooter = () => {
  return (
    <footer id="partners" className="relative mt-24 border-t border-slate-800/60 bg-slate-950/70 py-12 text-sm text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Code Arena</p>
          <p className="mt-2 max-w-md text-sm text-slate-400">
            Building a fair proving ground for Thailand&apos;s developers with verified identity, live competitions, and real hiring signals.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {socialLinks.map(({href, icon: Icon, label}) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-700/60 bg-slate-900/70 p-2 text-slate-300 transition hover:border-emerald-400/60 hover:text-emerald-200"
            >
              <Icon className="h-5 w-5" aria-hidden />
              <span className="sr-only">{label}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-6 max-w-6xl px-4 text-xs text-slate-600">
        © {new Date().getFullYear()} Code Arena Collective. Crafted in Bangkok.
      </div>
    </footer>
  );
};
