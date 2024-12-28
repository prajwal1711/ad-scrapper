import React from 'react';
import { ImageWithFallback } from '../ImageWithFallback';
import { Calendar, Share2 } from 'lucide-react';

interface AdCardProps {
  imageUrl: string;
  date: string;
  onShare?: () => void;
}

export const AdCard: React.FC<AdCardProps> = ({ imageUrl, date, onShare }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <div className="aspect-square relative overflow-hidden">
        <ImageWithFallback
          src={imageUrl}
          alt="Ad preview"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            {new Date(date).toLocaleDateString()}
          </div>
          
          {onShare && (
            <button
              onClick={onShare}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Share ad"
            >
              <Share2 className="w-4 h-4 text-gray-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};