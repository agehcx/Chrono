import type {HTMLAttributes, ReactNode} from 'react';
import {twMerge} from 'tailwind-merge';

type BaseProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'>;

export interface CardProps extends BaseProps {
  heading?: ReactNode;
  actions?: ReactNode;
}

export const Card = ({className, heading, actions, children, ...props}: CardProps) => (
  <section
    className={twMerge(
      'rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900',
      className
    )}
    {...props}
  >
    {(heading || actions) && (
      <header className="mb-4 flex items-center justify-between gap-3">
        {heading && <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{heading}</h2>}
        {actions}
      </header>
    )}
    <div className="space-y-3 text-slate-700 dark:text-slate-200">{children}</div>
  </section>
);
