import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Composant pour récupérer les marques
const Marques = ({ onDataFetched }) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://carrental-production-6b89444d.up.railway.app/api/marques');
        const data = Array.isArray(response.data) ? response.data : [];
        setBrands(data);
        onDataFetched(data); // Passe les données au parent
        setError(null);
      } catch (err) {
        setError('Impossible de charger les marques');
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, [onDataFetched]);

  // Rendu invisible car utilisé uniquement pour les données
  return null;
};

export default Marques;