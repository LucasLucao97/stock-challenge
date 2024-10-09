import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import ProductListPage from './pages/ProductListPage';
import OrderListPage from './pages/OrderListPage';
import CreateOrderPage from './pages/CreateOrderPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import authService from './services/authService';
import CreateRestaurantPage from './pages/CreateRestaurantPage';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const checkAuth = () => {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        const tokenData = JSON.parse(jwt);
        const isValid = isTokenValid(tokenData.token);
        setIsAuthenticated(isValid);
      }
      setLoading(false); 
    };

    checkAuth();
  }, []);

  const isTokenValid = (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000; 
    } catch (error) {
      return false;
    }
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  return (
    <div className="app-container">
      <Router>
        <header className="app-header">
          <h1 className="app-title">Challenge</h1>
          {isAuthenticated ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <div>
              <a href="/login">Login</a> | <a href="/register">Register</a>
            </div>
          )}
        </header>
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/login" 
              element={isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} />} 
            />
            <Route 
              path="/register" 
              element={isAuthenticated ? <Navigate to="/" /> : <Register />} 
            />
            <Route 
              path="/admin" 
              element={loading ? null : <ProtectedRoute isAuthenticated={isAuthenticated}><Admin /></ProtectedRoute>} 
            />
            {/* <Route 
              path="/productlist" 
              element={loading ? null : <ProtectedRoute isAuthenticated={isAuthenticated}><ProductListPage /></ProtectedRoute>} 
            /> */}
            {/* <Route 
              path="/orderlist" 
              element={loading ? null : <ProtectedRoute isAuthenticated={isAuthenticated}><OrderListPage /></ProtectedRoute>} 
            /> */}
            <Route 
              path="/create-order" 
              element={loading ? null : <ProtectedRoute isAuthenticated={isAuthenticated}><CreateOrderPage /></ProtectedRoute>} 
            />
            <Route 
              path="/create-restaurant" 
              element={loading ? null : <ProtectedRoute isAuthenticated={isAuthenticated}><CreateRestaurantPage /></ProtectedRoute>} 
            />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>...</p>
        </footer>
      </Router>
    </div>
  );
};

export default App;
