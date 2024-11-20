import axios from "axios";

const API_KEY = "01c6bd8102194e17b16be8b7fd2bc5a2";
const BASE_URL = "https://newsapi.org/v2";
const ITEMS_PER_PAGE = 12;

export const getNews = async (
  query?: string,
  category?: string,
  fromDate?: string,
  toDate?: string,
  page: number = 1
) => {
  try {
    const params: Record<string, string | number> = {
      apiKey: API_KEY,
      language: "en",
      pageSize: ITEMS_PER_PAGE,
      page,
    };

    if (query) params.q = query;
    if (category && category !== "all") params.category = category;
    if (fromDate) params.from = fromDate;
    if (toDate) params.to = toDate;

    const response = await axios.get(`${BASE_URL}/top-headlines`, { params });
    return {
      articles: response.data.articles,
      totalResults: response.data.totalResults,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching news:", error);
    return {
      articles: [],
      totalResults: 0,
      currentPage: page,
    };
  }
};
