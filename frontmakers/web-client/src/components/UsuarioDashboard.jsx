import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { solicitarPrestamo, getPrestamosUsuario } from '../api/prestamoApi';
import { TextField, Button, Container, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useForm } from 'react-hook-form';

export default function UsuarioDashboard() {
  // Obtenemos user y password del contexto
  const { user, password, logout } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const [prestamos, setPrestamos] = useState([]);

  // Carga los préstamos del usuario
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

  // Maneja la solicitud de un nuevo préstamo
  const onSubmit = (data) => {
    if (user && password) {
      solicitarPrestamo({ ...data }, user.email, password)
        .then(() => {
          loadPrestamos();
          reset();
        })
        .catch(err => console.error('Error al solicitar préstamo:', err));
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">Hola, {user?.email}</Typography>
      <Button onClick={logout} color="secondary" sx={{ mb: 2 }}>Logout</Button>

      <Typography variant="h6" gutterBottom>Solicitar Préstamo</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Monto"
          type="number"
          {...register('monto', { required: true, min: 100 })}
          margin="normal"
        />
        <TextField
          label="Plazo (meses)"
          type="number"
          {...register('plazo', { required: true, min: 1 })}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ ml: 2 }}>Solicitar</Button>
      </form>

      <Typography variant="h6" sx={{ mt: 4 }}>Mis Préstamos</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Monto</TableCell>
            <TableCell>Plazo</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prestamos.map(p => (
            <TableRow key={p.id}>
              <TableCell>{p.monto}</TableCell>
              <TableCell>{p.plazo}</TableCell>
              <TableCell>{p.estado}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
