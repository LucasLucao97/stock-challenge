import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

interface DecodedJwt {
  user: {
    id: string;
  };
}

const Home: React.FC = () => {
  const [RestaurantName, setRestaurantName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
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
          const { name } = data.restaurant; 
          if (name){
            setRestaurantName(name)
          } else {
            setRestaurantName('Sin restaurant')
          }

        } catch (error: any) {
          setError(error);
        }
      };

      fetchRestaurantId();
    }
  }, []);


  return (
    <div className="home-container"> 
      <h1 className="home-title">{RestaurantName}</h1> 
      <nav className="home-nav">
        <ul className='home-ul'> 
          <li className="home-li"><Link to="/admin">Administración de Productos</Link></li>
          {/* <li className="home-li"><Link to="/productlist">Lista de Productos</Link></li> */}
          {/* <li className="home-li"><Link to="/orderlist">Lista de Órdenes</Link></li> */}
          <li className="home-li"><Link to="/create-order">Crear Ordenes</Link></li>
          <li className="home-li"><Link to="/create-restaurant">Crear restaurant</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
