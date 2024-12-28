import React from 'react';
import { Calendar, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CompanyCardProps {
  id: string;
  name: string;
  adsCount: number;
  lastUpdated: string;
  previewImage?: string;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({
  id,
  name,
  adsCount,
  lastUpdated,
  previewImage,
}) => {
  return (
    <Link
      to={`/company/${id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="aspect-video relative overflow-hidden bg-gray-100">
        {previewImage ? (
          <img
            src={previewImage}
            alt={`${name} preview`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {name}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{adsCount} ads</span>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(lastUpdated).toLocaleDateString()}
          </div>
        </div>
      </div>
    </Link>
  );
};