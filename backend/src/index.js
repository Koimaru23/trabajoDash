import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import registroRoutes from './routes/registroRoutes.js';
import ConexionBaseDatos from './config/ConexionBaseDatos.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Sirve para las rutas
app.use('/api/registros', registroRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

//Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en puerto ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

//Manejo de cierre graceful
process.on('SIGINT', async () => {
  console.log('\nCerrando servidor...');
  const db = ConexionBaseDatos.getInstance();
  await db.closePool();
  process.exit(0);
});
