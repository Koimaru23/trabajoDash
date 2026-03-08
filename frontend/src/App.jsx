import React, { useState, useEffect } from 'react';
import { Button } from './components/Button';
import TablaRegistros from './components/TablaRegistros';
import FormRegistro from './components/FormRegistro';
import Dashboard from './components/Dashboard';
import { Dialog, AlertDialog } from './components/Dialog';
import RegistroUsuarios from './services/RegistroUsuarios';
import './App.css';

function App() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFormDialog, setShowFormDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [registroEditando, setRegistroEditando] = useState(null);
  const [registroAEliminar, setRegistroAEliminar] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [currentView, setCurrentView] = useState('table');

  // Cargar registros al montar el componente
  useEffect(() => {
    cargarRegistros();
  }, []);

  const cargarRegistros = async () => {
    setLoading(true);
    try {
      const datos = await RegistroUsuarios.obtenerTodos();
      setRegistros(datos);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNuevoRegistro = () => {
    setRegistroEditando(null);
    setShowFormDialog(true);
  };

  const handleEditarRegistro = (registro) => {
    setRegistroEditando(registro);
    setShowFormDialog(true);
  };

  const handleEliminarRegistro = (id) => {
    setRegistroAEliminar(id);
    setShowDeleteDialog(true);
  };

  const handleSubmitForm = async (formData) => {
    try {
      if (registroEditando) {
        // Actualizar
        await RegistroUsuarios.actualizar(registroEditando.id, formData);
        setSuccessMessage('Registro actualizado exitosamente');
      } else {
        // Crear
        await RegistroUsuarios.crear(formData);
        setSuccessMessage('Registro creado exitosamente');
      }
      setShowFormDialog(false);
      cargarRegistros();
    } catch (error) {
      setErrorMessage(error.message);
      throw error;
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await RegistroUsuarios.eliminar(registroAEliminar);
      setSuccessMessage('Registro eliminado exitosamente');
      setShowDeleteDialog(false);
      cargarRegistros();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleCerrarForm = () => {
    setShowFormDialog(false);
    setRegistroEditando(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Sistema de Gestion de Usuarios
          </h1>
          <p className="text-gray-600">Sistema CRUD</p>

          {/* Navegación */}
          <div className="flex gap-4 mt-4">
            <Button
              onClick={() => setCurrentView('table')}
              variant={currentView === 'table' ? 'default' : 'outline'}
              className="px-6 py-2"
            >
              Tabla de Usuarios
            </Button>
            <Button
              onClick={() => setCurrentView('dashboard')}
              variant={currentView === 'dashboard' ? 'default' : 'outline'}
              className="px-6 py-2"
            >
              Dashboard
            </Button>
          </div>
        </div>

        {/* Mensajes */}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
            <span>{errorMessage}</span>
            <button onClick={() => setErrorMessage('')} className="text-red-700 font-bold">✕</button>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
            <span>{successMessage}</span>
            <button onClick={() => setSuccessMessage('')} className="text-green-700 font-bold">✕</button>
          </div>
        )}

        {/* Contenido Principal */}
        {currentView === 'table' ? (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            {/* Botón de Nuevo Registro */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Registros</h2>
              <Button onClick={handleNuevoRegistro} disabled={loading}>
                Agregar Nuevo Usuario
              </Button>
            </div>

            {/* Tabla de Registros */}
            <TablaRegistros
              registros={registros}
              onEdit={handleEditarRegistro}
              onDelete={handleEliminarRegistro}
              loading={loading}
            />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg mb-6">
            <Dashboard />
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-gray-600 text-sm">
          <p>Entregable</p>
        </div>
      </div>

      {/* Diálogo de Formulario */}
      <Dialog
        isOpen={showFormDialog}
        onClose={handleCerrarForm}
        title={registroEditando ? 'Editar Registro' : 'Registrar Nuevo Usuario'}
      >
        <FormRegistro
          registro={registroEditando}
          onSubmit={handleSubmitForm}
          onCancel={handleCerrarForm}
        />
      </Dialog>

      {/* Diálogo de Eliminación */}
      <AlertDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        title="Eliminar Registro"
        description="¿Estas seguro de que deseas eliminar este registro?"
        onConfirm={handleConfirmDelete}
        isDangerous={true}
      />
    </div>
  );
}

export default App;
