import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';
import logger from '../../utils/logger';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    logger.error(`Failed to load image: ${src}`);
    setError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    logger.debug(`Successfully loaded image: ${src}`);
    setIsLoading(false);
  };

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <ImageOff className="w-8 h-8 text-gray-400" />
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && <LoadingSpinner className={className} />}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
      />
    </div>
  );
};