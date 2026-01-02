-- Create a table for public profiles
CREATE TABLE public.profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  full_name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  company TEXT NOT NULL,
  profile_image TEXT,
  bio TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  website TEXT,
  social_links JSONB DEFAULT '{}',
  custom_theme JSONB DEFAULT '{}',
  slug TEXT UNIQUE NOT NULL,
  visits INTEGER DEFAULT 0,
  qr_code_scans INTEGER DEFAULT 0
);

-- Create a storage bucket for profile images
INSERT INTO storage.buckets (id, name, public)
VALUES ('profiles', 'profiles', true)
ON CONFLICT (id) DO NOTHING;

-- Set up Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (true);

-- Create index on slug for faster lookups
CREATE INDEX profiles_slug_idx ON public.profiles(slug);

-- Set up storage policies
CREATE POLICY "Anyone can view profile images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profiles');

CREATE POLICY "Anyone can upload profile images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'profiles');

-- Create a function to handle automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.created_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at (optional, if you add that column later)
-- CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.profiles
--   FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
