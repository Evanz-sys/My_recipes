import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    const Token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${Token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const obtenerDatos = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener datos');
  }
};

export default api;
