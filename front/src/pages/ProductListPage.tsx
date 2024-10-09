import React, { useEffect, useState } from 'react'; 
import ProductItem from '../components/ProductItem'; 
import '../styles/ProductList.css'; 

const ProductListPage: React.FC = () => { 
  const [products, setProducts] = useState<any[]>([]); 

  const fetchProducts = async () => { 
    const response = await fetch('http://localhost:3001/api/products'); 
    const data = await response.json(); 
    setProducts(data); 
  }; 

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:3001/api/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  return (
    <div>
      <h1>Lista de Productos</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductItem 
            key={product._id}
            product={product}
            onDelete={() => handleDelete(product._id)} onEdit={function (): void {
              throw new Error('Function not implemented.');
            } }          />
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
