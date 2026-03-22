import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Géneros
export const getGeneros = () => api.get('/genres');
export const getGeneroById = (id) => api.get(`/genres/${id}`);
export const getGenerosActivos = () => api.get('/genres/active');
export const createGenero = (data) => api.post('/genres', data);
export const updateGenero = (id, data) => api.put(`/genres/${id}`, data);
export const deleteGenero = (id) => api.delete(`/genres/${id}`);

// Directores
export const getDirectores = () => api.get('/directors');
export const getDirectorById = (id) => api.get(`/directors/${id}`);
export const getDirectoresActivos = () => api.get('/directors/active');
export const createDirector = (data) => api.post('/directors', data);
export const updateDirector = (id, data) => api.put(`/directors/${id}`, data);
export const deleteDirector = (id) => api.delete(`/directors/${id}`);

// Productoras
export const getProductoras = () => api.get('/producers');
export const getProductoraById = (id) => api.get(`/producers/${id}`);
export const getProductorasActivas = () => api.get('/producers/active');
export const createProductora = (data) => api.post('/producers', data);
export const updateProductora = (id, data) => api.put(`/producers/${id}`, data);
export const deleteProductora = (id) => api.delete(`/producers/${id}`);

// Tipos
export const getTipos = () => api.get('/types');
export const getTipoById = (id) => api.get(`/types/${id}`);
export const createTipo = (data) => api.post('/types', data);
export const updateTipo = (id, data) => api.put(`/types/${id}`, data);
export const deleteTipo = (id) => api.delete(`/types/${id}`);

// Media
export const getMedia = () => api.get('/media');
export const getMediaById = (id) => api.get(`/media/${id}`);
export const createMedia = (data) => api.post('/media', data);
export const updateMedia = (id, data) => api.put(`/media/${id}`, data);
export const deleteMedia = (id) => api.delete(`/media/${id}`);

export default api;
