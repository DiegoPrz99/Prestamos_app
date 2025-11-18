import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { solicitarPrestamo, getPrestamosUsuario } from '../api/prestamoApi';
import { TextField, Button, Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Box, Paper, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

export default function UsuarioDashboard() {
  const { user, password, logout } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const [prestamos, setPrestamos] = useState([]);

  const loadPrestamos = () => {
    if (user && password) {
      getPrestamosUsuario(user.email, password)
        .then(setPrestamos)
        .catch(err => console.error('Error al cargar préstamos:', err));
    }
  };

  useEffect(() => {
    loadPrestamos();
  }, [user, password]);

  const onSubmit = (data) => {
    if (user && password) {
      const body = { ...data, email: user.email };
      solicitarPrestamo(body, user.email, password)
        .then(() => {
          loadPrestamos();
          reset();
        })
        .catch(err => console.error('Error al solicitar préstamo:', err));
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#f4f6f8',
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
          <Grid container justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5">Hola, {user?.email}</Typography>
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
          </Grid>

          <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
            <Typography variant="h6" gutterBottom>Solicitar Préstamo</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={5}>
                  <TextField
                    label="Monto"
                    type="number"
                    fullWidth
                    {...register('monto', { required: true, min: 100 })}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    label="Plazo (meses)"
                    type="number"
                    fullWidth
                    {...register('plazo', { required: true, min: 1 })}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      height: '100%',
                      backgroundColor: '#1976d2',
                      fontWeight: 'bold',
                      '&:hover': { backgroundColor: '#115293' }
                    }}
                  >
                    Solicitar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>

          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>Mis Préstamos</Typography>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#eceff1' }}>
                  <TableCell>Monto</TableCell>
                  <TableCell>Plazo</TableCell>
                  <TableCell>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prestamos.map((p, index) => (
                  <TableRow
                    key={p.id}
                    sx={{
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#f1f5f9',
                      '&:hover': { backgroundColor: '#e3f2fd' }
                    }}
                  >
                    <TableCell>{p.monto}</TableCell>
                    <TableCell>{p.plazo}</TableCell>
                    <TableCell>{p.estado}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Paper>
      </Container>
    </Box>
  );
}
