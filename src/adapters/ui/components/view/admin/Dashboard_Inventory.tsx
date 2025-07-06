import React, { useState } from 'react';
import './Dashboard_Inventory.css';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
  status: 'online' | 'offline';
  image: string;
}

const Dashboard_Inventory: React.FC = () => {
  // Estado para los productos
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'iPhone 15 Pro Max',
      category: 'Smartphones',
      price: 1299.00,
      stock: 25,
      sku: 'IP15PM',
      status: 'online',
      image: '📱'
    },
    {
      id: '2',
      name: 'Samsung Galaxy S24',
      category: 'Smartphones',
      price: 899.00,
      stock: 8,
      sku: 'SGS24',
      status: 'online',
      image: '📱'
    },
    {
      id: '3',
      name: 'AirPods Pro 2',
      category: 'Audífonos',
      price: 249.00,
      stock: 18,
      sku: 'APP2',
      status: 'online',
      image: '🎧'
    },
    {
      id: '4',
      name: 'Cargador USB-C 20W',
      category: 'Cargadores',
      price: 29.00,
      stock: 0,
      sku: 'CU20W',
      status: 'offline',
      image: '🔌'
    },
    {
      id: '5',
      name: 'Funda iPhone 15',
      category: 'Fundas',
      price: 39.00,
      stock: 3,
      sku: 'FI15',
      status: 'online',
      image: '🛡️'
    }
  ]);

  // Estado para los filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas las categorías');
  const [stockStatusFilter, setStockStatusFilter] = useState('Todos los estados');

  // Estado para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [newStock, setNewStock] = useState(0);
  const [changeReason, setChangeReason] = useState('Reposición de inventario');
  const [comments, setComments] = useState('');

  // Estadísticas calculadas
  const activeProducts = products.length;
  const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= 5).length;
  const outOfStockProducts = products.filter(p => p.stock === 0).length;
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);

  // Filtrar productos
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'Todas las categorías' ||
      product.category === categoryFilter;

    let matchesStockStatus = true;
    if (stockStatusFilter === 'Stock alto') {
      matchesStockStatus = product.stock > 10;
    } else if (stockStatusFilter === 'Stock medio') {
      matchesStockStatus = product.stock > 5 && product.stock <= 10;
    } else if (stockStatusFilter === 'Stock bajo') {
      matchesStockStatus = product.stock > 0 && product.stock <= 5;
    } else if (stockStatusFilter === 'Agotado') {
      matchesStockStatus = product.stock === 0;
    }

    return matchesSearch && matchesCategory && matchesStockStatus;
  });

  // Abrir modal para actualizar stock
  const handleOpenModal = (product: Product) => {
    setCurrentProduct(product);
    setNewStock(product.stock);
    setIsModalOpen(true);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
    setNewStock(0);
    setChangeReason('Reposición de inventario');
    setComments('');
  };

  // Actualizar stock
  const handleUpdateStock = () => {
    if (!currentProduct || newStock < 0) {
      alert('Por favor ingresa una cantidad válida');
      return;
    }

    // Actualizar el producto en el estado
    setProducts(products.map(product =>
      product.id === currentProduct.id ? { ...product, stock: Number(newStock) } : product
    ));

    // Aquí normalmente harías una llamada a la API para actualizar en la base de datos
    console.log(`Stock actualizado para ${currentProduct.name}: ${newStock} unidades`);
    console.log('Motivo:', changeReason);
    console.log('Comentarios:', comments);

    // Cerrar el modal
    handleCloseModal();
  };

  // Manejar cambio en el input de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Manejar cambio en el filtro de categoría
  const handleCategoryFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
  };

  // Manejar cambio en el filtro de estado de stock
  const handleStockStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStockStatusFilter(e.target.value);
  };

  // Obtener la clase CSS para el badge de stock
  const getStockBadgeClass = (stock: number) => {
    if (stock === 0) return 'dashboard-inventory-stock-out';
    if (stock <= 5) return 'dashboard-inventory-stock-low';
    if (stock <= 10) return 'dashboard-inventory-stock-medium';
    return 'dashboard-inventory-stock-high';
  };

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