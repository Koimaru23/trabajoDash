import React, { useState } from 'react';
import { Button, ButtonSecondary } from './Button';
import { Input, Label, Select } from './Form';

export const FormRegistro = ({ registro, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(
    registro || {
      nombre: '',
      username: '',
      password: '',
      categoria: 'Administrador',
      estado: 'Activo'
    }
  );
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.username.trim()) newErrors.username = 'El username es requerido';
    if (!formData.password.trim()) newErrors.password = 'La contraseña es requerida';
    if (!formData.categoria.trim()) newErrors.categoria = 'La categoría es requerida';
    if (!formData.estado.trim()) newErrors.estado = 'El estado es requerido';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <Label htmlFor="nombre">Nombre</Label>
        <Input
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ej: Juan Pérez"
          disabled={loading}
        />
        {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
      </div>


      <div>
        <Label htmlFor="username">Usuario</Label>
        <Input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Ej: juanperez"
          disabled={loading}
        />
        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
      </div>

      <div>
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="******"
          disabled={loading}
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>

      <div>
        <Label htmlFor="categoria">Categoria</Label>
        <Select
          id="categoria"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          disabled={loading}
        >
          <option value="Administrador">Administrador</option>
          <option value="Soporte">Soporte</option>
          <option value="Desarrollo">Desarrollo</option>
          <option value="Vendedor">Vendedor</option>
          <option value="Técnico">Tecnico</option>
        </Select>
        {errors.categoria && <p className="text-red-500 text-sm mt-1">{errors.categoria}</p>}
      </div>

      <div>
        <Label htmlFor="estado">Estado</Label>
        <Select
          id="estado"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          disabled={loading}
        >
          <option value="Activo">Activo</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Inactivo">Inactivo</option>
        </Select>
        {errors.estado && <p className="text-red-500 text-sm mt-1">{errors.estado}</p>}
      </div>

      {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}

      <div className="flex gap-2 justify-end pt-4">
        <ButtonSecondary onClick={onCancel} disabled={loading}>
          Cancelar
        </ButtonSecondary>
        <Button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </form>
  );
};

export default FormRegistro;
