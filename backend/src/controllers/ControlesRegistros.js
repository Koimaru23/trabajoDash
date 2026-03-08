import RegistroService from '../services/RegistroService.js';

class ControlesRegistros {
  constructor() {
    this.service = new RegistroService();
  }

  async getAll(req, res) {
    try {
      const registros = await this.service.getAllRegistros();
      res.status(200).json({
        success: true,
        data: registros
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const registro = await this.service.getRegistroById(id);
      res.status(200).json({ success: true, data: registro });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async create(req, res) {
    try {
      const { nombre, username, password, categoria, estado } = req.body;
      const nuevoRegistro = await this.service.createRegistro({
        nombre, username, password, categoria, estado
      });
      res.status(201).json({ success: true, data: nuevoRegistro });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nombre, username, password, categoria, estado } = req.body;
      const registroActualizado = await this.service.updateRegistro(id, {
        nombre, username, password, categoria, estado
      });
      res.status(200).json({ success: true, data: registroActualizado });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.service.deleteRegistro(id);
      res.status(200).json({ success: true, message: 'Registro eliminado' });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async getByCategoria(req, res) {
    try {
      const { categoria } = req.params;
      const registros = await this.service.getRegistrosByCategoria(categoria);
      res.status(200).json({ success: true, data: registros });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getDashboardStats(req, res) {
    try {
      const stats = await this.service.getDashboardStats();
      res.status(200).json({ success: true, data: stats });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getChartData(req, res) {
    try {
      const chartData = await this.service.getChartData();
      res.status(200).json({ success: true, data: chartData });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

}

export default ControlesRegistros;
