import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Vite proxy -> http://localhost:8080
  timeout: 55000,
});

// Interceptor para transformar errores del backend a un formato usable
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response && err.response.data) {
      // nuestro backend devuelve: { error/field/message/status/timestamp }
      const data = err.response.data;
      const simplified = {
        status: err.response.status,
        message: data.message || data.error || 'Error en el servidor',
        field: data.field || null,
        raw: data
      };
      return Promise.reject(simplified);
    }
    return Promise.reject({ status: 0, message: err.message || 'Network Error' });
  }
);

export default api;
