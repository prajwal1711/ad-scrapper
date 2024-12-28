import { useEffect, useState } from 'react';
import { supabase, handleSupabaseError } from '../lib/supabase';
import type { Company, CreateCompanyInput } from '../types/company';
import { useAuth } from './useAuth';

export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setCompanies([]);
      setIsLoading(false);
      return;
    }
    
    async function fetchCompanies() {
      try {
        const { data, error } = await supabase
          .from('companies')
          .select('*')
          .eq('user_id', user.id)
          .order('name');

        if (error) throw error;

        setCompanies(data);
      } catch (error) {
        handleSupabaseError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCompanies();
  }, [user]);

  const addCompany = async ({ name, facebook_url }: CreateCompanyInput) => {
    if (!user) throw new Error('Must be authenticated to add a company');

    try {
      const { data, error } = await supabase
        .from('companies')
        .insert([{
          name,
          facebook_url,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;

      setCompanies(prev => [...prev, data]);
      return data;
    } catch (error) {
      handleSupabaseError(error);
    }
  };

  return { companies, isLoading, addCompany };
}