import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/prestamos';

const getAuthHeader = (email, password) => ({
  Authorization: 'Basic ' + btoa(`${email}:${password}`)
});

export const getPrestamosUsuario = async (email, password) => {
  const response = await axios.get(`${BASE_URL}/usuario/${email}`, {
    headers: getAuthHeader(email, password)
  });
  return response.data;
};

export const getTodosPrestamos = async (email, password) => {
  const response = await axios.get(BASE_URL, {
    headers: getAuthHeader(email, password)
  });
  return response.data;
};

export const solicitarPrestamo = async (prestamo, email, password) => {
  const response = await axios.post(BASE_URL, prestamo, {
    headers: getAuthHeader(email, password)
  });
  return response.data;
};

export const aprobarPrestamo = async (id, email, password) => {
  const response = await axios.put(`${BASE_URL}/${id}/aprobar`, {}, {
    headers: getAuthHeader(email, password)
  });
  return response.data;
};

export const rechazarPrestamo = async (id, email, password) => {
  const response = await axios.put(`${BASE_URL}/${id}/rechazar`, {}, {
    headers: getAuthHeader(email, password)
  });
  return response.data;
};
