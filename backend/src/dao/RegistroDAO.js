import ConexionBaseDatos from '../config/ConexionBaseDatos.js';

class RegistroDAO {
  constructor() {
    this.db = ConexionBaseDatos.getInstance();
  }

  //Uso del patron Dao
  //Para obtener los registros
  async getAll() {
    try {
      const connection = await this.db.getConnection();
      const [rows] = await connection.query('SELECT * FROM registros');
      connection.release();
      return rows;
    } catch (error) {
      throw new Error(`Error al obtener registros: ${error.message}`);
    }
  }

  //Esto era para obtener por ID
  async getById(id) {
    try {
      const connection = await this.db.getConnection();
      const [rows] = await connection.query(
        'SELECT * FROM registros WHERE id = ?',
        [id]
      );
      connection.release();
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw new Error(`Error al obtener registro: ${error.message}`);
    }
  }

  //Esto por username
  async getByUsername(username) {
    try {
      const connection = await this.db.getConnection();
      const [rows] = await connection.query(
        'SELECT * FROM registros WHERE username = ?',
        [username]
      );
      connection.release();
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw new Error(`Error al buscar por username: ${error.message}`);
    }
  }

  //Para insetar un nuevo registro
  async create(data) {
    try {
      const { nombre, username, password, categoria, estado } = data;
      const connection = await this.db.getConnection();
      const [result] = await connection.query(
        'INSERT INTO registros (nombre, username, password, categoria, estado) VALUES (?, ?, ?, ?, ?)',
        [nombre, username, password, categoria, estado]
      );
      connection.release();
      return { id: result.insertId, ...data };
    } catch (error) {
      throw new Error(`Error al crear registro: ${error.message}`);
    }
  }

  //Editar el registro
  async update(id, data) {
    try {
      const { nombre, username, password, categoria, estado } = data;
      const connection = await this.db.getConnection();
      const [result] = await connection.query(
        'UPDATE registros SET nombre = ?, username = ?, password = ?, categoria = ?, estado = ? WHERE id = ?',
        [nombre, username, password, categoria, estado, id]
      );
      connection.release();
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error al actualizar registro: ${error.message}`);
    }
  }

  //Ete para eliminar
  async delete(id) {
    try {
      const connection = await this.db.getConnection();
      const [result] = await connection.query(
        'DELETE FROM registros WHERE id = ?',
        [id]
      );
      connection.release();
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error al eliminar registro: ${error.message}`);
    }
  }

  //Para buscar por categoria
  async getByCategoria(categoria) {
    try {
      const connection = await this.db.getConnection();
      const [rows] = await connection.query(
        'SELECT * FROM registros WHERE categoria = ?',
        [categoria]
      );
      connection.release();
      return rows;
    } catch (error) {
      throw new Error(`Error al buscar por categoría: ${error.message}`);
    }
  }

  //Las estadisticas para los graficos
  async getDashboardStats() {
    try {
      const connection = await this.db.getConnection();

      //Total de registros
      const [totalResult] = await connection.query('SELECT COUNT(*) as total FROM registros');
      const totalRegistros = totalResult[0]?.total || 0;

      //Total por estado
      const [estadoResult] = await connection.query(
        'SELECT estado, COUNT(*) as count FROM registros GROUP BY estado'
      );

      //Activos e inactivos
      let registrosActivos = 0;
      let registrosInactivos = 0;
      
      estadoResult.forEach(item => {
        if (item.estado === 'Activo') registrosActivos = item.count;
        if (item.estado === 'Inactivo') registrosInactivos = item.count;
      });

      //para el ultimo registro editado y insertado
      const [ultimoResult] = await connection.query(
        'SELECT * FROM registros ORDER BY update_at DESC LIMIT 1'
      );

      connection.release();

      return {
        totalRegistros,
        registrosActivos,
        registrosInactivos,
        ultimoRegistro: ultimoResult[0] || null
      };
    } catch (error) {
      throw new Error(`Error al obtener estadísticas: ${error.message}`);
    }
  }


  async getChartData() {
    try {
      const connection = await this.db.getConnection();

      //Registros por categoria
      const [categoriaResult] = await connection.query(
        'SELECT categoria, COUNT(*) as count FROM registros GROUP BY categoria ORDER BY count DESC'
      );

      //Registros por estado
      const [estadoResult] = await connection.query(
        'SELECT estado as name, COUNT(*) as value FROM registros GROUP BY estado ORDER BY value DESC'
      );

      connection.release();

      return {
        categoriaData: categoriaResult,
        estadoData: estadoResult
      };
    } catch (error) {
      throw new Error(`Error al obtener datos de gráficos: ${error.message}`);
    }
  }
}

export default RegistroDAO;
