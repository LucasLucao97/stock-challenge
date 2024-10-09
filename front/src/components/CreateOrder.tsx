import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';

interface OrderItem {
  productPrice: number;
  productId: string;
  quantity: number;
}

interface Product {
  _id: string;
  productName: string;
  productPrice: number;
  productStock: number;
}

const CreateOrderPage: React.FC = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addToOrder = (product: Product, quantity: number) => {
    setOrderItems((prevItems) => {
  const existingItem = prevItems.find(item => item.productId === product._id);

  if (existingItem) {
    return prevItems.map(item =>
      item.productId === product._id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [
    ...prevItems,
    { productId: product._id, quantity: 1, productPrice: product.productPrice } 
  ];
});
  };

  const handleCreateOrder = async () => {
    const jwt = localStorage.getItem('jwt');
    const restaurantId = localStorage.getItem('restaurantId');
  
    if (!jwt) {
      console.error('JWT no encontrado. El usuario no está autenticado.');
      setError('error');
      return;
    }
  
    try {
      const parsedJwt = JSON.parse(jwt);
      if (!parsedJwt.token) {
        console.error('Token no encontrado en el JWT.');
        setError('error');
        return; 
      }
  
      const response = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${parsedJwt.token}`,
        },
        body: JSON.stringify({
          productList: orderItems,
          status: 'Pendiente',
          totalPrice: orderItems.reduce((acc, item) => acc + item.quantity * item.productPrice, 0),
          restaurantId,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error al crear la orden');
      }
  
      const data = await response.json();
      console.log('Orden creada con éxito', data);
    } catch (err: any) {
      console.error('Error al crear la orden:', err);
      setError(err);
    }
  };
  

  return (
    <div>
      <h1>Crear Pedido</h1>
      <ProductList onAddToOrder={addToOrder} />
      <button onClick={handleCreateOrder}>Crear Pedido</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreateOrderPage;
