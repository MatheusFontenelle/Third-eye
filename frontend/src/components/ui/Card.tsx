import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingMap = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
};

export default function Card({
  children,
  className = '',
  hover = false,
  padding = 'md',
}: CardProps) {
  return (
    <div
      className={[
        'bg-white border border-gray-100 rounded-2xl shadow-card',
        paddingMap[padding],
        hover && 'transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}

