import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getTodosPrestamos, aprobarPrestamo, rechazarPrestamo } from '../api/prestamoApi';
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';

export default function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [prestamos, setPrestamos] = useState([]);

  const loadPrestamos = () => getTodosPrestamos().then(setPrestamos);

  useEffect(() => { loadPrestamos(); }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">Hola Admin, {user.email}</Typography>
      <Button onClick={logout} color="secondary" sx={{ mb: 2 }}>Logout</Button>

      <Typography variant="h6">Todos los Préstamos</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Usuario</TableCell>
            <TableCell>Monto</TableCell>
            <TableCell>Plazo</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prestamos.map(p => (
            <TableRow key={p.id}>
              <TableCell>{p.usuario}</TableCell>
              <TableCell>{p.monto}</TableCell>
              <TableCell>{p.plazo}</TableCell>
              <TableCell>{p.estado}</TableCell>
              <TableCell>
                <Button disabled={p.estado!=='PENDIENTE'} onClick={()=>{aprobarPrestamo(p.id).then(loadPrestamos)}}>Aprobar</Button>
                <Button disabled={p.estado!=='PENDIENTE'} color="error" onClick={()=>{rechazarPrestamo(p.id).then(loadPrestamos)}}>Rechazar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
