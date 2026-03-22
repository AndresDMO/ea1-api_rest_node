import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getTipos, createTipo, updateTipo, deleteTipo } from '../../services/api';
import './Types.css';

const Types = () => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '' });

  useEffect(() => {
    loadTypes();
  }, []);

  const loadTypes = async () => {
    try {
      setLoading(true);
      const response = await getTipos();
      setTypes(response.data);
    } catch (error) {
      Swal.fire('Error', 'No se pudieron cargar los tipos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      Swal.fire('Validación', 'El nombre del tipo es requerido', 'warning');
      return;
    }

    try {
      if (editingId) {
        await updateTipo(editingId, formData);
        Swal.fire('Éxito', 'Tipo actualizado correctamente', 'success');
      } else {
        await createTipo(formData);
        Swal.fire('Éxito', 'Tipo creado correctamente', 'success');
      }
      resetForm();
      loadTypes();
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Error al guardar el tipo', 'error');
    }
  };

  const handleEdit = (type) => {
    setEditingId(type._id);
    setFormData({ name: type.name });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Eliminar?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteTipo(id);
          Swal.fire('Eliminado', 'Tipo eliminado correctamente', 'success');
          loadTypes();
        } catch (error) {
          Swal.fire('Error', error.response?.data?.message || 'Error al eliminar', 'error');
        }
      }
    });
  };

  const resetForm = () => {
    setFormData({ name: '' });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="container-fluid py-4">
      <div className="row mb-4">
        <div className="col">
          <h1><i className="fas fa-folder"></i> Gestión de Tipos</h1>
        </div>
        <div className="col text-end">
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '✖️ Cerrar' : '➕ Nuevo Tipo'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{editingId ? 'Editar' : 'Nuevo'} Tipo</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ej: Película, Serie, Documental..."
                />
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success">
                  💾 Guardar
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>Nombre</th>
                <th>Creado</th>
                <th>Actualizado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {types.map((type) => (
                <tr key={type._id}>
                  <td>{type.name}</td>
                  <td>{new Date(type.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(type.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(type)}
                    >
                      <i className="fas fa-pen"></i> Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(type._id)}
                    >
                      <i className="fas fa-trash"></i> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {types.length === 0 && !loading && (
        <div className="alert alert-info">No hay tipos registrados</div>
      )}
    </div>
  );
};

export default Types;
