import React from 'react';
import { Plus, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthForm } from '../auth/AuthForm';
import { useAuth } from '../../hooks/useAuth';

export const WelcomeScreen = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="p-8 max-w-md mx-auto">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">
          Sign in to get started
        </h2>
        <AuthForm />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] max-w-2xl mx-auto text-center px-4">
      <div className="bg-blue-50 p-3 rounded-full mb-6">
        <Rocket className="w-12 h-12 text-blue-600" />
      </div>
      
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to AdVault
      </h1>
      
      <p className="text-lg text-gray-600 mb-8">
        Your central hub for collecting and organizing Facebook ads across multiple companies.
      </p>
      
      <Link
        to="/add-company"
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
      >
        <Plus className="w-5 h-5" />
        Add Your First Company
      </Link>
    </div>
  );
};