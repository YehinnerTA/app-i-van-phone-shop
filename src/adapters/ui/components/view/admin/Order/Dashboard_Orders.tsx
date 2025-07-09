import React from 'react';
import './Dashboard_Orders.css';
import { useDashboardOrders } from '../../../../hook/admin/useDashboardOrders';

const Dashboard_Orders: React.FC = () => {
  const {
    showDetailModal,
    pedidoDetalle,
    cerrarModalDetalle,
    handleDetailModalClick,
    handleStatusChange,
    handlePaymentStatusChange,
    pedidosFiltrados,
    showModal,
    newStatus,
    newPaymentStatus,
    pedidosTotales,
    pedidosCompletados,
    pedidosEspera,
    ventasHoy,
    verDetalle,
    cambiarEstado,
    marcarEntregado,
    confirmarPago,
    procesarPedido,
    guardarCambios,
    cerrarModal,
    handleModalClick,
    filtroEstado,
    setFiltroEstado,
    filtroPago,
    setFiltroPago,
    filtroFecha,
    setFiltroFecha
  } = useDashboardOrders();

  return (
    <div className='dashboard-orders-container'>
      <div className="dashboard-orders-header">
        <h1>📋 Gestión de Pedidos</h1>
        <p>Administra todos los pedidos de tu tienda</p>
      </div>

      <div className="dashboard-orders-main">
        {/* Estadísticas */}
        <div className="dashboard-orders-stats">
          <div className="dashboard-orders-stat-card">
            <div className="dashboard-orders-stat-number">{pedidosTotales}</div>
            <div className="dashboard-orders-stat-label">Pedidos Totales</div>
          </div>
          <div className="dashboard-orders-stat-card">
            <div className="dashboard-orders-stat-number">{pedidosCompletados}</div>
            <div className="dashboard-orders-stat-label">Completados</div>
          </div>
          <div className="dashboard-orders-stat-card">
            <div className="dashboard-orders-stat-number">{pedidosEspera}</div>
            <div className="dashboard-orders-stat-label">En Espera</div>
          </div>
          <div className="dashboard-orders-stat-card">
            <div className="dashboard-orders-stat-number">${ventasHoy.toFixed(2)}</div>
            <div className="dashboard-orders-stat-label">Ventas Hoy</div>
          </div>
        </div>

        {/* Filtros */}
        <div className="dashboard-orders-filters">
          <div className="dashboard-orders-filter-row">
            <div className="dashboard-orders-filter-group">
              <label className="dashboard-orders-filter-label">Estado del Pedido</label>
              <select
                aria-label='Filtro Pedido'
                className="dashboard-orders-filter-select"
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
              >
                <option value="">Todos los estados</option>
                <option value="completado">Completado</option>
                <option value="espera">En Espera</option>
                <option value="procesando">Procesando</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>
            <div className="dashboard-orders-filter-group">
              <label className="dashboard-orders-filter-label">Método de Pago</label>
              <select
                aria-label='Filtro Pago'
                className="dashboard-orders-filter-select"
                value={filtroPago}
                onChange={(e) => setFiltroPago(e.target.value)}
              >
                <option value="">Todos los métodos</option>
                <option value="online">Pago Online</option>
                <option value="efectivo">Efectivo</option>
              </select>
            </div>
            <div className="dashboard-orders-filter-group">
              <label className="dashboard-orders-filter-label">Fecha</label>
              <select
                aria-label='filtro fecha'
                className="dashboard-orders-filter-select"
                value={filtroFecha}
                onChange={(e) => setFiltroFecha(e.target.value)}
              >
                <option value="">Todas las fechas</option>
                <option value="hoy">Hoy</option>
                <option value="semana">Esta semana</option>
                <option value="mes">Este mes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lista de Pedidos */}
        <div className="dashboard-orders-list">
          {pedidosFiltrados.map(pedido => (
            <div key={pedido.id} className="dashboard-orders-order-card">
              <div className="dashboard-orders-order-header">
                <div className="dashboard-orders-order-id">#{pedido.id}</div>
                <div className="dashboard-orders-order-date">{new Date(pedido.createdAt).toLocaleDateString()}</div>
              </div>
              <div className="dashboard-orders-order-body">
                <div className="dashboard-orders-customer-info">
                  <div className="dashboard-orders-customer-name">{pedido.userEmail}</div>
                  <div className="dashboard-orders-customer-contact">
                    📞 {pedido.userId} | 📧 {pedido.userEmail}
                  </div>
                </div>

                <div className="dashboard-orders-products-list">
                  {pedido.products.map((producto, index) => (
                    <div key={`${pedido.id}-${producto.productId}-${index}`} className="dashboard-orders-product-item">
                      <div>
                        <div className="dashboard-orders-product-name">{producto.name}</div>
                        <div className="dashboard-orders-product-quantity">Cantidad: {producto.quantity}</div>
                      </div>
                      <div className="dashboard-orders-product-price">S/.{producto.price.toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                <div className="dashboard-orders-order-total">
                  Total: ${pedido.total.toFixed(2)}
                </div>

                <div className="dashboard-orders-status-badges">
                  <span className={`dashboard-orders-badge ${pedido.status === 'completed'
                    ? 'dashboard-orders-badge-completed'
                    : pedido.status === 'pending'
                      ? 'dashboard-orders-badge-pending'
                      : 'dashboard-orders-badge-processing'
                    }`}>
                    {pedido.status === 'completed'
                      ? 'Completado'
                      : pedido.status === 'pending'
                        ? 'En Espera'
                        : 'Procesando'}
                  </span>
                  <span className={`dashboard-orders-badge ${pedido.paymentMethod === 'credit-card'
                    ? 'dashboard-orders-badge-online'
                    : 'dashboard-orders-badge-cash'
                    }`}>
                    {pedido.paymentMethod === 'credit-card'
                      ? 'Tarjeta'
                      : pedido.paymentMethod === 'yape'
                        ? 'Yape'
                        : 'Efectivo'}
                  </span>
                </div>

                <div className="dashboard-orders-actions">
                  <button
                    className="dashboard-orders-btn dashboard-orders-btn-primary"
                    onClick={() => verDetalle(pedido.id)}
                  >
                    Ver Detalle
                  </button>
                  <button
                    className="dashboard-orders-btn dashboard-orders-btn-secondary"
                    onClick={() => cambiarEstado(pedido.id)}
                  >
                    Cambiar Estado
                  </button>
                  {pedido.status === 'completed' ? (
                    <button
                      className="dashboard-orders-btn dashboard-orders-btn-success"
                      onClick={() => marcarEntregado(pedido.id)}
                    >
                      Marcar Entregado
                    </button>
                  ) : pedido.paymentStatus === 'pendiente' ? (
                    <button
                      className="dashboard-orders-btn dashboard-orders-btn-success"
                      onClick={() => confirmarPago(pedido.id)}
                    >
                      Confirmar Pago
                    </button>
                  ) : (
                    <button
                      className="dashboard-orders-btn dashboard-orders-btn-success"
                      onClick={() => procesarPedido(pedido.id)}
                    >
                      Procesar Pedido
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para cambiar estado */}
      {showModal && (
        <div
          className="dashboard-orders-modal"
          onClick={handleModalClick}
        >
          <div className="dashboard-orders-modal-content">
            <div className="dashboard-orders-modal-header">
              <h3 className="dashboard-orders-modal-title">Cambiar Estado del Pedido</h3>
              <span
                className="dashboard-orders-modal-close"
                onClick={cerrarModal}
              >
                &times;
              </span>
            </div>
            <div className="dashboard-orders-modal-body">
              <div className="dashboard-orders-form-group">
                <label className="dashboard-orders-form-label">Estado del Pedido:</label>
                <select
                  aria-label='Estado Pedido'
                  className="dashboard-orders-form-select"
                  value={newStatus}
                  onChange={handleStatusChange}
                >
                  <option value="espera">En Espera</option>
                  <option value="procesando">Procesando</option>
                  <option value="completado">Completado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
              <div className="dashboard-orders-form-group">
                <label className="dashboard-orders-form-label">Estado del Pago:</label>
                <select
                  aria-label='Estado Pago'
                  className="dashboard-orders-form-select"
                  value={newPaymentStatus}
                  onChange={handlePaymentStatusChange}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="pagado">Pagado</option>
                  <option value="reembolsado">Reembolsado</option>
                </select>
              </div>
              <div className="dashboard-orders-modal-actions">
                <button
                  className="dashboard-orders-btn dashboard-orders-btn-primary"
                  onClick={guardarCambios}
                >
                  Guardar Cambios
                </button>
                <button
                  className="dashboard-orders-btn dashboard-orders-btn-secondary"
                  onClick={cerrarModal}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para ver detalle */}
      {showDetailModal && pedidoDetalle && (
        <div
          className="dashboard-orders-modal"
          onClick={handleDetailModalClick}
        >
          <div className="dashboard-orders-modal-content dashboard-orders-modal-detail">
            <div className="dashboard-orders-modal-header">
              <h3 className="dashboard-orders-modal-title">
                Detalle: {pedidoDetalle.id}
              </h3>
              <span
                className="dashboard-orders-modal-close"
                onClick={cerrarModalDetalle}
              >
                &times;
              </span>
            </div>

            <div className="dashboard-orders-modal-body">
              {/* Información del cliente */}
              <div className="dashboard-orders-detail-section">
                <h4 className="dashboard-orders-detail-title">👤 Información del Cliente</h4>
                <div className="dashboard-orders-detail-info">
                  <div className="dashboard-orders-detail-row">
                    <span className="dashboard-orders-detail-label">Correo Electronico:</span>
                    <span className="dashboard-orders-detail-value">{pedidoDetalle.userEmail}</span>
                  </div>
                </div>
              </div>

              {/* Información del pedido */}
              <div className="dashboard-orders-detail-section">
                <h4 className="dashboard-orders-detail-title">📦 Información del Pedido</h4>
                <div className="dashboard-orders-detail-info">
                  <div className="dashboard-orders-detail-row">
                    <span className="dashboard-orders-detail-label">Fecha:</span>
                    <span className="dashboard-orders-detail-value">{pedidoDetalle.createdAt}</span>
                  </div>
                  <div className="dashboard-orders-detail-row">
                    <span className="dashboard-orders-detail-label">Estado:</span>
                    <span className={`dashboard-orders-badge ${pedidoDetalle.status === 'completed' ? 'dashboard-orders-badge-completed' :
                      pedidoDetalle.status === 'pending' ? 'dashboard-orders-badge-pending' :
                        'dashboard-orders-badge-processing'
                      }`}>
                      {pedidoDetalle.status === 'completed' ? 'Completado' :
                        pedidoDetalle.status === 'pending' ? 'En Espera' :
                          'Procesando'}
                    </span>
                  </div>
                  <div className="dashboard-orders-detail-row">
                    <span className="dashboard-orders-detail-label">Método de Pago:</span>
                    <span className={`dashboard-orders-badge ${pedidoDetalle.paymentMethod === 'credit-card' ? 'dashboard-orders-badge-credit-card' : 'dashboard-orders-badge-cash'
                      }`}>
                      {pedidoDetalle.paymentMethod === 'yape' ? 'Pago con Yape' : 'Efectivo'}
                    </span>
                  </div>
                  <div className="dashboard-orders-detail-row">
                    <span className="dashboard-orders-detail-label">Estado del Pago:</span>
                    <span className={`dashboard-orders-badge ${pedidoDetalle.paymentStatus === 'pagado' ? 'dashboard-orders-badge-completed' :
                      pedidoDetalle.status === 'pending' ? 'dashboard-orders-badge-pending' :
                        'dashboard-orders-badge-processing'
                      }`}>
                      {pedidoDetalle.paymentStatus === 'pagado' ? 'Pagado' :
                        pedidoDetalle.paymentStatus === 'pendiente' ? 'Pendiente' :
                          'Reembolsado'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Productos */}
              <div className="dashboard-orders-detail-section">
                <h4 className="dashboard-orders-detail-title">🛍️ Productos</h4>
                <div className="dashboard-orders-detail-products">
                  {pedidoDetalle?.products?.map((producto, index) => (
                    <div key={`${pedidoDetalle.id}-${producto.productId}-${index}`} className="dashboard-orders-detail-product">
                      <div className="dashboard-orders-detail-product-info">
                        <div className="dashboard-orders-detail-product-name">{producto.name}</div>
                        <div className="dashboard-orders-detail-product-quantity">
                          Cantidad: {producto.quantity}
                        </div>
                      </div>
                      <div className="dashboard-orders-detail-product-price">
                        ${producto.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="dashboard-orders-detail-section">
                <div className="dashboard-orders-detail-total">
                  <span className="dashboard-orders-detail-total-label">Total del Pedido:</span>
                  <span className="dashboard-orders-detail-total-value">${pedidoDetalle.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="dashboard-orders-modal-actions">
              <button
                className="dashboard-orders-btn dashboard-orders-btn-primary"
                onClick={cerrarModalDetalle}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard_Orders;