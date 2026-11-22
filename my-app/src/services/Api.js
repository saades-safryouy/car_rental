import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://carrental-production-6b89444d.up.railway.app/api';

export const api = {
  categories: {
    getAll: () => axios.get(`${API_URL}/categories`),
    getOne: (id) => axios.get(`${API_URL}/categories/${id}`),
    create: (data) => axios.post(`${API_URL}/categories`, data),
    update: (id, data) => axios.put(`${API_URL}/categories/${id}`, data),
    delete: (id) => axios.delete(`${API_URL}/categories/${id}`)
  },
  
  marques: {
    getAll: () => axios.get(`${API_URL}/marques`),
    getOne: (id) => axios.get(`${API_URL}/marques/${id}`),
    create: (data) => axios.post(`${API_URL}/marques`, data),
    update: (id, data) => axios.put(`${API_URL}/marques/${id}`, data),
    delete: (id) => axios.delete(`${API_URL}/marques/${id}`)
  },
  
  voitures: {
    getAll: () => axios.get(`${API_URL}/voitures`),
    getOne: (id) => axios.get(`${API_URL}/voitures/${id}`),
    create: (data) => axios.post(`${API_URL}/voitures`, data),
    update: (id, data) => axios.put(`${API_URL}/voitures/${id}`, data),
    delete: (id) => axios.delete(`${API_URL}/voitures/${id}`)
  }
};