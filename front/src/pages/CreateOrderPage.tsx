import React, { useEffect, useState } from 'react';
import '../components/CreateOrder'
interface OrderItem {
    _id: string;
    status: string;
    totalPrice: number;
}

const CreateOrderPage = () => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const fetchProducts = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/orders`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${JSON.parse(jwt).token}`,
            },
          });
          const data = await response.json();
          setOrders(data);
        } catch (err: any) {
          setError(error);
        }
      };
  
      fetchProducts();
    } 
  }, []);

  return (
    <div>
      <h1>Órdenes</h1>
      {error && <p>{error}</p>}
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <span>Estado: {order.status}</span>
            <span>Total: {order.totalPrice}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateOrderPage;
