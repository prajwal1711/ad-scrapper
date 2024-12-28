export interface AdCard {
  originalImageUrl: string;
  createdAt?: string;
}

export interface AdSnapshot {
  cards: AdCard[];
  createdAt?: string;
}

export interface AdResponse {
  snapshot: AdSnapshot;
  createdAt?: string;
}

export interface ApifyRunResponse {
  data: {
    id: string;
    defaultDatasetId: string;
    status: string;
  };
}

export interface TaskStatus {
  status: 'RUNNING' | 'SUCCEEDED' | 'FAILED' | 'TIMEOUT';
  data: {
    status: 'RUNNING' | 'SUCCEEDED' | 'FAILED' | 'TIMEOUT';
  };
}

export interface StoredAd {
  id: string;
  company_id: string;
  image_url: string;
  created_at: string;
  user_id: string;
}