// src/api/core/client.js
import axios from 'axios';
import { API_URL } from '@env'; // Birbaşa .env faylından gəlir
import { storage } from '../../utils/storage';

console.log("🚀 API URL:", API_URL); // Yoxlamaq üçün

const client = axios.create({
  baseURL: API_URL, // .env-dən gələn dəyər
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor
client.interceptors.request.use(
  async (config) => {
    const token = await storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Session expired");
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default client;
