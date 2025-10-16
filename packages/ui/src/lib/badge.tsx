import type {HTMLAttributes, ReactNode} from 'react';
import {twMerge} from 'tailwind-merge';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'success' | 'info' | 'warning' | 'danger';
  children?: ReactNode;
}

const toneMap: Record<Required<BadgeProps>['tone'], string> = {
  success: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  info: 'bg-sky-100 text-sky-700 border-sky-200',
  warning: 'bg-amber-100 text-amber-800 border-amber-200',
  danger: 'bg-rose-100 text-rose-700 border-rose-200'
};

export const Badge = ({className, tone = 'info', ...props}: BadgeProps) => (
  <span
    className={twMerge(
      'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide',
      toneMap[tone],
      className
    )}
    {...props}
  />
);
