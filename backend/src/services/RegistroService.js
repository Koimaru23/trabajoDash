import RegistroDAO from '../dao/RegistroDAO.js';

class RegistroService {
  constructor() {
    this.registroDAO = new RegistroDAO();
  }

 //Obtener los registros
  async getAllRegistros() {
    return await this.registroDAO.getAll();
  }

  async getRegistroById(id) {
    if (!id || isNaN(id)) {
      throw new Error('ID inválido');
    }
    const registro = await this.registroDAO.getById(id);
    if (!registro) {
      throw new Error('Registro no encontrado');
    }
    return registro;
  }

  async createRegistro(data) {
    if (!data.nombre || data.nombre.trim() === '') {
      throw new Error('El nombre es requerido');
    }
    if (!data.username || data.username.trim() === '') {
      throw new Error('El username es requerido');
    }
    if (!data.password || data.password.trim() === '') {
      throw new Error('La contraseña es requerida');
    }
    if (!data.categoria || data.categoria.trim() === '') {
      throw new Error('La categoría es requerida');
    }
    if (!data.estado || data.estado.trim() === '') {
      throw new Error('El estado es requerido');
    }

    const existente = await this.registroDAO.getByUsername(data.username);
    if (existente) {
      throw new Error('El username ya existe');
    }

    return await this.registroDAO.create({
      nombre: data.nombre.trim(),
      username: data.username.trim(),
      password: data.password.trim(),
      categoria: data.categoria.trim(),
      estado: data.estado.trim()
    });
  }

  async updateRegistro(id, data) {
    if (!id || isNaN(id)) {
      throw new Error('ID inválido');
    }

    const existente = await this.registroDAO.getById(id);
    if (!existente) {
      throw new Error('Registro no encontrado');
    }

    if (!data.nombre || data.nombre.trim() === '') {
      throw new Error('El nombre es requerido');
    }
    if (!data.username || data.username.trim() === '') {
      throw new Error('El username es requerido');
    }
    if (!data.password || data.password.trim() === '') {
      throw new Error('La contraseña es requerida');
    }
    if (!data.categoria || data.categoria.trim() === '') {
      throw new Error('La categoría es requerida');
    }
    if (!data.estado || data.estado.trim() === '') {
      throw new Error('El estado es requerido');
    }

    // Verificar que el username sea único (si es diferente)
    if (data.username !== existente.username) {
      const otroRegistro = await this.registroDAO.getByUsername(data.username);
      if (otroRegistro) {
        throw new Error('El username ya existe');
      }
    }

    const resultado = await this.registroDAO.update(id, {
      nombre: data.nombre.trim(),
      username: data.username.trim(),
      password: data.password.trim(),
      categoria: data.categoria.trim(),
      estado: data.estado.trim()
    });

    if (!resultado) {
      throw new Error('No se pudo actualizar el registro');
    }

    return { id, ...data };
  }


  async deleteRegistro(id) {
    if (!id || isNaN(id)) {
      throw new Error('ID invalido');
    }

    // Verificar que el registro existe
    const existente = await this.registroDAO.getById(id);
    if (!existente) {
      throw new Error('Registro no encontrado');
    }

    const resultado = await this.registroDAO.delete(id);
    if (!resultado) {
      throw new Error('No se pudo eliminar el registro');
    }

    return true;
  }

  /**
   * Obtiene registros por categoría
   */
  async getRegistrosByCategoria(categoria) {
    if (!categoria || categoria.trim() === '') {
      throw new Error('La categoría es requerida');
    }
    return await this.registroDAO.getByCategoria(categoria);
  }

  /**
   * Obtiene estadísticas del dashboard
   */
  async getDashboardStats() {
    return await this.registroDAO.getDashboardStats();
  }

  /**
   * Obtiene datos para gráficos
   */
  async getChartData() {
    return await this.registroDAO.getChartData();
  }
}

export default RegistroService;
