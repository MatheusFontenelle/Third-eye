import { SearchX, TrendingUp, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from './ui/Button';
import Card from './ui/Card';

const suggestions = ['RTX 4060', 'iPhone 15', 'SSD 1TB', 'Ryzen 7'];

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = 'Nenhum resultado encontrado',
  description = 'Tente ajustar os filtros ou buscar por outro termo.',
}: EmptyStateProps) {
  const navigate = useNavigate();

  return (
    <Card className="py-12 text-center" hover={false}>
      <div className="bg-primary-50 rounded-2xl p-4 mb-5 inline-flex">
        <SearchX className="w-8 h-8 text-primary-600 dark:text-primary-400 dark:text-primary-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">{description}</p>
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {suggestions.map((term) => (
          <Button
            key={term}
            variant="secondary"
            size="sm"
            onClick={() => navigate(`/search?q=${encodeURIComponent(term)}`)}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            {term}
          </Button>
        ))}
      </div>
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium transition-colors"
      >
        Voltar para página inicial
        <ArrowRight className="w-4 h-4" />
      </button>
    </Card>
  );
}

