import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || 'https://carrental-production-6b89444d.up.railway.app/api';

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${API_URL}/voitures`);
        setCars(response.data);
        console.log('Cars fetched:', response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cars');
        console.error('Fetch error:', err);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Ne rend rien visuellement
  return null;
};

export default FetchCars;