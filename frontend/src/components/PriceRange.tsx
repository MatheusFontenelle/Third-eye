import { useState, useEffect } from 'react';
import Input from './ui/Input';

interface PriceRangeProps {
  min?: number;
  max?: number;
  onChange: (range: { min?: number; max?: number }) => void;
}

export default function PriceRange({ min, max, onChange }: PriceRangeProps) {
  const [localMin, setLocalMin] = useState<string>(min !== undefined ? String(min) : '');
  const [localMax, setLocalMax] = useState<string>(max !== undefined ? String(max) : '');

  useEffect(() => {
    setLocalMin(min !== undefined ? String(min) : '');
  }, [min]);

  useEffect(() => {
    setLocalMax(max !== undefined ? String(max) : '');
  }, [max]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange({
        min: localMin ? Number(localMin) : undefined,
        max: localMax ? Number(localMax) : undefined,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [localMin, localMax, onChange]);

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-gray-900">Faixa de Preço</h4>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm z-10 pointer-events-none">R$</span>
          <Input
            type="number"
            min={0}
            placeholder="Min"
            value={localMin}
            onChange={(e) => setLocalMin(e.target.value)}
            className="pl-8 text-sm"
          />
        </div>
        <span className="text-gray-300 font-light">—</span>
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm z-10 pointer-events-none">R$</span>
          <Input
            type="number"
            min={0}
            placeholder="Max"
            value={localMax}
            onChange={(e) => setLocalMax(e.target.value)}
            className="pl-8 text-sm"
          />
        </div>
      </div>
    </div>
  );
}

