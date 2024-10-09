import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface DecodedJwt {
  user: {
    id: string;
    email: string;
    name: string;
  };
  exp: number;
}

interface DisplayUser {
  id: string;
  email: string;
  name: string;
}

interface Jwt {
  token: string;
}

interface LoginUser {
  email: string;
  password: string;
}

interface NewUser {
  name: string;
  email: string;
  password: string;
}

const register = async (newUser: NewUser): Promise<DisplayUser | null> => {
  const response = await axios.post(`${process.env.REACT_APP_BASE_API}/auth/register`, newUser);
  return response.data;
};

const login = async (
  user: LoginUser
): Promise<{ jwt: Jwt; user: DisplayUser | null }> => {
  const response = await axios.post(`${process.env.REACT_APP_BASE_API}/auth/login`, user);

  if (response.data) {
    localStorage.setItem('jwt', JSON.stringify(response.data));

    const decodedJwt = jwtDecode<DecodedJwt>(response.data.token);

    localStorage.setItem('user', JSON.stringify(decodedJwt.user));

    return { jwt: response.data, user: decodedJwt.user };
  }

  return { jwt: response.data, user: null };
};

const logout = (): void => {
  localStorage.removeItem('user');
  localStorage.removeItem('jwt');
  window.location.href = '/'; 
};

const verifyJwt = async (jwt: string): Promise<boolean> => {
  const response = await axios.post(`${process.env.REACT_APP_BASE_API}/auth/verify-jwt`, { jwt });

  if (response.data) {
    const jwtExpirationMs = response.data.exp * 1000;
    return jwtExpirationMs > Date.now();
  }

  return false;
};

const authService = {
  register,
  login,
  logout,
  verifyJwt,
};

export default authService;
