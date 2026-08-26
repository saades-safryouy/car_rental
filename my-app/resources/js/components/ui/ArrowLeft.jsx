import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBigLeft } from 'lucide-react';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-300"
    >
      <ArrowBigLeft className="w-5 h-5 mr-2" />
      Retour
    </button>
  );
};

export default BackButton;