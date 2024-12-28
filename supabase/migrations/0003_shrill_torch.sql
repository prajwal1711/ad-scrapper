/*
  # Authentication and Database Schema Setup
  
  1. Tables
    - Update companies table with proper foreign key constraints
    - Add indexes for performance
  
  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Ensure proper foreign key constraint for user_id
ALTER TABLE companies 
DROP CONSTRAINT IF EXISTS companies_user_id_fkey,
ADD CONSTRAINT companies_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES auth.users(id) 
  ON DELETE CASCADE;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS companies_user_id_idx ON companies(user_id);
CREATE INDEX IF NOT EXISTS companies_created_at_idx ON companies(created_at);

-- Update RLS policies
DROP POLICY IF EXISTS "Users can manage their own companies" ON companies;

CREATE POLICY "Users can read own companies"
  ON companies
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own companies"
  ON companies
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own companies"
  ON companies
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own companies"
  ON companies
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);