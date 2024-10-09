import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import '../styles/ProductForm.css';

interface ProductFormProps {
  onSuccess: () => void;
}

interface DecodedJwt {
  user: {
    id: string;
  };
}

const ProductForm: React.FC<ProductFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number | string>('');
  const [stock, setStock] = useState<number | string>('');
  const [restaurantId, setRestaurantId] = useState<string>('');
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [RestaurantName, setRestaurantName] = useState<string>('');
  
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      const decodedJwt = jwtDecode<DecodedJwt>(JSON.parse(jwt).token);
      const userId = decodedJwt.user.id; 

      const fetchRestaurantId = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_BASE_API}/restaurants/user/${userId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${JSON.parse(jwt).token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Error al obtener el restaurante.');
          }

          const data = await response.json();
          const { _id } = data.restaurant;
          const { name } = data.restaurant;

          setRestaurantId(_id);
          setRestaurantName(name)

          fetchRestaurantProducts(_id);
        } catch (error: any) {
          setError(error);
        }
      };

      fetchRestaurantId();
    }
  }, []);

  const fetchRestaurantProducts = async (restaurantId: string) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_API}/products/restaurant/${restaurantId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')?.split('"')[3]}`,
        },
      });
      const data = await response.json();

      if (data && data.length > 0) {
        setProducts(data);
      } else {
        setError('No se encontraron productos.');
        setProducts([]);
      }
    } catch (err) {
      setError('Error al obtener productos.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = 'http://localhost:3001/api/products/';

    const jwt = localStorage.getItem('jwt');
    const token = jwt ? JSON.parse(jwt).token : null;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          productName: name,
          productPrice: price,
          productStock: stock,
          restaurantId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el producto');
      }

      setName('');
      setPrice('');
      setStock('');

      fetchRestaurantProducts(restaurantId);
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (productId: string) => {
    const jwt = localStorage.getItem('jwt');
    const token = jwt ? JSON.parse(jwt).token : null;

    try {
      await fetch(`${process.env.REACT_APP_BASE_API}/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      fetchRestaurantProducts(restaurantId);
    } catch (err) {
      setError('Error al eliminar el producto.');
    }
  };

  return (
    <div className="product-management">
      <h1>Gestión de Productos</h1>
{/*       {error && <p className="error-message">{error}</p>} */}

      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del producto"
          required
          className="product-form__input"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Precio"
          required
          className="product-form__input"
        />
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Stock"
          required
          className="product-form__input"
        />
        <button type="submit" className="product-form__button">
          Crear
        </button>
      </form>

      <h2>Productos del Restaurante: {RestaurantName}</h2>
      {products.length > 0 ? (
        <ul className="product-list">
          {products.map((product) => (
            <li key={product._id}>
              <span>{product.productName}</span>
              <span>Precio: {product.productPrice}</span>
              <span>Stock: {product.productStock}</span>
              <button onClick={() => handleDelete(product._id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay productos en este restaurante.</p>
      )}
    </div>
  );
};

export default ProductForm;
