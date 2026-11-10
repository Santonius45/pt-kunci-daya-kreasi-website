// Strict type definitions for PT Kunci Daya Kreasi domain model

export type PageRoute = 'beranda' | 'tentang' | 'katalog' | 'detail' | 'kontak';

export interface CompanyInfo {
  legalName: string;
  legalEntityForm: string;
  businessSector: string;
  kbliCode: string;
  officialDomain: string;
  officialEmail: string;
  positioning: string;
  slogan: string;
}

export interface BookEdition {
  format: 'Paperback' | 'Hardcover';
  publisher: string;
  isbnStatus: string;
  releaseStatus: string;
  price?: string;
}

export interface BookDetail {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  language: string;
  editions: BookEdition[];
  synopsis: string;
  digitalHistory: {
    description: string;
    amazonUrl: string;
    googlePlayUrl: string;
  };
  permanentUrl: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
