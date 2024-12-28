import React from 'react';
import { FolderHeart, Home, Plus, Settings } from 'lucide-react';
import { useCompanies } from '../../hooks/useCompanies';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const { companies } = useCompanies();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FolderHeart className="w-8 h-8 text-blue-600" />
          AdVault
        </h1>
      </div>

      <nav className="flex-1 px-4">
        <div className="space-y-1">
          <Link
            to="/"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
              isActive('/') 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Home className="w-5 h-5" />
            Home
          </Link>

          <div className="mt-8">
            <div className="flex items-center justify-between px-4 mb-2">
              <h2 className="text-sm font-semibold text-gray-500">COMPANIES</h2>
              <Link
                to="/add-company"
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                title="Add new company"
              >
                <Plus className="w-4 h-4 text-gray-500" />
              </Link>
            </div>
            
            <div className="space-y-1">
              {companies.map((company) => (
                <Link
                  key={company.id}
                  to={`/company/${company.id}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                    isActive(`/company/${company.id}`)
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FolderHeart className="w-5 h-5" />
                  {company.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Link
          to="/settings"
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>
      </div>
    </div>
  );
};