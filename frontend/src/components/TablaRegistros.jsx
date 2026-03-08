import React from 'react';
import { Button, ButtonWarning, ButtonDanger } from './Button';
import { cn } from '../lib/cn';

const getCategoryBadgeColor = (categoria) => {
  const colors = {
    'Administrador': 'bg-red-100 text-red-800',
    'Soporte': 'bg-blue-100 text-blue-800',
    'Desarrollo': 'bg-green-100 text-green-800',
    'Vendedor': 'bg-purple-100 text-purple-800',
    'Técnico': 'bg-yellow-100 text-yellow-800'
  };
  return colors[categoria] || 'bg-gray-100 text-gray-800';
};

const getStatusBadgeColor = (estado) => {
  const colors = {
    'Activo': 'bg-green-100 text-green-800',
    'Pendiente': 'bg-yellow-100 text-yellow-800',
    'Inactivo': 'bg-red-100 text-red-800'
  };
  return colors[estado] || 'bg-gray-100 text-gray-800';
};

export const TablaRegistros = ({ registros, onEdit, onDelete, loading }) => {
  if (loading) {
    return <div className="text-center py-8">Cargando registros...</div>;
  }

  if (registros.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay registros disponibles
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-50 border-b-2 border-blue-200">
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nombre Completo</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Usuario</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Categoria</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Estado</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Creado</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actualizado</th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro) => (
            <tr key={registro.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-700">{registro.id}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{registro.nombre}</td>
              <td className="px-4 py-3 text-sm text-blue-600">{registro.username}</td>
              <td className="px-4 py-3 text-sm">
                <span className={cn('inline-block px-3 py-1 rounded-full text-xs font-semibold', getCategoryBadgeColor(registro.categoria))}>
                  {registro.categoria}
                </span>
              </td>
              <td className="px-4 py-3 text-sm">
                <span className={cn('inline-block px-3 py-1 rounded-full text-xs font-semibold', getStatusBadgeColor(registro.estado))}>
                  {registro.estado}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {new Date(registro.create_at).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {new Date(registro.update_at).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </td>
              <td className="px-4 py-3 text-sm text-center">
                <div className="flex gap-2 justify-center">
                  <ButtonWarning
                    size="sm"
                    onClick={() => onEdit(registro)}
                    className="px-3 py-1 text-xs"
                  >
                    Editar
                  </ButtonWarning>
                  <ButtonDanger
                    size="sm"
                    onClick={() => onDelete(registro.id)}
                    className="px-3 py-1 text-xs"
                  >
                    Borrar
                  </ButtonDanger>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaRegistros;
