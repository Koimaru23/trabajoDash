import axios from 'axios';

const API_BASE_URL = 'http://localhost:3003/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const RegistroService = {

  //Obtiene todos los registros
  
  obtenerTodos: async () => {
    try {
      const response = await api.get('/registros');
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener registros');
    }
  },

  //Registro por ID
  obtenerPorId: async (id) => {
    try {
      const response = await api.get(`/registros/${id}`);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener registro');
    }
  },

  //Crear un nuevo registro
  crear: async (datos) => {
    try {
      const response = await api.post('/registros', datos);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear registro');
    }
  },

  //Alcualizar el registro
  actualizar: async (id, datos) => {
    try {
      const response = await api.put(`/registros/${id}`, datos);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar registro');
    }
  },

  //Eliminar el registro
  eliminar: async (id) => {
    try {
      const response = await api.delete(`/registros/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al eliminar registro');
    }
  },

  //Ontner los registros por categoria
  obtenerPorCategoria: async (categoria) => {
    try {
      const response = await api.get(`/registros/categoria/${categoria}`);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener registros');
    }
  },

 //Para la estadistica
  obtenerDashboardStats: async () => {
    try {
      const response = await api.get('/registros/dashboard/stats');
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener estadísticas');
    }
  },

//esto es para el grafico
  obtenerChartData: async () => {
    try {
      const response = await api.get('/registros/dashboard/charts');
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener datos de gráficos');
    }
  }
};

export default RegistroService;
