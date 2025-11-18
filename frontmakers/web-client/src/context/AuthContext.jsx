import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/authApi';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null); // <- nueva
  const navigate = useNavigate();

  useEffect(() => {
    const u = localStorage.getItem('user');
    const p = localStorage.getItem('password'); // <- nueva
    if (u && p) {
      setUser(JSON.parse(u));
      setPassword(p);
    }
  }, []);

  const login = async (email, pass) => { // renombré para que no haya confusión
    try {
      const data = await loginUser(email, pass);
      localStorage.setItem('user', JSON.stringify({ email: data.email, role: data.role }));
      localStorage.setItem('password', pass); // <- nueva
      setUser({ email: data.email, role: data.role });
      setPassword(pass); // <- nueva
      navigate(data.role === 'ROLE_ADMIN' ? '/admin' : '/usuario');
    } catch (error) {
      alert(error.message || 'Error de login');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('password'); // <- nueva
    setUser(null);
    setPassword(null); // <- nueva
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, password, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
