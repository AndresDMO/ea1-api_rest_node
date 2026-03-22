import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getDirectores, createDirector, updateDirector, deleteDirector } from '../../services/api';
import './Directors.css';

const Directors = () => {
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', status: 'Active' });

  useEffect(() => {
    loadDirectors();
  }, []);

  const loadDirectors = async () => {
    try {
      setLoading(true);
      const response = await getDirectores();
      setDirectors(response.data);
    } catch (error) {
      Swal.fire('Error', 'No se pudieron cargar los directores', 'error');
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
      Swal.fire('Validación', 'El nombre del director es requerido', 'warning');
      return;
    }

    try {
      if (editingId) {
        await updateDirector(editingId, formData);
        Swal.fire('Éxito', 'Director actualizado correctamente', 'success');
      } else {
        await createDirector(formData);
        Swal.fire('Éxito', 'Director creado correctamente', 'success');
      }
      resetForm();
      loadDirectors();
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Error al guardar el director', 'error');
    }
  };

  const handleEdit = (director) => {
    setEditingId(director._id);
    setFormData({ name: director.name, status: director.status });
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
          await deleteDirector(id);
          Swal.fire('Eliminado', 'Director eliminado correctamente', 'success');
          loadDirectors();
        } catch (error) {
          Swal.fire('Error', error.response?.data?.message || 'Error al eliminar', 'error');
        }
      }
    });
  };

  const resetForm = () => {
    setFormData({ name: '', status: 'Active' });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="container-fluid py-4">
      <div className="row mb-4">
        <div className="col">
          <h1><i className="fas fa-user"></i> Gestión de Directores</h1>
        </div>
        <div className="col text-end">
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '✖️ Cerrar' : '➕ Nuevo Director'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{editingId ? 'Editar' : 'Nuevo'} Director</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nombre del director"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Estado</label>
                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Activo</option>
                  <option value="Inactive">Inactivo</option>
                </select>
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
                <th>Estado</th>
                <th>Creado</th>
                <th>Actualizado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {directors.map((director) => (
                <tr key={director._id}>
                  <td>{director.name}</td>
                  <td>
                    <span
                      style={{
                        color: director.status === 'Active' ? '#198754' : '#dc3545',
                        fontWeight: '600'
                      }}
                    >
                      {director.status}
                    </span>
                  </td>
                  <td>{new Date(director.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(director.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(director)}
                    >
                      <i className="fas fa-pen"></i> Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(director._id)}
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

      {directors.length === 0 && !loading && (
        <div className="alert alert-info">No hay directores registrados</div>
      )}
    </div>
  );
};

export default Directors;
