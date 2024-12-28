import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AdGrid } from '../components/AdGrid';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { fetchAdsData } from '../services/api';
import { useCompanies } from '../hooks/useCompanies';
import { useAds } from '../hooks/useAds';
import { useToast } from '../hooks/useToast';
import { useAuth } from '../hooks/useAuth';
import type { AdResponse } from '../types/ads';
import { Calendar, RefreshCw } from 'lucide-react';
import logger from '../utils/logger';

export const CompanyPage = () => {
  const { id = '' } = useParams<{ id: string }>();
  const { companies } = useCompanies();
  const { ads, storeAds, isLoading: isLoadingStoredAds } = useAds(id);
  const { addToast } = useToast();
  const { user } = useAuth();
  const [fetchedAds, setFetchedAds] = useState<AdResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [retrying, setRetrying] = useState(false);

  const company = companies.find(c => c.id === id);

  const loadAds = async (showToast = true) => {
    if (!company?.facebook_url || !user) {
      logger.warn('Cannot load ads: missing company URL or user');
      return;
    }
    
    setLoading(true);
    try {
      logger.info('Fetching ads for company:', company.name);
      const adsData = await fetchAdsData(company.facebook_url);
      setFetchedAds(adsData);

      if (adsData.length === 0) {
        addToast('No ads found for this company', 'info');
        return;
      }

      const adsToStore = adsData.map(ad => ({
        image_url: ad.snapshot.cards[0].originalImageUrl,
        created_at: ad.snapshot.createdAt || new Date().toISOString()
      }));

      await storeAds(company.id, adsToStore);
      if (showToast) {
        addToast(`Successfully loaded ${adsData.length} ads`, 'success');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch ads';
      addToast(message, 'error');
      logger.error('Error loading ads:', error);
    } finally {
      setLoading(false);
      setRetrying(false);
    }
  };

  useEffect(() => {
    if (company && user && ads.length === 0 && !loading && !retrying) {
      loadAds(false);
    }
  }, [company?.facebook_url, user, ads.length]);

  if (!user) {
    return <div className="p-8">Please sign in to view company details</div>;
  }

  if (!company) {
    return <div className="p-8">Company not found</div>;
  }

  const dateRange = ads.length > 0 ? {
    earliest: new Date(Math.min(...ads.map(ad => new Date(ad.created_at).getTime()))),
    latest: new Date(Math.max(...ads.map(ad => new Date(ad.created_at).getTime())))
  } : null;

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
          <button
            onClick={() => {
              setRetrying(true);
              loadAds();
            }}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Loading...' : 'Refresh Ads'}
          </button>
        </div>
        {dateRange && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>
              Ads from {dateRange.earliest.toLocaleDateString()} to {dateRange.latest.toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
      
      {(loading || isLoadingStoredAds) ? (
        <LoadingSpinner />
      ) : (
        <AdGrid ads={ads.map(ad => ({
          snapshot: {
            cards: [{ originalImageUrl: ad.image_url }],
            createdAt: ad.created_at
          }
        }))} />
      )}
    </div>
  );
};