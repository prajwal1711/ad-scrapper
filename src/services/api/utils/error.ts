import { AxiosError } from 'axios';
import logger from '../../../utils/logger';

interface ErrorConfig {
  title: string;
  [key: number]: string;
  default: string;
}

export const handleApiError = (error: unknown, errorConfig: ErrorConfig): Error => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const errorMessage = status ? errorConfig[status] || errorConfig.default : errorConfig.default;

    logger.error(`${errorConfig.title}:`, {
      status,
      data: error.response?.data,
      message: error.message
    });

    return new Error(errorMessage);
  }
  
  logger.error(`${errorConfig.title}:`, error);
  return error instanceof Error ? error : new Error(errorConfig.default);
};