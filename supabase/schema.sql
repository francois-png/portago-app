-- Portago Database Schema
-- Run this against Supabase SQL Editor or via service_role API

-- Categories
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Areas/Locations
CREATE TABLE areas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Businesses (main listings table)
CREATE TABLE businesses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category_id UUID REFERENCES categories(id),
  area_id UUID REFERENCES areas(id),
  address TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  rating DECIMAL,
  review_count INT DEFAULT 0,
  price_level TEXT,
  photos TEXT[],
  opening_hours JSONB,
  languages TEXT[],
  tags TEXT[],
  featured BOOLEAN DEFAULT false,
  verified BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active',
  source TEXT,
  source_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Waitlist signups (for AI Concierge)
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL UNIQUE,
  interest TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Business signup requests (List Your Business)
CREATE TABLE business_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_name TEXT NOT NULL,
  business_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  category TEXT,
  website TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Reviews
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  author_name TEXT,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Public read access for listings
CREATE POLICY "Public can view active businesses" ON businesses FOR SELECT USING (status = 'active');
CREATE POLICY "Public can view categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public can view areas" ON areas FOR SELECT USING (true);
CREATE POLICY "Public can view reviews" ON reviews FOR SELECT USING (true);

-- Public can insert to waitlist and business signups
CREATE POLICY "Public can join waitlist" ON waitlist FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can submit business signup" ON business_signups FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can submit reviews" ON reviews FOR INSERT WITH CHECK (true);

-- Create indexes
CREATE INDEX idx_businesses_category ON businesses(category_id);
CREATE INDEX idx_businesses_area ON businesses(area_id);
CREATE INDEX idx_businesses_status ON businesses(status);
CREATE INDEX idx_businesses_rating ON businesses(rating DESC);
CREATE INDEX idx_businesses_slug ON businesses(slug);
CREATE INDEX idx_reviews_business ON reviews(business_id);
