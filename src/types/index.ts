import { IconType } from "react-icons";

export interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
  urlToImage: string;
  readTime: number;
  publishedAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: IconType;
}

export interface NewsResponse {
  articles: Article[];
  totalResults: number;
  currentPage: number;
}
