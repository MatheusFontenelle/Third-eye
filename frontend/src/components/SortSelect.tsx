import { SortOption } from '@/types';
import { ArrowUpDown } from 'lucide-react';

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const options: { value: SortOption; label: string }[] = [
  { value: 'price_asc', label: 'Menor preço' },
  { value: 'total_price_asc', label: 'Menor preço + frete' },
  { value: 'store_rating_desc', label: 'Melhor avaliação da loja' },
  { value: 'shipping_time_asc', label: 'Entrega mais rápida' },
];

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-4 h-4 text-gray-400 dark:text-slate-500" />
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="appearance-none text-sm border border-gray-200 rounded-xl pl-3 pr-9 py-2 bg-white text-gray-700 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 cursor-pointer hover:border-gray-300 transition-colors font-medium"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 dark:text-slate-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

