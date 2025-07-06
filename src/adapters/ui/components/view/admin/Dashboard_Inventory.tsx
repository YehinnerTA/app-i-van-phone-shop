import React from 'react';
import './Dashboard_Inventory.css';
import { useDashboardInventory } from '../../../hook/useDashboardInventory';

const Dashboard_Inventory: React.FC = () => {
  const {
    // products,
    searchTerm,
    categoryFilter,
    stockStatusFilter,
    isModalOpen,
    currentProduct,
    newStock,
    changeReason,
    comments,
    activeProducts,
    lowStockProducts,
    outOfStockProducts,
    totalValue,
    filteredProducts,
    setNewStock,
    setChangeReason,
    setComments,
    handleOpenModal,
    handleCloseModal,
    handleUpdateStock,
    handleSearchChange,
    handleCategoryFilterChange,
    handleStockStatusFilterChange,
    getStockBadgeClass
  } = useDashboardInventory();

  return (
    <div className='dashboard-inventory-container'>
      <div className="dashboard-inventory-main">
        <div className="dashboard-inventory-header">
          <h1>📦 Gestión de Inventario</h1>
          <p className="dashboard-inventory-subtitle">Administra el stock de tu tienda</p>
        </div>

        <div className="dashboard-inventory-stats-grid">
          <div className="dashboard-inventory-stat-card">
            <div className="dashboard-inventory-stat-number">{activeProducts}</div>
            <div className="dashboard-inventory-stat-label">Productos Activos</div>
          </div>
          <div className="dashboard-inventory-stat-card">
            <div className="dashboard-inventory-stat-number">{lowStockProducts}</div>
            <div className="dashboard-inventory-stat-label">Stock Bajo</div>
          </div>
          <div className="dashboard-inventory-stat-card">
            <div className="dashboard-inventory-stat-number">{outOfStockProducts}</div>
            <div className="dashboard-inventory-stat-label">Agotados</div>
          </div>
          <div className="dashboard-inventory-stat-card">
            <div className="dashboard-inventory-stat-number">${totalValue.toLocaleString()}</div>
            <div className="dashboard-inventory-stat-label">Valor Total</div>
          </div>
        </div>

        <div className="dashboard-inventory-filters">
          <input
            type="text"
            className="dashboard-inventory-search"
            placeholder="🔍 Buscar productos..."
            value={searchTerm}
            onChange={handleSearchChange}
          />

          <div className="dashboard-inventory-filter-group">
            <label className="dashboard-inventory-filter-label">Categoría</label>
            <select
              className="dashboard-inventory-filter-select"
              value={categoryFilter}
              onChange={handleCategoryFilterChange}
              aria-label='Filtro de categoria'
            >
              <option>Todas las categorías</option>
              <option>Smartphones</option>
              <option>Accesorios</option>
              <option>Fundas</option>
              <option>Cargadores</option>
              <option>Audífonos</option>
            </select>
          </div>

          <div className="dashboard-inventory-filter-group">
            <label className="dashboard-inventory-filter-label">Estado del Stock</label>
            <select
              className="dashboard-inventory-filter-select"
              value={stockStatusFilter}
              onChange={handleStockStatusFilterChange}
              aria-label='Estado Stock'
            >
              <option>Todos los estados</option>
              <option>Stock alto</option>
              <option>Stock medio</option>
              <option>Stock bajo</option>
              <option>Agotado</option>
            </select>
          </div>
        </div>

        <div className="dashboard-inventory-products">
          {filteredProducts.map(product => (
            <div key={product.id} className="dashboard-inventory-product">
              <div className={`dashboard-inventory-status-indicator dashboard-inventory-status-${product.status}`}></div>
              <div className="dashboard-inventory-product-header">
                <div className="dashboard-inventory-product-image">{product.image}</div>
                <div className="dashboard-inventory-product-info">
                  <div className="dashboard-inventory-product-name">{product.name}</div>
                  <div className="dashboard-inventory-product-category">{product.category}</div>
                  <div className="dashboard-inventory-product-price">${product.price.toFixed(2)}</div>
                </div>
              </div>
              <div className="dashboard-inventory-product-details">
                <div className="dashboard-inventory-stock-info">
                  <span className={`dashboard-inventory-stock-badge ${getStockBadgeClass(product.stock)}`}>
                    Stock: {product.stock}
                  </span>
                  <span className="dashboard-inventory-sku">SKU: {product.sku}</span>
                </div>
                <button
                  className="dashboard-inventory-actions-btn"
                  onClick={() => handleOpenModal(product)}
                >
                  {product.stock === 0 ? 'Reponer' : 'Actualizar'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para actualizar stock */}
      {isModalOpen && currentProduct && (
        <div className={`dashboard-inventory-modal ${isModalOpen ? 'show' : ''}`}>
          <div className="dashboard-inventory-modal-content">
            <div className="dashboard-inventory-modal-header">
              <h3 className="dashboard-inventory-modal-title">Actualizar Stock</h3>
              <button
                className="dashboard-inventory-close-btn"
                onClick={handleCloseModal}
              >
                &times;
              </button>
            </div>
            <form>
              <div className="dashboard-inventory-form-group">
                <label className="dashboard-inventory-form-label">Producto</label>
                <input
                  type="text"
                  className="dashboard-inventory-form-input"
                  value={currentProduct.name}
                  readOnly
                />
              </div>
              <div className="dashboard-inventory-form-group">
                <label className="dashboard-inventory-form-label">Stock Actual</label>
                <input
                  type="number"
                  className="dashboard-inventory-form-input"
                  value={currentProduct.stock}
                  readOnly
                />
              </div>
              <div className="dashboard-inventory-form-group">
                <label className="dashboard-inventory-form-label">Nuevo Stock</label>
                <input
                  type="number"
                  className="dashboard-inventory-form-input"
                  value={newStock}
                  min="0"
                  onChange={(e) => setNewStock(Number(e.target.value))}
                  placeholder="Ingresa la cantidad"
                />
              </div>
              <div className="dashboard-inventory-form-group">
                <label className="dashboard-inventory-form-label">Motivo del Cambio</label>
                <select
                  aria-label='Motivo de cambio'
                  className="dashboard-inventory-form-input"
                  value={changeReason}
                  onChange={(e) => setChangeReason(e.target.value)}
                >
                  <option>Reposición de inventario</option>
                  <option>Corrección de stock</option>
                  <option>Producto devuelto</option>
                  <option>Producto dañado</option>
                  <option>Inventario físico</option>
                </select>
              </div>
              <div className="dashboard-inventory-form-group">
                <label className="dashboard-inventory-form-label">Comentarios (opcional)</label>
                <input
                  type="text"
                  className="dashboard-inventory-form-input"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Notas adicionales..."
                />
              </div>
            </form>
            <div className="dashboard-inventory-modal-actions">
              <button
                className="dashboard-inventory-btn dashboard-inventory-btn-cancel"
                onClick={handleCloseModal}
              >
                Cancelar
              </button>
              <button
                className="dashboard-inventory-btn dashboard-inventory-btn-save"
                onClick={handleUpdateStock}
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard_Inventory;