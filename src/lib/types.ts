export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
}

export interface Area {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface Business {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category_id: string | null;
  area_id: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  latitude: number | null;
  longitude: number | null;
  rating: number | null;
  review_count: number | null;
  price_level: number | null;
  photos: string[] | null;
  opening_hours: string[] | null;
  tags: string[] | null;
  featured: boolean;
  verified: boolean;
  status: string;
  source_data: Record<string, unknown> | null;
  category?: Category;
  area?: Area;
}

export interface Review {
  id: string;
  business_id: string;
  author: string;
  rating: number;
  text: string;
  created_at: string;
}
