import express from 'express';
import ControlesRegistros from '../controllers/ControlesRegistros.js';

const router = express.Router();
const controller = new ControlesRegistros();

//Para las rutas del dashboard

//Obtener las estadusticas del dashboard 
router.get('/dashboard/stats', (req, res) => controller.getDashboardStats(req, res));

//Obtener datos para graficos
router.get('/dashboard/charts', (req, res) => controller.getChartData(req, res));

//Obtener todos los registros
router.get('/', (req, res) => controller.getAll(req, res));

//Obtener registros por categoria
router.get('/categoria/:categoria', (req, res) => controller.getByCategoria(req, res));

//Obtener un registro por id
router.get('/:id', (req, res) => controller.getById(req, res));

//Crear un nuevo registro
router.post('/', (req, res) => controller.create(req, res));

//Actualizar un registro
router.put('/:id', (req, res) => controller.update(req, res));

//Eliminar un registro
router.delete('/:id', (req, res) => controller.delete(req, res));

export default router;
