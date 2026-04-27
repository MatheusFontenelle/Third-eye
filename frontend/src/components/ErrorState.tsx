import { AlertTriangle, RefreshCw } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  message = 'Ocorreu um erro ao carregar os dados.',
  onRetry,
}: ErrorStateProps) {
  return (
    <Card className="py-12 text-center" hover={false}>
      <div className="bg-red-50 rounded-2xl p-4 mb-5 inline-flex">
        <AlertTriangle className="w-8 h-8 text-red-500 dark:text-red-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">Algo deu errado</h3>
      <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} leftIcon={<RefreshCw className="w-4 h-4" />}>
          Tentar novamente
        </Button>
      )}
    </Card>
  );
}

