import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getTodosPrestamos, aprobarPrestamo, rechazarPrestamo } from '../api/prestamoApi';
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Paper, Box } from '@mui/material';

export default function AdminDashboard() {
  const { user, password, logout } = useContext(AuthContext);
  const [prestamos, setPrestamos] = useState([]);

  const loadPrestamos = () => {
    if (user && password) {
      getTodosPrestamos(user.email, password)
        .then(setPrestamos)
        .catch(err => console.error('Error al cargar préstamos:', err));
    }
  };

  useEffect(() => {
    loadPrestamos();
  }, [user, password]);

  const handleAprobar = (id) => {
    if (user && password) {
      aprobarPrestamo(id, user.email, password)
        .then(loadPrestamos)
        .catch(err => console.error('Error al aprobar préstamo:', err));
    }
  };

  const handleRechazar = (id) => {
    if (user && password) {
      rechazarPrestamo(id, user.email, password)
        .then(loadPrestamos)
        .catch(err => console.error('Error al rechazar préstamo:', err));
    }
  };

  // Filtramos préstamos según estado
  const pendientes = prestamos.filter(p => p.estado === 'PENDIENTE');
  const procesados = prestamos.filter(p => p.estado !== 'PENDIENTE');

  const renderTable = (data, showActions = false) => (
    <Paper elevation={2} sx={{ borderRadius: 2, overflowX: 'auto', mb: 4 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#eceff1' }}>
            <TableCell>Usuario</TableCell>
            <TableCell>Monto</TableCell>
            <TableCell>Plazo</TableCell>
            <TableCell>Estado</TableCell>
            {showActions && <TableCell>Acciones</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((p, index) => (
            <TableRow
              key={p.id}
              sx={{
                backgroundColor: index % 2 === 0 ? '#ffffff' : '#f1f5f9',
                '&:hover': { backgroundColor: '#e3f2fd' }
              }}
            >
              <TableCell>{p.email}</TableCell>
              <TableCell>{p.monto}</TableCell>
              <TableCell>{p.plazo}</TableCell>
              <TableCell>{p.estado}</TableCell>
              {showActions && (
                <TableCell>
                  <Button
                    onClick={() => handleAprobar(p.id)}
                    sx={{
                      mr: 1,
                      backgroundColor: '#1976d2',
                      color: '#fff',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease',
                      '&:hover': { backgroundColor: '#115293', transform: 'scale(1.05)' }
                    }}
                  >
                    Aprobar
                  </Button>
                  <Button
                    onClick={() => handleRechazar(p.id)}
                    sx={{
                      backgroundColor: '#d32f2f',
                      color: '#fff',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease',
                      '&:hover': { backgroundColor: '#9a0007', transform: 'scale(1.05)' }
                    }}
                  >
                    Rechazar
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f4f6f8', py: 6 }}>
      <Container maxWidth="lg">
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5">Hola Admin, {user?.email}</Typography>
            <Button
              onClick={logout}
              sx={{
                backgroundColor: '#37474f',
                color: '#fff',
                fontWeight: 'bold',
                '&:hover': { backgroundColor: '#263238' }
              }}
            >
              Logout
            </Button>
          </Box>

          <Typography variant="h6" gutterBottom>Préstamos Pendientes</Typography>
          {renderTable(pendientes, true)}

          <Typography variant="h6" gutterBottom>Préstamos Procesados</Typography>
          {renderTable(procesados)}
        </Paper>
      </Container>
    </Box>
  );
}
