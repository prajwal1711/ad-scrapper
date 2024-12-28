export const APIFY_ERRORS = {
  START_CRAWL: {
    title: 'Failed to start crawl',
    402: 'Memory limit exceeded. Try again with fewer results.',
    429: 'Rate limit exceeded. Please try again later.',
    default: 'Failed to start the crawl. Please try again.'
  },
  CHECK_STATUS: {
    title: 'Failed to check status',
    default: 'Failed to check crawl status. Please try again.'
  },
  FETCH_RESULTS: {
    title: 'Failed to fetch results',
    default: 'Failed to fetch ad results. Please try again.'
  }
} as const;