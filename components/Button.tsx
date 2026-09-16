import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium uppercase tracking-[0.15em] transition-all duration-300 select-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'text-[11px] px-3 py-2',
    md: 'text-[12px] px-6 py-3.5',
    lg: 'text-[13px] px-8 py-4',
  };

  const variantStyles = {
    primary:
      'bg-[#111111] text-[#F5F3EE] hover:bg-black hover:tracking-[0.2em] border border-[#111111]',
    secondary:
      'bg-transparent text-[#111111] hover:bg-[#111111] hover:text-[#F5F3EE] border border-[#111111]',
    outline:
      'bg-transparent text-[#111111] hover:border-[#111111] border border-[#D9D6CF]',
    ghost:
      'bg-transparent text-[#777777] hover:text-[#111111] border border-transparent',
  };

  return (
    <button
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        fullWidth ? 'w-full' : '',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
