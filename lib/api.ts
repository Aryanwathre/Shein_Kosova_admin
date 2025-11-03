import axios from 'axios';
import { getAccessToken } from './session'; // if using token auth

// ✅ Create Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://yourapi.com',
  withCredentials: true,
  timeout: 15000, // ⏱️ 15 seconds max wait
});

// ✅ Auto-attach Authorization header
api.interceptors.request.use(async (config) => {
  const token = await getAccessToken?.();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ✅ Handle global errors gracefully
api.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
);

// 🔹 Universal API helpers
export const get = async (endpoint: string, params?: any) => {
  const res = await api.get(endpoint, { params });
  return res.data;
};

export const post = async (endpoint: string, payload?: any, isJSON = true) => {
  const res = await api.post(endpoint, payload, {
    headers: isJSON ? { 'Content-Type': 'application/json' } : {},
  });
  return res.data;
};

export const put = async (endpoint: string, payload?: any) => {
  const res = await api.put(endpoint, payload);
  return res.data;
};

export const del = async (endpoint: string) => {
  const res = await api.delete(endpoint);
  return res.data;
};

export default api;

// =============================
// 📦 PRODUCT APIs
// =============================

// Get All Products
export const getProducts = () => get('/admin/products');

// Add New Product
export const createProduct = (data: any) => post('/admin/products', data);

// Update Product
export const updateProduct = (id: string, data: any) =>
  put(`/admin/products/${id}`, data);

// Delete Product
export const deleteProduct = (id: string) => del(`/admin/products/${id}`);

// Bulk Upload Products via CSV
export const bulkUploadProducts = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return post('/admin/products/import', formData, false);
};

// =============================
// ⚙️ CONFIG APIs (Markup etc.)
// =============================

// Get Markup
export const getMarkup = () => get('/admin/config/markup');

// Update Markup
export const updateMarkup = (percentage: number) =>
  put('/admin/config/markup', { percentage });
