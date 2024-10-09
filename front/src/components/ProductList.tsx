import React, { useEffect, useState } from 'react';

interface Product {
  _id: string;
  productName: string;
  productPrice: number;
  productStock: number;
}

interface ProductListProps {
  onAddToOrder: (product: Product, quantity: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onAddToOrder }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:3001/api/products'); 
      if (!response.ok) {
        setError('Error al cargar productos');
        return;
      }
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Lista de Productos</h2>
      {error && <p>{error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <span>{product.productName} - ${product.productPrice}</span>
            <button onClick={() => onAddToOrder(product, 1)}>Añadir a Pedido</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
