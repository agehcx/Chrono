import {
  type ButtonHTMLAttributes,
  type ForwardedRef,
  type ReactNode,
  forwardRef
} from 'react';
import {twMerge} from 'tailwind-merge';
import {cva, type VariantProps} from 'class-variance-authority';
import {Slot} from '@radix-ui/react-slot';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-emerald-600',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-blue-700',
        outline: 'border border-slate-300 hover:bg-slate-100',
        ghost: 'hover:bg-slate-100'
      },
      size: {
        sm: 'h-8 px-3',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-base'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  children?: ReactNode;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const {className, variant, size, asChild = false, ...rest} = props;
    const Component = asChild ? Slot : 'button';

    return (
      <Component
        ref={ref}
        className={twMerge(buttonVariants({variant, size}), className)}
        {...rest}
      />
    );
  }
);

Button.displayName = 'Button';
