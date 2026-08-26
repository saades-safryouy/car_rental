import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BrandManager = () => {
  const [brands, setBrands] = useState([]);
  const [form, setForm] = useState({ id: null, name: '' });

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axios.get('/api/marques');
      setBrands(response.data);
    } catch (error) {
      alert('Erreur lors du chargement des marques');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await axios.put(`/api/marques/${form.id}`, { name: form.name });
      } else {
        await axios.post('/api/marques', { name: form.name });
      }
      fetchBrands();
      setForm({ id: null, name: '' });
    } catch (error) {
      alert('Erreur lors de la sauvegarde de la marque');
    }
  };

  const handleEdit = (brand) => {
    setForm({ id: brand.id, name: brand.name });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/marques/${id}`);
      fetchBrands();
    } catch (error) {
      alert('Erreur lors de la suppression de la marque');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gestion des Marques</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nom de la marque"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {form.id ? 'Modifier' : 'Ajouter'}
        </button>
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Nom</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr key={brand.id}>
              <td className="border p-2">{brand.id}</td>
              <td className="border p-2">{brand.name}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(brand)}
                  className="bg-yellow-500 text-white p-1 mr-2 rounded"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(brand.id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BrandManager;