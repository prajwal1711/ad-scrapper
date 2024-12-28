import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="text-red-500 bg-red-50 p-4 rounded-lg">
    {message}
  </div>
);