import React from 'react';
import { X } from 'lucide-react';

interface NotificationProps {
  message: string;
  type: 'info' | 'success' | 'error';
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const bgColor = {
    info: 'bg-blue-50',
    success: 'bg-green-50',
    error: 'bg-red-50'
  }[type];

  const textColor = {
    info: 'text-blue-700',
    success: 'text-green-700',
    error: 'text-red-700'
  }[type];

  return (
    <div className={`fixed top-4 right-4 ${bgColor} ${textColor} p-4 rounded-lg shadow-lg max-w-md flex items-center justify-between`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 hover:opacity-75">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}