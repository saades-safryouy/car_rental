import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Composant pour récupérer les catégories
const Categories = ({ onDataFetched }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://carrental-production-6b89444d.up.railway.app/api/categories');
        const data = Array.isArray(response.data) ? response.data : [];
        setCategories(data);
        onDataFetched(data); // Passe les données au parent
        setError(null);
      } catch (err) {
        setError('Impossible de charger les catégories');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [onDataFetched]);

  // Rendu invisible car utilisé uniquement pour les données
  return null;
};

export default Categories;