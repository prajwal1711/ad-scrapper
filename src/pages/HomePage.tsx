import React from 'react';
import { WelcomeScreen } from '../components/home/WelcomeScreen';
import { CompanyCard } from '../components/company/CompanyCard';
import { useCompanies } from '../hooks/useCompanies';
import { useAuth } from '../hooks/useAuth';
import { AuthForm } from '../components/auth/AuthForm';

export const HomePage = () => {
  const { companies, isLoading } = useCompanies();
  const { user, loading: authLoading } = useAuth();

  // Show loading spinner while checking auth state
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Show auth form if user is not logged in
  if (!user) {
    return <WelcomeScreen />;
  }

  // Show loading spinner while fetching companies
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Show welcome screen if user has no companies
  if (companies.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Welcome, {user.email}</h1>
        <p className="text-gray-600 mb-8">Get started by adding your first company.</p>
        <WelcomeScreen />
      </div>
    );
  }

  // Show companies grid
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Companies</h1>
        <span className="text-sm text-gray-500">{user.email}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            id={company.id}
            name={company.name}
            adsCount={0}
            lastUpdated={company.created_at}
          />
        ))}
      </div>
    </div>
  );
};