import axios, { AxiosError } from 'axios';
import { ApifyRunResponse, AdResponse, TaskStatus } from '../../types/ads';
import logger from '../../utils/logger';

const APIFY_API_TOKEN = 'apify_api_72scjrZLxanagBK7Usg5grqFjhaTgL1wxoqW';
const TASK_ID = 'qSXi848jIbc8enBWe';

const api = axios.create({
  timeout: 30000,
});

const handleApiError = (error: unknown, context: string) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    logger.error(`${context}:`, {
      status: axiosError.response?.status,
      data: axiosError.response?.data,
      message: axiosError.message
    });
  } else {
    logger.error(`${context}:`, error);
  }
  throw error;
};

export const startAdsCrawl = async (url: string): Promise<ApifyRunResponse> => {
  try {
    logger.info('Starting ads crawl for URL:', url);
    const response = await api.post<ApifyRunResponse>(
      `https://api.apify.com/v2/actor-tasks/${TASK_ID}/runs?token=${APIFY_API_TOKEN}`,
      {
        resultsLimit: 10,
        startUrls: [{ url }]
      }
    );
    logger.debug('Crawl started successfully:', response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error starting ads crawl');
    throw error;
  }
};

export const checkTaskStatus = async (runId: string): Promise<TaskStatus> => {
  try {
    const response = await api.get<TaskStatus>(
      `https://api.apify.com/v2/actor-runs/${runId}?token=${APIFY_API_TOKEN}`
    );
    logger.debug('Task status:', response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error checking task status');
    throw error;
  }
};

export const getAdsResults = async (datasetId: string): Promise<AdResponse[]> => {
  try {
    const response = await api.get<AdResponse[]>(
      `https://api.apify.com/v2/datasets/${datasetId}/items?token=${APIFY_API_TOKEN}&format=json`
    );
    logger.debug('Received ads results:', response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error fetching ads results');
    throw error;
  }
};