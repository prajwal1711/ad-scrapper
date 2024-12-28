export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          name: string
          facebook_url: string
          created_at: string
          user_id: string
        }
        Insert: {
          id?: string
          name: string
          facebook_url: string
          created_at?: string
          user_id: string
        }
        Update: {
          id?: string
          name?: string
          facebook_url?: string
          created_at?: string
          user_id?: string
        }
      }
    }
  }
}