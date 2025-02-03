import { ChangeEvent } from "react"

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

export interface MatchDialogProps {
  matchedDog: Dog | null;
  open: boolean;
  onClose: () => void;
}

export interface LoginState {
  name: string;
  email: string;
}

export interface LoginFormProps {
  state: {
    name: string;
    email: string;
  };
  handleSubmit: (event: React.FormEvent) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPending: boolean;
  error: Error | null;
}

export interface DogFiltersProps {
  filters: {
    ageMin: string;
    ageMax: string;
    breeds: string;
    zipCodes: string;
  };
  handleFilterChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  setSortOrder: (order: "asc" | "desc") => void;
  sortOrder: "asc" | "desc";
  setPageCursor: (cursor: string) => void;
  breedsList: string[];
}

export interface DashboardTableProps {
  dogs: Dog[];
  handlePage: (direction: "next" | "prev") => void;
  prevCursor: string;
  nextCursor: string;
  total: number;
  paginationModel: { page: number; pageSize: number };
  selectedDogIds: string[];
  onSelectionChange: (newSelection: string[]) => void;
}