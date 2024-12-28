import React from 'react';
import { ImageWithFallback } from '../ImageWithFallback';
import { Calendar } from 'lucide-react';
import logger from '../../utils/logger';

interface AdCardProps {
  imageUrl: string;
  index: number;
  date?: string;
}

export const AdCard: React.FC<AdCardProps> = ({ imageUrl, index, date }) => {
  logger.debug(`Rendering ad card ${index} with image:`, imageUrl);
  
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white">
      <ImageWithFallback
        src={imageUrl}
        alt={`Ad ${index + 1}`}
        className="w-full h-64 object-cover"
      />
      {date && (
        <div className="p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <time dateTime={date}>
              {new Date(date).toLocaleDateString()}
            </time>
          </div>
        </div>
      )}
    </div>
  );
};