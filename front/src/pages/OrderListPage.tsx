import React, { useEffect, useState } from 'react';
//import '../styles/OrderListPage.css';

interface Product {
  product: {
    _id: string;
    name: string;
    price: number;
  };
  quantity: number;
}

interface Order {
  _id: string;
  status: string;
  products: Product[];
  createdAt: string;
}

const OrderListPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/orders');
      const data = await response.json();

      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        console.error('La respuesta no es un array', data);
        setOrders([]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="order-list-container">
      <h1>Lista de Órdenes</h1>
      {orders.length === 0 ? (
        <p>No hay órdenes disponibles.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <h2>Orden ID: {order._id}</h2>
              <p>Estado: {order.status}</p>
              <p>Fecha de creación: {new Date(order.createdAt).toLocaleString()}</p>
              <h3>Productos:</h3>
              {order.products.length === 0 ? (
                <p>No hay productos en esta orden.</p>
              ) : (
                <ul>
                  {order.products.map((productItem) => (
                    <li key={productItem.product._id}>
                      {productItem.product.name} - Cantidad: {productItem.quantity}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderListPage;
