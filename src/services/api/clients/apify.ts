import axios from 'axios';
import type { ApifyRunResponse, AdResponse, TaskStatus } from '../../../types/ads';
import { handleApiError } from '../utils/error';
import { APIFY_ERRORS } from '../constants/errors';
import logger from '../../../utils/logger';

const APIFY_API_TOKEN = 'apify_api_72scjrZLxanagBK7Usg5grqFjhaTgL1wxoqW';
const TASK_ID = 'qSXi848jIbc8enBWe';

const api = axios.create({
  baseURL: 'https://api.apify.com/v2',
  timeout: 30000,
  params: {
    token: APIFY_API_TOKEN
  }
});

export const apifyClient = {
  startCrawl: async (url: string): Promise<ApifyRunResponse> => {
    try {
      logger.debug('Starting crawl for URL:', url);
      const response = await api.post<ApifyRunResponse>(
        `/actor-tasks/${TASK_ID}/runs`,
        {
          memory: 256, // Reduced memory requirement
          build: "latest",
          timeout: 60, // 1 minute timeout
          startUrls: [{ url }]
        }
      );
      logger.debug('Crawl started:', response.data);
      return response;
    } catch (error) {
      logger.error('Apify crawl error:', error);
      throw handleApiError(error, APIFY_ERRORS.START_CRAWL);
    }
  },

  checkStatus: async (runId: string): Promise<TaskStatus> => {
    try {
      const response = await api.get<TaskStatus>(`/actor-runs/${runId}`);
      logger.debug('Task status:', response.data);
      return response;
    } catch (error) {
      throw handleApiError(error, APIFY_ERRORS.CHECK_STATUS);
    }
  },

  getResults: async (datasetId: string): Promise<AdResponse[]> => {
    try {
      const response = await api.get<AdResponse[]>(
        `/datasets/${datasetId}/items`,
        {
          params: {
            format: 'json',
            clean: 1
          }
        }
      );
      logger.debug('Results received:', response.data);
      return response.data;
    } catch (error) {
      throw handleApiError(error, APIFY_ERRORS.FETCH_RESULTS);
    }
  }
};