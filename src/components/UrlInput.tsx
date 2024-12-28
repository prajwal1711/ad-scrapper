import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export const UrlInput: React.FC<UrlInputProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');
  const debouncedUrl = useDebounce(url, 500);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url);
    }
  }, [url, onSubmit]);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Facebook page URL (e.g., https://www.facebook.com/vanceapp/)"
          className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-blue-500 disabled:opacity-50"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};