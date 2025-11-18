// types/book.ts

export interface Book {
  isbn13: string;
  title: string;
  subtitle?: string;
  authors?: string;
  publisher?: string;
  pages?: string;
  year?: string;
  rating?: string;
  desc?: string;
  price?: string;
  image?: string;
  url?: string;
}

export interface BookSearchResult {
  total: string;
  page: number;
  books: Book[];
}

export interface NewReleasesResponse {
  books: Book[];
}

export interface BookDetailsResponse {
  error?: string;
  authors?: string;
  desc?: string;
  image?: string;
  isbn10?: string;
  isbn13?: string;
  language?: string;
  pages?: string;
  price?: string;
  publisher?: string;
  rating?: string;
  subtitle?: string;
  title?: string;
  url?: string;
  year?: string;
  pdf?: {
    [key: string]: string;
  };
}