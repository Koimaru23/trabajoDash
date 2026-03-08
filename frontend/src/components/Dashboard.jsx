import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import RegistroUsuarios from '../services/RegistroUsuarios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRegistros: 0,
    registrosActivos: 0,
    registrosInactivos: 0,
    ultimoRegistro: null
  });
  const [chartData, setChartData] = useState({
    categoriaData: [],
    estadoData: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarDashboardData();
  }, []);

  const cargarDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const statsData = await RegistroUsuarios.obtenerDashboardStats();
      const chartsData = await RegistroUsuarios.obtenerChartData();

      setStats(statsData || {
        totalRegistros: 0,
        registrosActivos: 0,
        registrosInactivos: 0,
        ultimoRegistro: null
      });
      
      setChartData(chartsData || {
        categoriaData: [],
        estadoData: []
      });
    } catch (error) {
      console.error('Error cargando datos del dashboard:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Cargando dashboard</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Graficos y Estadisticas</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p><strong>Error:</strong> {error}</p>
          <button 
            onClick={cargarDashboardData}
            className="text-red-700 font-bold underline mt-2"
          >
            Reintentar
          </button>
        </div>
      )}

      {/*Tarjeta de Estadisticas*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Registros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRegistros}</div>
            <p className="text-xs text-muted-foreground">
              Registros totales en el sistema
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registros Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.registrosActivos}</div>
            <p className="text-xs text-muted-foreground">
              Registros con estado activo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registros Inactivos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.registrosInactivos}</div>
            <p className="text-xs text-muted-foreground">
              Registros con estado inactivo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ultimo Registro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.ultimoRegistro ? stats.ultimoRegistro.nombre : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.ultimoRegistro ?
                `Actualizado: ${new Date(stats.ultimoRegistro.update_at).toLocaleDateString()}` :
                'No hay registros'
              }
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/*Grafico Circular*/}
        <Card>
          <CardHeader>
            <CardTitle>Distribucion General</CardTitle>
            <CardDescription>
              Distribucion de registros por estado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData.estadoData || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {(chartData.estadoData || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Cantidad']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/*Grafico de Barras - Usuarios por Categoria*/}
        <Card>
          <CardHeader>
            <CardTitle>Usuarios por Categoria</CardTitle>
            <CardDescription>
              Cantidad de usuarios en cada categoria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.categoriaData || []} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="categoria" tick={{ fill: '#6b7280', fontSize: 12 }} />
                <YAxis tick={{ fill: '#6b7280' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  cursor={{ fill: 'rgba(239, 68, 68, 0.1)' }}
                  formatter={(value) => [value, 'Registros']}
                />
                <Bar dataKey="count" fill="#EF4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;