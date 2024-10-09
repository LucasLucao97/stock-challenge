import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface DecodedJwt {
  user: { 
    id: string;
  };
}

const CreateRestaurantPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const decodedJwt = jwtDecode<DecodedJwt>(JSON.parse(jwt).token);
      const userId = decodedJwt.user.id;
      console.log(userId); 

      const checkRestaurant = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/restaurants/user/${userId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${JSON.parse(jwt).token}`,
            },
          });

          const data = await response.json();
          
          if (data.restaurant) {
            setError('Ya tienes un restaurante creado.');
            navigate('/admin');
          }
        } catch (err) {
          console.error('Error verificando restaurante:', err);
          setError('Error verificando restaurante');
        }
      };

      checkRestaurant();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const jwt = localStorage.getItem('jwt');
    const token = jwt ? JSON.parse(jwt).token : null;

    const decodedJwt = jwt ? jwtDecode<DecodedJwt>(JSON.parse(jwt).token) : null;
    const userId = decodedJwt?.user.id;

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_API}/restaurants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          userId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error creando el restaurante');
      }

      setLoading(false);
      navigate('/admin'); 
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="create-restaurant-page">
      <h1>Crear Restaurante</h1>
      {error && <p className="error-message">{error}</p>}

      {!error && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre del Restaurante"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Creando...' : 'Crear Restaurante'}
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateRestaurantPage;
