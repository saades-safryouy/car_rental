import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "https://carrental-production-6b89444d.up.railway.app/api";

export const SearchService = {
  async getAllData() {
    try {
      const [voitures, marques, categories] = await Promise.all([
        axios.get(`${API_URL}/voitures`),
        axios.get(`${API_URL}/marques`),
        axios.get(`${API_URL}/categories`)
      ]);

      return {
        voitures: voitures.data,
        marques: marques.data,
        categories: categories.data
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      throw error;
    }
  },

  async searchByAvailability(dateDebut, dateFin) {
    try {
      const response = await axios.get(`${API_URL}/locations/check-availability`, {
        params: { start: dateDebut, end: dateFin }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la vérification de disponibilité:', error);
      throw error;
    }
  }
};
