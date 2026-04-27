import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import Input from './ui/Input';
import Button from './ui/Button';

interface SearchBarProps {
  variant?: 'hero' | 'compact';
  initialValue?: string;
}

export default function SearchBar({ variant = 'compact', initialValue = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    const params = new URLSearchParams(searchParams);
    params.set('q', trimmed);
    navigate(`/search?${params.toString()}`);
  }

  const isHero = variant === 'hero';

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={[
          'flex items-center gap-0 bg-white dark:bg-slate-800 border rounded-2xl overflow-hidden transition-all duration-200',
          'focus-within:ring-2 focus-within:ring-primary-500/30 focus-within:border-primary-400',
          isHero ? 'border-gray-200 dark:border-slate-600 shadow-soft' : 'border-gray-200 dark:border-slate-600',
        ].join(' ')}
      >
        <div className="flex-1 min-w-0">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar produtos, marcas, modelos..."
            icon={<Search className="w-5 h-5 dark:text-slate-400" />}
            className={[
              'border-0 shadow-none focus:ring-0 focus:border-0 bg-transparent dark:text-slate-100',
              isHero ? 'text-lg py-4 px-6' : 'text-sm py-2.5 px-4',
            ].join(' ')}
          />
        </div>
        <div className="pr-1.5 shrink-0">
          <Button
            type="submit"
            size={isHero ? 'lg' : 'md'}
            className={isHero ? 'rounded-xl' : 'rounded-lg'}
            aria-label="Buscar"
          >
            <Search className={isHero ? 'w-5 h-5' : 'w-4 h-4'} />
            {isHero && <span>Buscar</span>}
          </Button>
        </div>
      </div>
    </form>
  );
}
