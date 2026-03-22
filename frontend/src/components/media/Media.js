import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import {
  getMedia,
  createMedia,
  updateMedia,
  deleteMedia,
  getGenerosActivos,
  getDirectoresActivos,
  getProductorasActivas,
  getTipos,
} from '../../services/api';
import './Media.css';

const Media = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [genres, setGenres] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [producers, setProducers] = useState([]);
  const [types, setTypes] = useState([]);
  const [formData, setFormData] = useState({
    serial: '',
    title: '',
    synopsis: '',
    url: '',
    coverImage: '',
    releaseYear: new Date().getFullYear(),
    genre: '',
    director: '',
    producer: '',
    type: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [mediaRes, genresRes, directorsRes, producersRes, typesRes] = await Promise.all([
        getMedia(),
        getGenerosActivos(),
        getDirectoresActivos(),
        getProductorasActivas(),
        getTipos(),
      ]);
      setMedia(mediaRes.data);
      setGenres(genresRes.data);
      setDirectors(directorsRes.data);
      setProducers(producersRes.data);
      setTypes(typesRes.data);
    } catch (error) {
      Swal.fire('Error', 'No se pudieron cargar los datos', 'error');
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

    if (!formData.serial.trim() || !formData.title.trim() || !formData.synopsis.trim() ||
        !formData.url.trim() || !formData.releaseYear || !formData.genre || !formData.director || 
        !formData.producer || !formData.type) {
      Swal.fire('Validación', 'Todos los campos son requeridos', 'warning');
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        genre: formData.genre,
        director: formData.director,
        producer: formData.producer,
        type: formData.type,
      };

      if (editingId) {
        await updateMedia(editingId, dataToSend);
        Swal.fire('Éxito', 'Media actualizada correctamente', 'success');
      } else {
        await createMedia(dataToSend);
        Swal.fire('Éxito', 'Media creada correctamente', 'success');
      }
      resetForm();
      loadData();
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Error al guardar', 'error');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      serial: item.serial,
      title: item.title,
      synopsis: item.synopsis,
      url: item.url,
      coverImage: item.coverImage,
      releaseYear: item.releaseYear,
      genre: item.genre?._id || item.genre,
      director: item.director?._id || item.director,
      producer: item.producer?._id || item.producer,
      type: item.type?._id || item.type,
    });
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
          await deleteMedia(id);
          Swal.fire('Eliminado', 'Media eliminada correctamente', 'success');
          loadData();
        } catch (error) {
          Swal.fire('Error', error.response?.data?.message || 'Error al eliminar', 'error');
        }
      }
    });
  };

  const resetForm = () => {
    setFormData({
      serial: '',
      title: '',
      synopsis: '',
      url: '',
      coverImage: '',
      releaseYear: new Date().getFullYear(),
      genre: '',
      director: '',
      producer: '',
      type: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="container-fluid py-4">
      <div className="row mb-4">
        <div className="col">
          <h1><i className="fas fa-video"></i> Gestión de Media (Películas y Series)</h1>
        </div>
        <div className="col text-end">
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '✖️ Cerrar' : '➕ Nuevo Media'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{editingId ? 'Editar' : 'Nuevo'} Media</h5>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Serial (único)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="serial"
                    value={formData.serial}
                    onChange={handleInputChange}
                    placeholder="Ej: BREAKING-GOOD-001"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Título</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Título del contenido"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Sinopsis</label>
                <textarea
                  className="form-control"
                  name="synopsis"
                  value={formData.synopsis}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Descripción del contenido"
                ></textarea>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">URL (única)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    placeholder="https://..."
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Imagen de Portada</label>
                  <input
                    type="text"
                    className="form-control"
                    name="coverImage"
                    value={formData.coverImage}
                    onChange={handleInputChange}
                    placeholder="URL de la imagen"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Año de Lanzamiento *</label>
                  <input
                    type="number"
                    className="form-control"
                    name="releaseYear"
                    value={formData.releaseYear}
                    onChange={handleInputChange}
                    min="1888"
                    max={new Date().getFullYear() + 5}
                    placeholder="Año de lanzamiento"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Género *</label>
                  <select
                    className="form-select"
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccionar género</option>
                    {genres.map((g) => (
                      <option key={g._id} value={g._id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Director *</label>
                  <select
                    className="form-select"
                    name="director"
                    value={formData.director}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccionar director</option>
                    {directors.map((d) => (
                      <option key={d._id} value={d._id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Productora *</label>
                  <select
                    className="form-select"
                    name="producer"
                    value={formData.producer}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccionar productora</option>
                    {producers.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Tipo *</label>
                  <select
                    className="form-select"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccionar tipo</option>
                    {types.map((t) => (
                      <option key={t._id} value={t._id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
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
                <th>Imagen de Portada</th>
                <th>Serial</th>
                <th>Título</th>
                <th>Año</th>
                <th>Género</th>
                <th>Director</th>
                <th>Productora</th>
                <th>Tipo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {media.map((item) => (
                <tr key={item._id}>
                  <td>
                    {item.coverImage ? (
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        style={{
                          width: '60px',
                          height: '80px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                          border: '1px solid #3b82f6'
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '60px',
                          height: '80px',
                          backgroundColor: '#1a1f3a',
                          borderRadius: '4px',
                          border: '1px solid #3b82f6',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '24px'
                        }}
                      >
                        🎬
                      </div>
                    )}
                  </td>
                  <td>{item.serial}</td>
                  <td>{item.title}</td>
                  <td>{item.releaseYear}</td>
                  <td>{item.genre?.name || 'N/A'}</td>
                  <td>{item.director?.name || 'N/A'}</td>
                  <td>{item.producer?.name || 'N/A'}</td>
                  <td>{item.type?.name || 'N/A'}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(item)}
                    >
                      <i className="fas fa-pen"></i> Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(item._id)}
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

      {media.length === 0 && !loading && (
        <div className="alert alert-info">No hay media registrada</div>
      )}
    </div>
  );
};

export default Media;
