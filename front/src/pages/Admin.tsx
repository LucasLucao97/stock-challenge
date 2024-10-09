import React from 'react';
import ProductForm from '../components/ProductFormAdmin';

const Admin: React.FC = () => {
  const handleSuccess = () => {
    alert('Producto guardado con éxito!');
  };

  return (
    <div>
      <ProductForm onSuccess={handleSuccess} />
    </div>
  );
};

export default Admin;
