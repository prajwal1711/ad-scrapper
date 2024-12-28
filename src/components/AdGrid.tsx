import React from 'react';
import { AdResponse } from '../types/ads';
import { ImageWithFallback } from './ImageWithFallback';

interface AdGridProps {
  ads: AdResponse[];
}

export const AdGrid: React.FC<AdGridProps> = ({ ads }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl">
      {ads.map((ad, index) => (
        <div key={index} className="rounded-lg overflow-hidden shadow-lg bg-white">
          <ImageWithFallback
            src={ad.snapshot?.cards?.[0]?.originalImageUrl}
            alt={`Ad ${index + 1}`}
            className="w-full h-64 object-cover"
          />
        </div>
      ))}
    </div>
  );
};