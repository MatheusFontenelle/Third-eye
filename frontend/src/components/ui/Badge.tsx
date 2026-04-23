import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'info' | 'warning' | 'neutral' | 'price' | 'danger';
  size?: 'sm' | 'md';
  className?: string;
}

const variantStyles = {
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  info: 'bg-sky-50 text-sky-700 border-sky-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  neutral: 'bg-gray-100 text-gray-700 border-gray-200',
  danger: 'bg-red-50 text-red-700 border-red-200',
  price: 'bg-primary-50 text-primary-700 border-primary-200 font-semibold',
};

const sizeStyles = {
  sm: 'text-[11px] px-2 py-0.5 rounded-md gap-1',
  md: 'text-xs px-2.5 py-1 rounded-lg gap-1.5',
};

export default function Badge({
  children,
  variant = 'neutral',
  size = 'sm',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center border font-medium',
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}

