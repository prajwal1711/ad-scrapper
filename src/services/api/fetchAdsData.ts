import { AdResponse } from '../../types/ads';
import { startAdsCrawl, checkTaskStatus, getAdsResults } from './apifyClient';
import logger from '../../utils/logger';

export const fetchAdsData = async (url: string): Promise<AdResponse[]> => {
  try {
    logger.info('Starting ads fetch process for:', url);
    const runResponse = await startAdsCrawl(url);
    const { id: runId, defaultDatasetId } = runResponse.data;

    let taskStatus;
    let attempts = 0;
    const maxAttempts = 24; // 2 minutes with 5-second intervals

    do {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      taskStatus = await checkTaskStatus(runId);
      attempts++;

      if (attempts >= maxAttempts) {
        throw new Error('Task timed out after 2 minutes');
      }
    } while (taskStatus.data.status === 'RUNNING');

    if (taskStatus.data.status === 'SUCCEEDED') {
      return await getAdsResults(defaultDatasetId);
    } else {
      throw new Error(`Task failed with status: ${taskStatus.data.status}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch ads: ${error.message}`);
    }
    throw new Error('Failed to fetch ads: Unknown error');
  }
};