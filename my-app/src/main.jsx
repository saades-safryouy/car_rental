// Vérifiez si votre index.js ou main.jsx ressemble à ceci
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Problème potentiel
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* Ceci pourrait être le problème */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);