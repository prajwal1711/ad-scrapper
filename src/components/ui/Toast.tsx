import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  onClose,
  duration = 5000,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg',
        {
          'bg-green-50 text-green-800': type === 'success',
          'bg-red-50 text-red-800': type === 'error',
          'bg-blue-50 text-blue-800': type === 'info',
        }
      )}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="p-1 hover:opacity-75 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};