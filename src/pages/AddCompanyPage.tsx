import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompanies } from '../hooks/useCompanies';
import { useToast } from '../hooks/useToast';
import { useAuth } from '../hooks/useAuth';
import { Building } from 'lucide-react';
import { AuthForm } from '../components/auth/AuthForm';

export const AddCompanyPage = () => {
  const [name, setName] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const navigate = useNavigate();
  const { addCompany } = useCompanies();
  const { addToast } = useToast();
  const { user, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const company = await addCompany({
        name,
        facebook_url: facebookUrl,
      });
      addToast('Company added successfully!', 'success');
      // Navigate to the company page immediately after adding
      navigate(`/company/${company.id}`);
    } catch (error) {
      addToast('Failed to add company', 'error');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>;
  }

  if (!user) {
    return (
      <div className="p-8">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">
          Sign in to add a company
        </h2>
        <AuthForm onSuccess={() => addToast('Welcome! You can now add your company', 'success')} />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-8">
      <div className="text-center mb-8">
        <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Add New Company</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter company name"
            required
          />
        </div>

        <div>
          <label htmlFor="facebook_url" className="block text-sm font-medium text-gray-700 mb-1">
            Facebook Page URL
          </label>
          <input
            type="url"
            id="facebook_url"
            value={facebookUrl}
            onChange={(e) => setFacebookUrl(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://facebook.com/company"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
        >
          Add Company
        </button>
      </form>
    </div>
  );
};