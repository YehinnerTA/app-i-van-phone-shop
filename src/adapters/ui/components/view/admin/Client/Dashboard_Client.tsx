import React from 'react';
import './Dashboard_Client.css';
import { useDashboardClient } from '../../../../hook/admin/useDashboardClient';

const Dashboard_Client: React.FC = () => {
  const {
    showModal,
    setShowModal,
    showViewModal,
    setShowViewModal,
    showEditModal,
    setShowEditModal,
    selectedClient,
    handleInputChange,
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
    handleView,
    handleEdit,
    handleSaveEdit,
    handleDelete,
    handleAddClient,
    filteredClient,
    searchTerm,
    setSearchTerm,
    setEstado,
  } = useDashboardClient();

  return (
    <div className="dashboard-client">
      <button
        className="btn-add-product"
        onClick={() => setShowModal(true)}
      >
        Añadir
      </button>

      <div className="dashboard-search-section">
        <div className="search-container-home search-container-dashboard">
          <input
            type="text"
            className="search-box-home"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="search-icon-home">🔍</div>
        </div>

        <div className="list-product-container">
          {filteredClient.map((cliente) => (
            <div className="card-list-product" key={cliente.id}>
              <span className="dashboard-card-img">👤</span>
              <div className="dashboard-card-info">
                <span className="dashboard-card-title">{cliente.name}</span>
                <div className="dashboard-card-price">{cliente.role}</div>
              </div>

              <div className="dashboard-card-actions">
                <button
                  className="dashboard-action-btn dashboard-btn-view"
                  onClick={() => {
                    setShowViewModal(false);
                    handleView(cliente.id!);
                  }}
                  title="Ver"
                >
                  👁️
                </button>
                <button
                  className="dashboard-action-btn dashboard-btn-edit"
                  onClick={() => {
                    setShowEditModal(true);
                    handleEdit(cliente.id!);
                  }}
                  title="Editar"
                >
                  ✏️
                </button>
                <button
                  className="dashboard-action-btn dashboard-btn-delete"
                  onClick={() => handleDelete(cliente.id!)}
                  title="Eliminar"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para Ver Cliente */}
      {showViewModal && selectedClient && (
        <div className="client-view-modal-overlay">
          <div className="client-view-modal-content">
            <div className="client-view-modal-header">
              <div className="client-view-modal-title">
                <span className="client-view-user-icon">👤</span>
                <h2>Información del Cliente</h2>
              </div>
              <button onClick={() => setShowViewModal(false)} className="client-view-close-btn">
                ×
              </button>
            </div>

            <div className="client-view-modal-body">
              <div className="client-view-avatar-container">
                <h3 className="client-view-name">{selectedClient.name}</h3>
                <p className="client-view-role">{selectedClient.role}</p>
                <span className={`client-view-status client-view-status-${selectedClient.role.toLowerCase()}`}>
                  {selectedClient.role}
                </span>
              </div>

              <div className="client-view-info-grid">
                <div className="client-view-info-item">
                  <span className="client-view-info-icon">✉️</span>
                  <div className="client-view-info-text">
                    <p className="client-view-info-label">Email</p>
                    <p className="client-view-info-value">{selectedClient.email || 'No especificado'}</p>
                  </div>
                </div>

                <div className="client-view-info-item">
                  <span className="client-view-info-icon">📱</span>
                  <div className="client-view-info-text">
                    <p className="client-view-info-label">Teléfono</p>
                    <p className="client-view-info-value">{selectedClient.phone || 'No especificado'}</p>
                  </div>
                </div>
              </div>

              <div className="client-view-actions">
                <button
                  onClick={() => handleEdit(selectedClient.dni!)}
                  className="client-view-edit-btn"
                >
                  <span className="client-view-edit-icon">✏️</span>
                  Editar Cliente
                </button>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="client-view-close-button"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Editar Cliente */}
      {showEditModal && selectedClient && (
        <div className="client-edit-modal-overlay">
          <div className="client-edit-modal-content">
            <div className="client-edit-modal-header">
              <div className="client-edit-modal-title">
                <span className="client-edit-icon">✏️</span>
                <h2>Editar Cliente</h2>
              </div>
              <button onClick={() => setShowEditModal(false)} className="client-edit-close-btn">
                ×
              </button>
            </div>

            <div className="client-edit-modal-body">
              <div className="client-edit-form-grid">
                <div className="client-edit-form-group">
                  <label className="client-edit-form-label">Nombre completo</label>
                  <input
                    type="text"
                    value={selectedClient.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="client-edit-form-input"
                  />
                </div>

                <div className="client-edit-form-group">
                  <label className="client-edit-form-label">Estado</label>
                  <select
                    id="client-edit-estado-select"
                    value={selectedClient.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className="client-edit-form-input"
                    aria-label="Seleccionar estado del cliente"
                  >
                    <option value="cajero">Cajero</option>
                    <option value="vendedor">Vendedor</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>

                <div className="client-edit-form-group">
                  <label className="client-edit-form-label">Email</label>
                  <input
                    type="email"
                    value={selectedClient.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="client-edit-form-input"
                  />
                </div>

                <div className="client-edit-form-group">
                  <label className="client-edit-form-label">Teléfono</label>
                  <input
                    type="text"
                    value={selectedClient.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="client-edit-form-input"
                  />
                </div>
              </div>

              <div className="client-edit-actions">
                <button
                  onClick={handleSaveEdit}
                  className="client-edit-save-btn"
                >
                  <span className="client-edit-save-icon">💾</span>
                  Guardar Cambios
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="client-edit-cancel-btn"
                >
                  <span className="client-edit-cancel-icon">×</span>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="client-add-modal-overlay">
          <div className="client-add-modal-content">
            <div className="client-add-modal-header">
              <div className="client-add-modal-title">
                <span className="client-add-icon">➕</span>
                <h2>Añadir Nuevo Cliente</h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="client-add-close-btn"
              >
                ×
              </button>
            </div>

            <div className="client-add-modal-body">
              <div className="client-add-form-grid">
                <div className="client-add-form-group">
                  <label className="client-add-form-label">Nombre completo</label>
                  <input
                    type="text"
                    className="client-add-form-input"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej: Juan Pérez"
                  />
                </div>

                <div className="client-add-form-group">
                  <label className="client-add-form-label">Estado/Rol</label>
                  <select
                    aria-label='estado'
                    className="client-add-form-input"
                    value={selectedClient?.role || 'vendedor'}
                    onChange={(e) => setEstado(e.target.value as 'admin' | 'cliente' | 'vendedor' | 'cajero')}
                  >
                    <option value="cajero">Cajero</option>
                    <option value="vendedor">Vendedor</option>
                    <option value="admin">Administrador</option>
                    <option value="cliente">Cliente</option>
                  </select>
                </div>

                <div className="client-add-form-group">
                  <label className="client-add-form-label">Email</label>
                  <input
                    type="email"
                    className="client-add-form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ej: cliente@example.com"
                  />
                </div>

                <div className="client-add-form-group">
                  <label className="client-add-form-label">Teléfono/Celular</label>
                  <input
                    type="text"
                    className="client-add-form-input"
                    value={celular}
                    onChange={(e) => setCelular(e.target.value)}
                    placeholder="Ej: +51 987654321"
                  />
                </div>

                <div className="client-add-form-group">
                  <label className="client-add-form-label">DNI</label>
                  <input
                    type="text"
                    className="client-add-form-input"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    placeholder="Ej: 87654321"
                  />
                </div>

                <div className="client-add-form-group">
                  <label className="client-add-form-label">Contraseña</label>
                  <input
                    type="password"
                    className="client-add-form-input"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="client-add-actions">
                <button
                  className="client-add-submit-btn"
                  onClick={handleAddClient}
                >
                  <span className="client-add-submit-icon">✓</span>
                  Añadir Cliente
                </button>
                <button
                  className="client-add-clear-btn"
                  onClick={handleLimpiar}
                >
                  <span className="client-add-clear-icon">🗑️</span>
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