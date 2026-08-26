import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ id: null, name: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost/api/categories');
      setCategories(response.data);
    } catch (error) {
      alert('Erreur lors du chargement des catégories');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await axios.put(`http://localhost/api/categories/${form.id}`, { name: form.name });
      } else {
        await axios.post('http://localhost/api/categories', { name: form.name });
      }
      fetchCategories();
      setForm({ id: null, name: '' });
    } catch (error) {
      alert('Erreur lors de la sauvegarde de la catégorie');
    }
  };

  const handleEdit = (category) => {
    setForm({ id: category.id, name: category.name });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost/api/categories/${id}`);
      fetchCategories();
    } catch (error) {
      alert('Erreur lors de la suppression de la catégorie');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gestion des Catégories</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nom de la catégorie"
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
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="border p-2">{category.id}</td>
              <td className="border p-2">{category.name}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="bg-yellow-500 text-white p-1 mr-2 rounded"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
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

export default CategoryManager;