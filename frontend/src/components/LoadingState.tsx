import Card from './ui/Card';

function SkeletonCard() {
  return (
    <Card className="flex flex-col sm:flex-row gap-4 animate-pulse">
      <div className="shrink-0 mx-auto sm:mx-0">
        <div className="w-32 h-32 sm:w-36 sm:h-36 bg-gray-200 rounded-xl" />
      </div>
      <div className="flex-1 space-y-3 py-1">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
        <div className="flex gap-2 pt-2">
          <div className="h-3 bg-gray-200 rounded w-20" />
          <div className="h-3 bg-gray-200 rounded w-16" />
        </div>
        <div className="flex items-end justify-between pt-3">
          <div className="h-8 bg-gray-200 rounded w-28" />
          <div className="h-9 bg-gray-200 rounded w-24" />
        </div>
      </div>
    </Card>
  );
}

interface LoadingStateProps {
  message?: string;
  count?: number;
}

export default function LoadingState({ message = 'Carregando ofertas...', count = 3 }: LoadingStateProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
      <p className="text-center text-xs text-gray-400 pt-2">{message}</p>
    </div>
  );
}

