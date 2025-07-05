import React from 'react';
import './Dashboard_Client.css';
import { useDashboardClient } from '../../../hook/useDashboardClient';

const Dashboard_Client: React.FC = () => {
  const {
    showModal,
    setShowModal,
    previewImg,
    handleImageChange,
    nombre,
    setNombre,
    email,
    setEmail,
    celular,
    setCelular,
    dni,
    setDni,
    contrasena,
    setContrasena,
    handleLimpiar,
    productos,
  } = useDashboardClient();

  return (
    <div className="dashboard-bg">
      <div className="dashboard-btns-row">
        <button
          className="dashboard-btn dashboard-btn-add"
          onClick={() => setShowModal(true)}
        >
          Añadir
        </button>
        <button className="dashboard-btn dashboard-btn-export">Exportar</button>
      </div>
      <div className="dashboard-search-section">
        <input
          type="text"
          placeholder="buscador"
          className="dashboard-search dashboard-search-gray"
        />
        <div className="dashboard-list">
          {productos.map((producto) => (
            <div className="dashboard-card dashboard-card-yellow" key={producto.id}>
              <img src={producto.imagen} alt="icono" className="dashboard-card-img" />
              <span className="dashboard-card-title">{producto.nombre}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay-admin">
          <div className="modal-content-admin">
            <button className="modal-close-admin" onClick={() => setShowModal(false)}>
              &times;
            </button>
            <div className="modal-img-upload-admin">
              <div className="modal-img-box-admin">
                {previewImg ? (
                  <img
                    src={previewImg}
                    alt="preview"
                    className='img-client'
                  />
                ) : (
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <circle cx="8.5" cy="12.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                )}
              </div>
              <label className="modal-upload-btn-admin" >
                Subir imagen
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div className="modal-form-admin">
              <label>
                Nombre:
                <input
                  type="text"
                  className="modal-input-admin"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />
              </label>
              <label>
                Email:
                <input
                  type="text"
                  className="modal-input-admin"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </label>
              <label>
                Celular:
                <input
                  type="text"
                  className="modal-input-admin"
                  value={celular}
                  onChange={e => setCelular(e.target.value)}
                />
              </label>
              <label>
                Dni:
                <input
                  type="text"
                  className="modal-input-admin"
                  value={dni}
                  onChange={e => setDni(e.target.value)}
                />
              </label>
              <label>
                Contraseña:
                <textarea
                  className="modal-textarea-admin"
                  value={contrasena}
                  onChange={e => setContrasena(e.target.value)}
                />
              </label>
              <div className='modal-btn-group-add'>
                <button className="modal-add-btn-admin">Agregar</button>
                <button
                  type="button"
                  className="modal-add-btn-admin modal-clear-btn-admin"
                  onClick={handleLimpiar}
                >
                  Limpiar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard_Client;