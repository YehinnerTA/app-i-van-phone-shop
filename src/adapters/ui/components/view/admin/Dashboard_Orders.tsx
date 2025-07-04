import React, { useState } from 'react';
import './Dashboard_Orders.css';
import iconProducto from '../../../../../assets/icons/Producto.svg';

type Pedido = {
  id: number;
  producto: string;
  descripcion: string;
  precio: string;
  estado: 'completado' | 'en espera';
  imagen: string;
};

const pedidosIniciales: Pedido[] = [
  {
    id: 1,
    producto: 'Celular Samsung Galaxy S25 Ultra 5G',
    descripcion: '12GB Bronce',
    precio: '1,000.00',
    estado: 'completado',
    imagen: iconProducto,
  },
  {
    id: 2,
    producto: 'Celular Samsung Galaxy S25 Ultra 5G',
    descripcion: '12GB Bronce',
    precio: '1,000.00',
    estado: 'en espera',
    imagen: iconProducto,
  },
  {
    id: 3,
    producto: 'Celular Samsung Galaxy S25 Ultra 5G',
    descripcion: '12GB Bronce',
    precio: '1,000.00',
    estado: 'completado',
    imagen: iconProducto,
  },
];

const Dashboard_Orders: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>(pedidosIniciales);
  const [showModal, setShowModal] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState<'completado' | 'en espera' | null>(null);
  const [progress, setProgress] = useState(0);

  const completados = pedidos.filter(p => p.estado === 'completado').length;
  const enEspera = pedidos.filter(p => p.estado === 'en espera').length;

  // Animación de carga (2 segundos)
  const handleEstado = (estado: 'completado' | 'en espera') => {
  setLoading(estado);
  setProgress(0);
  const interval = setInterval(() => {
    setProgress(prev => {
      if (prev >= 100) {
        clearInterval(interval);
        setPedidos(pedidos =>
          pedidos.map(p =>
            p.id === pedidoSeleccionado?.id ? { ...p, estado } : p
          )
        );
        // NO reiniciar loading ni progress aquí
        return 100;
      }
      return prev + 1;
    });
  }, 20);
};

  return (
    <div className="orders-bg">
      <div className="orders-summary">
        <div className="orders-summary-title">Pendientes</div>
        <div className="orders-summary-item">Entregados: {completados}</div>
        <div className="orders-summary-item">En espera: {enEspera}</div>
      </div>
      <div className="orders-list">
        {pedidos.map(pedido => (
          <div
            key={pedido.id}
            className="orders-card"
            onClick={() => {
            setPedidoSeleccionado(pedido);
            setShowModal(true);
            setProgress(pedido.estado === 'completado' || pedido.estado === 'en espera' ? 100 : 0);
            setLoading(null);
            }}
          >
            <img src={pedido.imagen} alt="icono" className="orders-card-img" />
            <div className="orders-card-info">
              <div className="orders-card-precio">S/ {pedido.precio}</div>
              <div className="orders-card-producto">{pedido.producto}</div>
              <div className="orders-card-desc">{pedido.descripcion}</div>
              <div className={`orders-card-estado ${pedido.estado === 'completado' ? 'completado' : 'en-espera'}`}>
                {pedido.estado === 'completado' ? 'Completado' : 'En espera'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal especial */}
      {showModal && pedidoSeleccionado && (
        <div className="orders-modal-overlay">
          <div className="orders-modal">
            <button className="orders-modal-close" onClick={() => setShowModal(false)}>
              &times;
            </button>
            <div className="orders-modal-btns">
              <div className="orders-modal-btn-box">
                <span className="orders-modal-btn-text">completado</span>
                <div
  className="orders-modal-btn-progress completado"
  style={{
    width:
      (loading === 'completado')
        ? `${progress}%`
        : pedidoSeleccionado.estado === 'completado'
        ? '100%'
        : '0%',
  }}
/>
                <button
                  className="orders-modal-btn"
                  disabled={!!loading}
                  onClick={() => handleEstado('completado')}
                />
              </div>
              <div className="orders-modal-btn-box">
                <span className="orders-modal-btn-text">En espera</span>
                <div
  className="orders-modal-btn-progress en-espera"
  style={{
    width:
      (loading === 'en espera')
        ? `${progress}%`
        : pedidoSeleccionado.estado === 'en espera'
        ? '100%'
        : '0%',
    right: 0,
    left: 'auto',
  }}
/>
                <button
                  className="orders-modal-btn"
                  disabled={!!loading}
                  onClick={() => handleEstado('en espera')}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard_Orders;