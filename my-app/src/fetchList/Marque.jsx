import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(`${API_URL}/marques`);
        setBrands(response.data);
        console.log('Brands fetched:', response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch brands');
        console.error('Fetch error:', err);
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  // Ne rend rien visuellement
  return null;
};

export default FetchBrands;