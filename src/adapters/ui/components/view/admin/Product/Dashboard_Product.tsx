import React from 'react';
import useDashboardProduct from '../../../../hook/admin/useDashboardProduct';
import './Dashboard_Product.css';

const Dashboard_Product: React.FC = () => {
  const {
    formatCategoryName,
    getProductIcon,
    modalState,
    selectedProduct,
    searchTerm,
    setSearchTerm,
    newProduct,
    openAddModal,
    openDetailsModal,
    openDeleteModal,
    closeAddModal,
    closeDetailsModal,
    closeDeleteModal,
    handleModalBackdropClick,
    handleInputChange,
    handleAddProduct,
    handleDeleteProduct,
    filteredProducts,
    totalProducts,
    lowStockProducts,
    phonesCount,
    accessoriesCount,
    openEditModal,
    closeEditModal,
    handleEditInputChange,
    handleUpdateProduct,
    editProduct,
    setEditProduct,
    isValidImageUrl,
  } = useDashboardProduct();

  return (
    <div className='dashboard-product'>
      <div className="dashboard-product-header">
        <div className="dashboard-product-header-content">
          <h1 className='dashboard-product-title'>📱 Gestión de Productos</h1>
        </div>
      </div>

      <button className="dashboard-product-add-btn" onClick={openAddModal}>
        ➕ Agregar Producto
      </button>

      <div className="dashboard-product-main">
        <div className="dashboard-product-stats">
          <div className="dashboard-product-stat">
            <div className="dashboard-product-stat-number">{totalProducts}</div>
            <div className="dashboard-product-stat-label">Total Productos</div>
          </div>
          <div className="dashboard-product-stat">
            <div className="dashboard-product-stat-number">{lowStockProducts}</div>
            <div className="dashboard-product-stat-label">Stock Bajo</div>
          </div>
          <div className="dashboard-product-stat">
            <div className="dashboard-product-stat-number">{phonesCount}</div>
            <div className="dashboard-product-stat-label">Celulares</div>
          </div>
          <div className="dashboard-product-stat">
            <div className="dashboard-product-stat-number">{accessoriesCount}</div>
            <div className="dashboard-product-stat-label">Accesorios</div>
          </div>
        </div>

        <div className="dashboard-product-search">
          <input
            type="text"
            className="dashboard-product-search-input"
            placeholder="🔍 Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            aria-label="Filtrar productos por categoría"
            className="dashboard-product-filter"
            value={editProduct?.category}
            onChange={handleEditInputChange}
            required
          >
            <option value="">Todas las categorías</option>
            <option value="celulares">Celulares</option>
            <option value="accesorios">Accesorios</option>
            <option value="casos">Casos</option>
            <option value="audifonos">Audífonos</option>
          </select>
        </div>

        <div className="dashboard-product-grid">
          {filteredProducts.map(product => (
            <div className="dashboard-product-card" key={product.id}>
              <div className="dashboard-product-card-image">
                {product.image && isValidImageUrl(product.image) ? (
                  <img src={product.image} alt={product.name} className="dashboard-product-card-img" />
                ) : (
                  <div className="dashboard-product-card-placeholder">
                    {getProductIcon(product.category)}
                  </div>
                )}
              </div>
              <div className="dashboard-product-card-info">
                <h3>{product.name}</h3>
                <div className="dashboard-product-card-price">${product.price.toFixed(2)}</div>
                <div className="dashboard-product-card-stock">Stock: {product.stock} unidades</div>
                <div className="dashboard-product-card-actions">
                  <button
                    className="dashboard-product-btn dashboard-product-btn-details"
                    onClick={() => openDetailsModal(product)}
                  >
                    Ver Detalles
                  </button>
                  <button
                    className="dashboard-product-btn dashboard-product-btn-edit"
                    onClick={() => openEditModal(product)}
                  >
                    Editar
                  </button>
                  <button
                    className="dashboard-product-btn dashboard-product-btn-delete"
                    onClick={() => openDeleteModal(product)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="dashboard-product-no-results">
            <p>No se encontraron productos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>

      {/* Modal Agregar Producto */}
      {modalState.add && (
        <div className="dashboard-product-modal active" onClick={handleModalBackdropClick}>
          <div className="dashboard-product-modal-content">
            <span className="dashboard-product-modal-close" onClick={closeAddModal}>&times;</span>
            <h2>Agregar Producto</h2>
            <form className="dashboard-product-form" onSubmit={handleAddProduct}>
              {/* Nombre */}
              <div className="dashboard-product-form-group">
                <label>Nombre del Producto</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Ej: iPhone 15 Pro Max"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Categoría */}
              <div className="dashboard-product-form-group">
                <label>Categoría</label>
                <select
                  aria-label='categoy'
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="celulares">Celulares</option>
                  <option value="accesorios">Accesorios</option>
                  <option value="casos">Casos</option>
                  <option value="audifonos">Audífonos</option>
                </select>
              </div>

              {/* Precio */}
              <div className="dashboard-product-form-group">
                <label>Precio</label>
                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  value={newProduct.price || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Stock */}
              <div className="dashboard-product-form-group">
                <label>Stock Inicial</label>
                <input
                  type="number"
                  name="stock"
                  placeholder="0"
                  min="0"
                  value={newProduct.stock || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Imagen */}
              <div className="dashboard-product-form-group">
                <label>URL de Imagen</label>
                <input
                  type="text"
                  name="image"
                  placeholder="https://ejemplo.com/imagen.jpg"
                  value={newProduct.image || ''}
                  onChange={handleInputChange}
                />
              </div>

              {/* SKU */}
              <div className="dashboard-product-form-group">
                <label>SKU</label>
                <input
                  type="text"
                  name="sku"
                  placeholder="Ej: SKU123456"
                  value={newProduct.sku || ''}
                  onChange={handleInputChange}
                />
              </div>

              {/* Estado */}
              <div className="dashboard-product-form-group">
                <label>Estado</label>
                <select
                  aria-label='estado'
                  name="status"
                  value={newProduct.status || ''}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccionar estado</option>
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                  <option value="archived">Archivado</option>
                </select>
              </div>

              {/* Descripción */}
              <div className="dashboard-product-form-group">
                <label>Descripción</label>
                <textarea
                  name="description"
                  placeholder="Describe el producto..."
                  value={newProduct.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Detalles Técnicos */}
              <div className="dashboard-product-form-group">
                <label>Pantalla</label>
                <input
                  type="text"
                  name="screen"
                  placeholder="Ej: 6.7'' OLED"
                  value={newProduct.screen || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="dashboard-product-form-group">
                <label>Procesador</label>
                <input
                  type="text"
                  name="processor"
                  placeholder="Ej: A17 Pro"
                  value={newProduct.processor || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="dashboard-product-form-group">
                <label>Memoria</label>
                <input
                  type="text"
                  name="memory"
                  placeholder="Ej: 8GB RAM / 256GB"
                  value={newProduct.memory || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="dashboard-product-form-group">
                <label>Cámara</label>
                <input
                  type="text"
                  name="camera"
                  placeholder="Ej: Triple 48MP"
                  value={newProduct.camera || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="dashboard-product-form-group">
                <label>Batería</label>
                <input
                  type="text"
                  name="battery"
                  placeholder="Ej: 4352 mAh"
                  value={newProduct.battery || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="dashboard-product-form-group">
                <label>Sistema</label>
                <input
                  type="text"
                  name="system"
                  placeholder="Ej: iOS 17"
                  value={newProduct.system || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="dashboard-product-form-group">
                <label>Conectividad</label>
                <input
                  type="text"
                  name="connectivity"
                  placeholder="Ej: 5G, WiFi 6, Bluetooth 5.3"
                  value={newProduct.connectivity || ''}
                  onChange={handleInputChange}
                />
              </div>

              {/* Botones */}
              <div className="dashboard-product-modal-actions">
                <button
                  type="button"
                  className="dashboard-product-btn-modal dashboard-product-btn-secondary"
                  onClick={closeAddModal}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="dashboard-product-btn-modal dashboard-product-btn-primary"
                >
                  Agregar Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Detalles del Producto */}
      {modalState.details && selectedProduct && (
        <div className="dashboard-product-modal active" onClick={handleModalBackdropClick}>
          <div className="dashboard-product-modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="dashboard-product-modal-close" onClick={closeDetailsModal}>
              &times;
            </span>
            <h2>Detalles del Producto</h2>

            {/* Imagen */}
            {selectedProduct.image && (
              <div className="dashboard-product-form-group">
                <label>Imagen</label>
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="dashboard-product-detail-image"
                />
              </div>
            )}

            {/* Nombre */}
            <div className="dashboard-product-form-group">
              <label>Nombre</label>
              <input type="text" value={selectedProduct.name} readOnly />
            </div>

            {/* Categoría */}
            <div className="dashboard-product-form-group">
              <label>Categoría</label>
              <input
                type="text"
                value={formatCategoryName(selectedProduct.category)}
                readOnly
              />
            </div>

            {/* Precio */}
            <div className="dashboard-product-form-group">
              <label>Precio</label>
              <input
                type="text"
                value={`$${selectedProduct.price.toFixed(2)}`}
                readOnly
              />
            </div>

            {/* Stock */}
            <div className="dashboard-product-form-group">
              <label>Stock Actual</label>
              <input
                type="text"
                value={`${selectedProduct.stock} unidades`}
                readOnly
              />
            </div>

            {/* SKU */}
            {selectedProduct.sku && (
              <div className="dashboard-product-form-group">
                <label>SKU</label>
                <input type="text" value={selectedProduct.sku} readOnly />
              </div>
            )}

            {/* Estado */}
            {selectedProduct.status && (
              <div className="dashboard-product-form-group">
                <label>Estado</label>
                <input type="text" value={selectedProduct.status} readOnly />
              </div>
            )}

            {/* Descripción */}
            <div className="dashboard-product-form-group">
              <label>Descripción</label>
              <textarea readOnly value={selectedProduct.description} />
            </div>

            {/* Fecha de agregado */}
            <div className="dashboard-product-form-group">
              <label>Fecha de Agregado</label>
              <input type="text" value={selectedProduct.dateAdded} readOnly />
            </div>

            {/* Detalles técnicos */}
            {selectedProduct.screen && (
              <div className="dashboard-product-form-group">
                <label>Pantalla</label>
                <input type="text" value={selectedProduct.screen} readOnly />
              </div>
            )}
            {selectedProduct.processor && (
              <div className="dashboard-product-form-group">
                <label>Procesador</label>
                <input type="text" value={selectedProduct.processor} readOnly />
              </div>
            )}
            {selectedProduct.memory && (
              <div className="dashboard-product-form-group">
                <label>Memoria</label>
                <input type="text" value={selectedProduct.memory} readOnly />
              </div>
            )}
            {selectedProduct.camera && (
              <div className="dashboard-product-form-group">
                <label>Cámara</label>
                <input type="text" value={selectedProduct.camera} readOnly />
              </div>
            )}
            {selectedProduct.battery && (
              <div className="dashboard-product-form-group">
                <label>Batería</label>
                <input type="text" value={selectedProduct.battery} readOnly />
              </div>
            )}
            {selectedProduct.system && (
              <div className="dashboard-product-form-group">
                <label>Sistema</label>
                <input type="text" value={selectedProduct.system} readOnly />
              </div>
            )}
            {selectedProduct.connectivity && (
              <div className="dashboard-product-form-group">
                <label>Conectividad</label>
                <input type="text" value={selectedProduct.connectivity} readOnly />
              </div>
            )}

            {/* Botón Cerrar */}
            <div className="dashboard-product-modal-actions">
              <button
                type="button"
                className="dashboard-product-btn-modal dashboard-product-btn-secondary"
                onClick={closeDetailsModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar del Producto */}
      {modalState.edit && editProduct && (
        <div className="dashboard-product-modal active" onClick={handleModalBackdropClick}>
          <div className="dashboard-product-modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="dashboard-product-modal-close" onClick={closeEditModal}>
              &times;
            </span>
            <h2>Editar Producto</h2>
            <form className="dashboard-product-form" onSubmit={handleUpdateProduct}>
              {/* Básicos */}
              <div className="dashboard-product-form-group">
                <label>Nombre del Producto</label>
                <input type="text" name="name" value={editProduct.name} onChange={handleEditInputChange} required />
              </div>

              <div className="dashboard-product-form-group">
                <label htmlFor="edit-category">Categoría</label>
                <select id="edit-category" name="category" value={editProduct.category} onChange={handleEditInputChange} required>
                  <option value="">Seleccionar categoría</option>
                  <option value="celulares">Celulares</option>
                  <option value="accesorios">Accesorios</option>
                  <option value="casos">Casos</option>
                  <option value="audifonos">Audífonos</option>
                </select>
              </div>

              <div className="dashboard-product-form-group">
                <label>Precio</label>
                <input type="number" name="price" step="0.01" min="0" value={editProduct.price || ''} onChange={handleEditInputChange} required />
              </div>

              <div className="dashboard-product-form-group">
                <label>Stock</label>
                <input type="number" name="stock" min="0" value={editProduct.stock || ''} onChange={handleEditInputChange} required />
              </div>

              <div className="dashboard-product-form-group">
                <label>Descripción</label>
                <textarea name="description" value={editProduct.description} onChange={handleEditInputChange} required />
              </div>

              {/* Opcionales */}
              <div className="dashboard-product-form-group">
                <label>SKU</label>
                <input type="text" name="sku" value={editProduct.sku || ''} onChange={handleEditInputChange} />
              </div>

              <div className="dashboard-product-form-group">
                <label>URL de Imagen</label>
                <input type="text" name="image" value={editProduct.image || ''} onChange={handleEditInputChange} />
              </div>

              <div className="dashboard-product-form-group">
                <label>Estado</label>
                <select aria-label='Filtro estado' name="status" value={editProduct.status || ''} onChange={handleEditInputChange}>
                  <option value="">Seleccionar estado</option>
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                  <option value="archived">Archivado</option>
                </select>
              </div>

              {/* Detalles Técnicos */}
              <div className="dashboard-product-form-group">
                <label>Pantalla</label>
                <input type="text" name="screen" value={editProduct.screen || ''} onChange={handleEditInputChange} />
              </div>

              <div className="dashboard-product-form-group">
                <label>Procesador</label>
                <input type="text" name="processor" value={editProduct.processor || ''} onChange={handleEditInputChange} />
              </div>

              <div className="dashboard-product-form-group">
                <label>Memoria</label>
                <input type="text" name="memory" value={editProduct.memory || ''} onChange={handleEditInputChange} />
              </div>

              <div className="dashboard-product-form-group">
                <label>Cámara</label>
                <input type="text" name="camera" value={editProduct.camera || ''} onChange={handleEditInputChange} />
              </div>

              <div className="dashboard-product-form-group">
                <label>Batería</label>
                <input type="text" name="battery" value={editProduct.battery || ''} onChange={handleEditInputChange} />
              </div>

              <div className="dashboard-product-form-group">
                <label>Sistema Operativo</label>
                <input type="text" name="system" value={editProduct.system || ''} onChange={handleEditInputChange} />
              </div>

              <div className="dashboard-product-form-group">
                <label>Conectividad</label>
                <input type="text" name="connectivity" value={editProduct.connectivity || ''} onChange={handleEditInputChange} />
              </div>

              <div className="dashboard-product-form-group">
                <label>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={!!editProduct.featured}
                    onChange={(e) => setEditProduct(prev => prev ? { ...prev, featured: e.target.checked } : prev)} />
                  Destacado
                </label>
              </div>

              <div className="dashboard-product-form-group">
                <label>
                  <input type="checkbox" name="buy" checked={!!editProduct.buy} onChange={(e) => setEditProduct(prev => prev ? { ...prev, buy: e.target.checked } : prev)} />
                  Disponible para compra
                </label>
              </div>

              <div className="dashboard-product-form-group">
                <label>Cantidad</label>
                <input type="number" name="quantity" min="0" value={editProduct.quantity || ''} onChange={handleEditInputChange} />
              </div>

              {/* Acciones */}
              <div className="dashboard-product-modal-actions">
                <button type="button" className="dashboard-product-btn-modal dashboard-product-btn-secondary" onClick={closeEditModal}>
                  Cancelar
                </button>
                <button type="submit" className="dashboard-product-btn-modal dashboard-product-btn-primary">
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Eliminar Producto */}
      {modalState.delete && selectedProduct && (
        <div className="dashboard-product-modal active" onClick={handleModalBackdropClick}>
          <div className="dashboard-product-modal-content">
            <span
              className="dashboard-product-modal-close"
              onClick={closeDeleteModal}
            >
              &times;
            </span>
            <h2>Eliminar Producto</h2>
            <p className="dashboard-product-delete-message">
              ¿Estás seguro de que deseas eliminar este producto?
            </p>
            <div className="dashboard-product-delete-info">
              <strong>{selectedProduct.name}</strong><br />
              <span className="dashboard-product-delete-price">
                ${selectedProduct.price.toFixed(2)}
              </span> - Stock: {selectedProduct.stock} unidades
            </div>
            <p className="dashboard-product-delete-warning">
              ⚠️ Esta acción no se puede deshacer.
            </p>
            <div className="dashboard-product-modal-actions">
              <button
                type="button"
                className="dashboard-product-btn-modal dashboard-product-btn-secondary"
                onClick={closeDeleteModal}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="dashboard-product-btn-modal dashboard-product-btn-danger"
                onClick={handleDeleteProduct}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard_Product;