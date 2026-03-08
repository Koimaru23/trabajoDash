import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();
//Para Singleton
class DatabaseSingleton {
  static instance = null;
  pool = null;

  constructor() {
    if (DatabaseSingleton.instance) {
      return DatabaseSingleton.instance;
    }
    
    this.pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'paam123', //Mi contraseña 
      database: process.env.DB_NAME || 'entregable_crud', //Nombre de mi base de datos
      port: process.env.DB_PORT || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    DatabaseSingleton.instance = this;
  }
  
  //Para la instancia de Singleton
  static getInstance() {
    if (!DatabaseSingleton.instance) {
      new DatabaseSingleton();
    }
    return DatabaseSingleton.instance;
  }

  async getConnection() {
    return await this.pool.getConnection();
  }


  async closePool() {
    if (this.pool) {
      await this.pool.end();
    }
  }
}

export default DatabaseSingleton;
