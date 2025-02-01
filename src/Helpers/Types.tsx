export interface Dog {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
}

export interface Location {
  zip_code: string
  latitude: number
  longitude: number
  city: string
  state: string
  county: string
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface Match {
  match: string
}

export interface DogsSearchResponse {
  resultIds: string[]; 
  next: string | null;
  prev: string | null;
}

export interface DashboardTableProps {
  dogs: Dog[];
  handlePage: (direction: 'next' | 'prev') => void;
  prevCursor: string;
  nextCursor: string;
}