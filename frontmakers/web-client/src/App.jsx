import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './components/Login';
import UsuarioDashboard from './components/UsuarioDashboard';
import AdminDashboard from './components/AdminDashboard';


const ProtectedRoute = ({ children, adminOnly=false }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'ROLE_ADMIN') return <Navigate to="/usuario" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/usuario" element={
          <ProtectedRoute>
            <UsuarioDashboard />
          </ProtectedRoute>
        }/>
        <Route path="/admin" element={
          <ProtectedRoute adminOnly={true}>
            <AdminDashboard />
          </ProtectedRoute>
        }/>
        <Route path="*" element={<Navigate to="/login"/>}/>
      </Routes>
    </AuthProvider>
  );
}


export default App;
