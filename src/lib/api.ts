/** @format */

import axios from 'axios';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://luxestate-wd2s.onrender.com';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('lux_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export interface Listing {
  id: string;
  _id: string;
  slug: string;
  title: string;
  description: string;
  listing_type: 'buy' | 'rent' | 'both';
  price: {
    amount: number;
    currency: string;
    period?: string;
  };
  location: {
    address: string;
    city: string;
    state: string;
    neighborhood: string;
  };
  bedrooms: number;
  bathrooms: number;
  size_sqm: number;
  images: { url: string; alt: string }[];
  features?: string[];
  agent_name?: string;
}

export const listingsApi = {
  getAll: async (params?: any) => {
    // Mock data fallback if backend isn't ready
    try {
      return await api.get('/api/listings', { params });
    } catch (e) {
      console.warn('Backend unavailable, using mock data');
      return { data: { listings: [], total: 0 } };
    }
  },
  getFeatured: async () => {
    try {
      return await api.get('/api/listings', {
        params: { is_featured: true, limit: 6 },
      });
    } catch (e) {
      return { data: { listings: [] } };
    }
  },
  getBySlug: async (slug: string) => {
    // This now hits a specific backend endpoint.
    // The backend needs to have a route like GET /api/listings/slug/{slug}
    return api.get(`/api/listings/slug/${slug}`);
  },
  get: async (id: string) => api.get(`/api/listings/${id}`),
  getStats: async () => {
    try {
      return await api.get('/api/listings/stats');
    } catch (e) {
      // Return fallback stats
      return {
        data: { total_listings: 124, total_value: '85B', happy_clients: 450 },
      };
    }
  },
  seed: async () => api.post('/api/listings/seed'),
  create: (data: any) => api.post('/api/listings', data),
  update: (id: string, data: any) => api.put(`/api/listings/${id}`, data),
  delete: (id: string) => api.delete(`/api/listings/${id}`),
};

export const authApi = {
  login: (data: any) => {
    const params = new URLSearchParams();
    params.append('username', data.username);
    params.append('password', data.password);
    return api.post('/api/auth/login', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  },
  register: (data: any) => api.post('/api/auth/register', data),
  forgotPassword: (data: any) => api.post('/api/auth/forgot-password', data),
  resetPassword: (data: any) => api.post('/api/auth/reset-password', data),
  changePassword: (data: any) =>
    api.post('/api/users/me/change-password', data),
  updateMe: (data: any) => api.put('/api/users/me', data),
  getMe: () => api.get('/api/users/me'),
};

export const contactApi = {
  send: (data: any) => api.post('/api/contact', data),
};

export const dashboardApi = {
  getMyRequests: async () => {
    return api.get(`/api/contact/my-requests`);
  },
  getAdminStats: async () => {
    return api.get('/api/contact/stats');
  },
  getAdminMessages: async () => {
    return api.get('/api/contact');
  },
  getInvestments: async () => {
    return {
      data: [
        {
          id: 1,
          property: 'Hudson Yards Signature Tower',
          shares: 50,
          value: 50000,
          roi: 12.5,
          trend: 'up',
        },
        {
          id: 2,
          property: 'Star Island Villa',
          shares: 25,
          value: 75000,
          roi: 8.2,
          trend: 'stable',
        },
      ],
    };
  },
};

export const formatPrice = (price: any) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price?.currency || 'USD', // Default to USD if not provided
    maximumSignificantDigits: 3,
  }).format(price?.amount || 0);
};
