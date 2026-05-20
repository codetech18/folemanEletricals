export interface Project {
  id: number;
  title: string;
  category: 'residential' | 'commercial' | 'industrial' | 'maintenance';
  location: string;
  year: string;
  type: 'image' | 'video';
  asset: string;
  poster?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  location: string;
  rating: number;
}
