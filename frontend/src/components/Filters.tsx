import { SearchFilters } from '@/types';
import { getBrands, getStores } from '@/data/mock';
import PriceRange from './PriceRange';
import Card from './ui/Card';
import Button from './ui/Button';
import { FilterX, ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

interface FiltersProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
}

function CustomCheckbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group py-0.5">
      <div
        onClick={onChange}
        className={[
          'w-4.5 h-4.5 rounded-md border-2 flex items-center justify-center transition-all duration-150 shrink-0',
          'w-[18px] h-[18px]',
          checked
            ? 'bg-primary-600 border-primary-600'
            : 'border-gray-300 dark:border-slate-500 bg-white dark:bg-slate-700 group-hover:border-gray-400',
        ].join(' ')}
      >
        {checked && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span className="text-sm text-gray-600 dark:text-slate-400 group-hover:text-gray-900 dark:text-slate-100 transition-colors select-none">{label}</span>
    </label>
  );
}

export default function Filters({ filters, onChange }: FiltersProps) {
  const brands = getBrands();
  const stores = getStores();
  const [mobileOpen, setMobileOpen] = useState(false);

  function toggleArrayValue<T>(arr: T[], value: T): T[] {
    return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
  }

  function handleClear() {
    onChange({
      brands: [],
      stores: [],
      conditions: [],
      freeShippingOnly: false,
      minPrice: undefined,
      maxPrice: undefined,
      maxShippingDays: undefined,
    });
  }

  const hasFilters =
    filters.brands.length > 0 ||
    filters.stores.length > 0 ||
    filters.conditions.length > 0 ||
    filters.freeShippingOnly ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    filters.maxShippingDays !== undefined;

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-gray-500 dark:text-slate-400" />
          <h3 className="text-sm font-bold text-gray-900 dark:text-slate-100 uppercase tracking-wide">Filtros</h3>
        </div>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={handleClear} leftIcon={<FilterX className="w-3.5 h-3.5" />}>
            Limpar
          </Button>
        )}
      </div>

      <PriceRange
        min={filters.minPrice}
        max={filters.maxPrice}
        onChange={({ min, max }) => onChange({ ...filters, minPrice: min, maxPrice: max })}
      />

      <div className="space-y-2.5">
        <h4 className="text-xs font-bold text-gray-900 dark:text-slate-100 uppercase tracking-wider">Marca</h4>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
          {brands.map((brand) => (
            <CustomCheckbox
              key={brand}
              checked={filters.brands.includes(brand)}
              onChange={() => onChange({ ...filters, brands: toggleArrayValue(filters.brands, brand) })}
              label={brand}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2.5">
        <h4 className="text-xs font-bold text-gray-900 dark:text-slate-100 uppercase tracking-wider">Loja</h4>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
          {stores.map((store) => (
            <CustomCheckbox
              key={store}
              checked={filters.stores.includes(store)}
              onChange={() => onChange({ ...filters, stores: toggleArrayValue(filters.stores, store) })}
              label={store}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2.5">
        <h4 className="text-xs font-bold text-gray-900 dark:text-slate-100 uppercase tracking-wider">Condição</h4>
        <div className="space-y-1">
          {[
            { value: 'new' as const, label: 'Novo' },
            { value: 'used' as const, label: 'Usado' },
            { value: 'refurbished' as const, label: 'Recondicionado' },
          ].map((cond) => (
            <CustomCheckbox
              key={cond.value}
              checked={filters.conditions.includes(cond.value)}
              onChange={() => onChange({ ...filters, conditions: toggleArrayValue(filters.conditions, cond.value) })}
              label={cond.label}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2.5">
        <h4 className="text-xs font-bold text-gray-900 dark:text-slate-100 uppercase tracking-wider">Entrega</h4>
        <div className="space-y-1">
          <CustomCheckbox
            checked={filters.freeShippingOnly}
            onChange={() => onChange({ ...filters, freeShippingOnly: !filters.freeShippingOnly })}
            label="Frete grátis"
          />
        </div>
        <div className="pt-2">
          <label className="text-xs text-gray-500 dark:text-slate-400 mb-1.5 block font-medium">Prazo máximo: <span className="text-gray-700 dark:text-slate-300">{filters.maxShippingDays ?? 15} dias</span></label>
          <input
            type="range"
            min={1}
            max={15}
            value={filters.maxShippingDays ?? 15}
            onChange={(e) =>
              onChange({
                ...filters,
                maxShippingDays: Number(e.target.value) === 15 ? undefined : Number(e.target.value),
              })
            }
            className="w-full accent-primary-600 h-1.5 bg-gray-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-gray-400 dark:text-slate-500 mt-1 font-medium">
            <span>1 dia</span>
            <span>15 dias</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex items-center justify-between bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl px-4 py-3 text-sm font-semibold text-gray-900 dark:text-slate-100 shadow-card"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-500 dark:text-slate-400" />
            Filtros
            {hasFilters && (
              <span className="bg-primary-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {filters.brands.length + filters.stores.length + filters.conditions.length + (filters.freeShippingOnly ? 1 : 0)}
              </span>
            )}
          </span>
          {mobileOpen ? <ChevronUp className="w-4 h-4 text-gray-400 dark:text-slate-500" /> : <ChevronDown className="w-4 h-4 text-gray-400 dark:text-slate-500" />}
        </button>
        {mobileOpen && (
          <div className="mt-2">
            <Card padding="md">
              <FilterContent />
            </Card>
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-4">
          <Card padding="md">
            <FilterContent />
          </Card>
        </div>
      </aside>
    </>
  );
}

