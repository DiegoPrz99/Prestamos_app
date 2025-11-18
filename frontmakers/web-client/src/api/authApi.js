import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'; // Cambia según tu backend

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
    // response.data debería traer { token, role, email }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error de conexión' };
  }
};
