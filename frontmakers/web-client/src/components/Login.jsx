import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import { TextField, Button, Container, Typography } from '@mui/material';

export default function Login() {
  const { login } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  const onSubmit = data => login(data.email, data.password);

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField fullWidth label="Email" margin="normal" {...register('email', { required: true })}/>
        <TextField fullWidth label="Password" type="password" margin="normal" {...register('password', { required: true })}/>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Login</Button>
      </form>
    </Container>
  );
}
