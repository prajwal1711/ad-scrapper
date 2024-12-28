import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { StoredAd } from '../types/ads';
import { useAuth } from './useAuth';
import { useToast } from './useToast';

export function useAds(companyId: string) {
  const [ads, setAds] = useState<StoredAd[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    if (!user || !companyId) {
      setAds([]);
      setIsLoading(false);
      return;
    }

    async function fetchAds() {
      try {
        const { data, error } = await supabase
          .from('ads')
          .select('*')
          .eq('company_id', companyId)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setAds(data || []);
      } catch (error) {
        addToast('Failed to fetch ads', 'error');
        console.error('Error fetching ads:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAds();
  }, [companyId, user, addToast]);

  const storeAds = async (companyId: string, newAds: { image_url: string; created_at: string }[]) => {
    if (!user) throw new Error('Must be authenticated to store ads');

    try {
      const { error } = await supabase
        .from('ads')
        .insert(
          newAds.map(ad => ({
            company_id: companyId,
            image_url: ad.image_url,
            created_at: ad.created_at,
            user_id: user.id
          }))
        );

      if (error) throw error;

      // Refresh ads after storing
      const { data: updatedAds, error: fetchError } = await supabase
        .from('ads')
        .select('*')
        .eq('company_id', companyId)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      if (updatedAds) setAds(updatedAds);
    } catch (error) {
      console.error('Error storing ads:', error);
      throw error;
    }
  };

  return { ads, isLoading, storeAds };
}