import React from 'react';
import useDashboardProduct from '../../../../hook/admin/useDashboardProduct';
import './Dashboard_Product.css';

const Dashboard_Product: React.FC = () => {
  const {
    modalState,
    selectedProduct,
    searchTerm,
    setSearchTerm,
    filterCategory,
    setFilterCategory,
    // products,
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
    accessoriesCount
  } = useDashboardProduct();

  // Función para obtener el icono según la categoría
  const getProductIcon = (category: string) => {
    switch (category) {
      case 'celulares':
        return '📱';
      case 'audifonos':
        return '🎧';
      case 'accesorios':
        return '🛍️';
      case 'casos':
        return '📦';
      default:
        return '🛍️';
    }
  };

  // Función para formatear el nombre de la categoría
  const formatCategoryName = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'celulares': 'Celulares',
      'accesorios': 'Accesorios',
      'casos': 'Casos',
      'audifonos': 'Audífonos'
    };
    return categoryMap[category] || category;
  };

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
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
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
                <div className="dashboard-product-card-placeholder">
                  {getProductIcon(product.category)}
                </div>
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
              <div className="dashboard-product-form-group">
                <label>Categoría</label>
                <select
                  aria-label="Filtrar productos por categoría"
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
              {/* <div className="dashboard-product-form-group">
                <label>Imagen del Producto</label>
                <input
                  type="file"
                  name="img"
                  accept="image/*"
                  onChange={handleInputChange}
                />
              </div> */}
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
            <span
              className="dashboard-product-modal-close"
              onClick={closeDetailsModal}
            >
              &times;
            </span>
            <h2>Detalles</h2>
            <div className="dashboard-product-form-group">
              <label>Nombre</label>
              <input
                type="text"
                value={selectedProduct.name}
                readOnly
              />
            </div>
            <div className="dashboard-product-form-group">
              <label>Categoría</label>
              <input
                type="text"
                value={formatCategoryName(selectedProduct.category)}
                readOnly
              />
            </div>
            <div className="dashboard-product-form-group">
              <label>Precio</label>
              <input
                type="text"
                value={`$${selectedProduct.price.toFixed(2)}`}
                readOnly
              />
            </div>
            <div className="dashboard-product-form-group">
              <label>Stock Actual</label>
              <input
                type="text"
                value={`${selectedProduct.stock} unidades`}
                readOnly
              />
            </div>
            <div className="dashboard-product-form-group">
              <label>Descripción</label>
              <textarea
                readOnly
                value={selectedProduct.description}
              />
            </div>
            <div className="dashboard-product-form-group">
              <label>Fecha de Agregado</label>
              <input
                type="text"
                value={selectedProduct.createdAt?.toLocaleDateString() || 'Fecha no disponible'}
                readOnly
              />
            </div>
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