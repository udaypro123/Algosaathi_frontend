
import axios from "axios";
import api from "../../../API/api";
import {
  ADD_NEWS,
  DELETE_NEWS,
  GET_ADMIN_NEWS_BY_CATEGORY,
  GET_ADMIN_NEWS_CATEGORIES,
  GET_NEWS,
  GET_NEWS_BY_CATEGORY,
  GET_NEWS_CATEGORIES,
  UPDATE_NEWS,
} from "../routes/routes";

interface SearchableNews {
  title?: string;
  shortDescription?: string;
  content?: string;
  category?: string;
  subCategory?: string;
  author?: { name?: string };
  source?: { name?: string };
  tags?: string[];
  isPublished?: boolean;
  publishedAt?: string;
  createdAt?: string;
}

// you tube modules routes and api

export const AddNewsdata = async (data: FormData) => {
  const res = await api.post(ADD_NEWS, data);
  legacyNewsPromise = null;
  return res.data;
};

export const updateNews = async (data: FormData) => {
  const res = await api.put(UPDATE_NEWS, data);
  legacyNewsPromise = null;
  return res.data;
};

export const deleteNews = async (id: string) => {
  const res = await api.delete(DELETE_NEWS, {
    data: { id },
  });

  legacyNewsPromise = null;
  return res.data;
};

export const getAllNews= async () => {
  const res = await api.get(GET_NEWS);
  return res.data;
};

let legacyNewsPromise: Promise<SearchableNews[]> | null = null;

const getLegacyNews = async (): Promise<SearchableNews[]> => {
  if (!legacyNewsPromise) {
    legacyNewsPromise = getAllNews()
      .then((response) => {
        if (!response.success) {
          throw new Error(response.message || "Failed to fetch news.");
        }
        if (!Array.isArray(response.data)) return [];
        return response.data.filter(
          (item: unknown): item is SearchableNews =>
            typeof item === "object" && item !== null,
        );
      })
      .catch((error) => {
        legacyNewsPromise = null;
        throw error;
      });
  }

  return legacyNewsPromise;
};

const isEndpointNotAvailable = (error: unknown): boolean =>
  axios.isAxiosError(error) && error.response?.status === 404;

export const getNewsCategories = async (): Promise<string[]> => {
  try {
    const res = await api.get(GET_NEWS_CATEGORIES);
    return res.data.data;
  } catch (error) {
    if (!isEndpointNotAvailable(error)) throw error;

    const news = await getLegacyNews();
    return [...new Set(
      news
        .map((item) => item.category?.trim().toLowerCase())
        .filter((category): category is string => Boolean(category))
    )].sort((first, second) => first.localeCompare(second));
  }
};

export const getNewsByCategory = async (
  category: string,
  skip = 0,
  limit = 9,
  search = "",
) => {
  try {
    const res = await api.get(GET_NEWS_BY_CATEGORY, {
      params: { category, skip, limit, search },
    });
    return res.data;
  } catch (error) {
    if (!isEndpointNotAvailable(error)) throw error;

    const news = await getLegacyNews();
    const normalizedSearch = search.trim().toLowerCase();
    const filteredNews = news.filter((item) => {
      const inSelectedCategory = category === "all"
        || item.category?.trim().toLowerCase() === category.trim().toLowerCase();
      const searchableText = [
        item.title,
        item.shortDescription,
        item.content,
        item.category,
        item.subCategory,
        item.author?.name,
        item.source?.name,
        ...(Array.isArray(item.tags) ? item.tags : []),
      ].join(" ").toLowerCase();

      return inSelectedCategory
        && item.isPublished !== false
        && (!normalizedSearch || searchableText.includes(normalizedSearch));
    });
    return {
      success: true,
      data: filteredNews.slice(skip, skip + limit),
      hasMore: filteredNews.length > skip + limit,
    };
  }
};

export const getAdminNewsCategories = async (): Promise<string[]> => {
  try {
    const res = await api.get(GET_ADMIN_NEWS_CATEGORIES);
    return res.data.data;
  } catch (error) {
    if (!isEndpointNotAvailable(error)) throw error;

    const news = await getLegacyNews();
    return [...new Set(
      news
        .map((item) => item.category?.trim().toLowerCase())
        .filter((category): category is string => Boolean(category))
    )].sort((first, second) => first.localeCompare(second));
  }
};

export const getAdminNewsByCategory = async (
  category: string,
  skip = 0,
  limit = 9,
  search = "",
) => {
  try {
    const res = await api.get(GET_ADMIN_NEWS_BY_CATEGORY, {
      params: { category, skip, limit, search },
    });
    return res.data;
  } catch (error) {
    if (!isEndpointNotAvailable(error)) throw error;

    const news = await getLegacyNews();
    const normalizedSearch = search.trim().toLowerCase();
    const filteredNews = news.filter((item) => {
      const inSelectedCategory = category === "all"
        || item.category?.trim().toLowerCase() === category.trim().toLowerCase();
      const searchableText = [
        item.title,
        item.shortDescription,
        item.content,
        item.category,
        item.subCategory,
        item.author?.name,
        item.source?.name,
        ...(Array.isArray(item.tags) ? item.tags : []),
      ].join(" ").toLowerCase();

      return inSelectedCategory
        && (!normalizedSearch || searchableText.includes(normalizedSearch));
    });
    const sortedNews = [...filteredNews].sort(
      (first, second) =>
        new Date(second.publishedAt || second.createdAt || 0).getTime()
        - new Date(first.publishedAt || first.createdAt || 0).getTime()
    );

    return {
      success: true,
      data: sortedNews.slice(skip, skip + limit),
      hasMore: sortedNews.length > skip + limit,
    };
  }
};
