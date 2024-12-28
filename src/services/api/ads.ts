import { AdResponse } from '../../types/ads';
import { apifyClient } from './clients/apify';
import logger from '../../utils/logger';

export const fetchAdsData = async (url: string): Promise<AdResponse[]> => {
  try {
    logger.info('Starting ads fetch for:', url);
    
    // Start the crawl
    const runResponse = await apifyClient.startCrawl(url);
    if (!runResponse?.data?.id) {
      throw new Error('Failed to start crawl: No run ID received');
    }

    const { id: runId, defaultDatasetId } = runResponse.data;
    logger.debug('Crawl started with ID:', runId);

    // Poll for status
    let attempts = 0;
    const maxAttempts = 12; // 1 minute with 5-second intervals
    let taskStatus;

    do {
      await new Promise(resolve => setTimeout(resolve, 5000));
      taskStatus = await apifyClient.checkStatus(runId);
      attempts++;
      logger.debug(`Check attempt ${attempts}, status:`, taskStatus?.data?.status);

      if (attempts >= maxAttempts) {
        throw new Error('Task timed out after 1 minute');
      }
    } while (taskStatus?.data?.status === 'RUNNING');

    if (taskStatus?.data?.status !== 'SUCCEEDED') {
      throw new Error(`Task failed with status: ${taskStatus?.data?.status}`);
    }

    // Get results
    const results = await apifyClient.getResults(defaultDatasetId);
    logger.info(`Successfully fetched ${results.length} ads`);
    return results;

  } catch (error) {
    logger.error('Failed to fetch ads:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch ads');
  }
};