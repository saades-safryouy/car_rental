import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || 'https://carrental-production-6b89444d.up.railway.app/api';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories`);
        setCategories(response.data);
        console.log('Categories fetched:', response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch categories');
        console.error('Fetch error:', err);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Ne rend rien visuellement
  return null;
};

export default FetchCategories;