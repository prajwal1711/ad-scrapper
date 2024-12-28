import React from 'react';
import { Plus } from 'lucide-react';
import { useCompanies } from '../hooks/useCompanies';

interface CompanySelectorProps {
  selectedCompanyId: string | null;
  onSelectCompany: (companyId: string) => void;
  onAddCompany: () => void;
}

export const CompanySelector: React.FC<CompanySelectorProps> = ({
  selectedCompanyId,
  onSelectCompany,
  onAddCompany,
}) => {
  const { companies, isLoading } = useCompanies();

  if (isLoading) {
    return <div className="animate-pulse h-10 bg-gray-200 rounded w-48" />;
  }

  return (
    <div className="flex items-center space-x-2">
      <select
        value={selectedCompanyId || ''}
        onChange={(e) => onSelectCompany(e.target.value)}
        className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">Select Company</option>
        {companies.map((company) => (
          <option key={company.id} value={company.id}>
            {company.name}
          </option>
        ))}
      </select>
      <button
        onClick={onAddCompany}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
        title="Add new company"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
};