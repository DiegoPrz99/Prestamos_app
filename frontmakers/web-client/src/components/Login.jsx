import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';

export default function Login() {
  const { login } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  const onSubmit = data => login(data.email, data.password);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f6f8',
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 5, borderRadius: 3 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4 }}
          >
            Iniciar Sesión
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              {...register('email', { required: true })}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              {...register('password', { required: true })}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                backgroundColor: '#1976d2',
                fontWeight: 'bold',
                '&:hover': { backgroundColor: '#115293' }
              }}
            >
              Iniciar Sesión
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
