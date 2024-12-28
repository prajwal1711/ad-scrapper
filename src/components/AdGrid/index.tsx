import React from 'react';
import { AdResponse } from '../../types/ads';
import { AdCard } from './AdCard';
import logger from '../../utils/logger';

interface AdGridProps {
  ads: AdResponse[];
}

export const AdGrid: React.FC<AdGridProps> = ({ ads }) => {
  if (!ads?.length) {
    return (
      <div className="text-center text-gray-500 py-8">
        No ads found. Try refreshing or adding a new company.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl">
      {ads.map((ad, index) => {
        const imageUrl = ad.snapshot?.cards?.[0]?.originalImageUrl;
        if (!imageUrl) {
          logger.warn(`No image URL found for ad ${index}`);
          return null;
        }
        
        return (
          <AdCard
            key={`${imageUrl}-${index}`}
            imageUrl={imageUrl}
            index={index}
            date={ad.snapshot?.createdAt || ad.createdAt}
          />
        );
      }).filter(Boolean)}
    </div>
  );
};