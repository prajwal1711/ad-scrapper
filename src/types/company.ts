export interface Company {
  id: string;
  name: string;
  facebook_url: string;
  created_at: string;
  user_id: string;
}

export interface CreateCompanyInput {
  name: string;
  facebook_url: string;
}