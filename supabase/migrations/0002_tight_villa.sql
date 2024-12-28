/*
  # Add Facebook URL to companies table

  1. Changes
    - Add facebook_url column to companies table
    - Update RLS policies for better security
*/

-- Add facebook_url column if it doesn't exist
DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'companies' AND column_name = 'facebook_url'
  ) THEN
    ALTER TABLE companies ADD COLUMN facebook_url text NOT NULL;
  END IF;
END $$;

-- Drop existing RLS policy if it exists
DROP POLICY IF EXISTS "Users can manage their own companies" ON companies;

-- Create updated RLS policy
CREATE POLICY "Users can manage their own companies"
  ON companies
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);