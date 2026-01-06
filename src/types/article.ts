// src/types/article.ts

export interface Article {
  id: number;
  thumbnailUrl: string;
  title: string;
  summary: string;
  source: string;
  originalPublishedDate: string;
  originalUrl: string;
  targetRoles: string[];
}

export interface SearchArticlesResponse {
  totalArticles: number;
  totalPages: number;
  articles: Article[];
}
