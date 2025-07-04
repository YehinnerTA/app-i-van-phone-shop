import React, { useState } from 'react';
import './Dashboard_Inventory.css';
import iconProducto from '../../../../../assets/icons/Producto.svg';

// Define los tipos para oferta y producto
type Oferta = {
  precio: string;
  id: string;
} | null;

type Producto = {
  id: number;
  nombre: string;
  imagen: string;
  cantidad: number;
  oferta: Oferta;
};

const productosIniciales: Producto[] = [
  {
    id: 1,
    nombre: 'iPhone 15 Pro',
    imagen: iconProducto,
    cantidad: 2,
    oferta: null,
  },
  {
    id: 2,
    nombre: 'iPhone 14',
    imagen: iconProducto,
    cantidad: 0,
    oferta: null,
  },
  {
    id: 3,
    nombre: 'Huawei Mate',
    imagen: iconProducto,
    cantidad: 1,
    oferta: null,
  },
];

const Dashboard_Inventory: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>(productosIniciales);
  const [showModal, setShowModal] = useState(false);
  const [oferta, setOferta] = useState('');
  const [precio, setPrecio] = useState('');
  const [idOferta, setIdOferta] = useState('');
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  // Para subir imagen (opcional)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreviewImg(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLimpiarModal = () => {
    setOferta('');
    setPrecio('');
    setIdOferta('');
    setPreviewImg(null);
  };

  // Agregar oferta a la lista
  const handleAgregarOferta = () => {
    if (!oferta || !precio || !idOferta) return;
    setProductos([
      ...productos,
      {
        id: productos.length + 1,
        nombre: oferta,
        imagen: previewImg || iconProducto,
        cantidad: 0,
        oferta: { precio, id: idOferta },
      },
    ]);
    setShowModal(false);
    setOferta('');
    setPrecio('');
    setIdOferta('');
    setPreviewImg(null);
  };

  // Cambiar cantidad
  const handleCantidad = (id: number, delta: number) => {
    setProductos(productos =>
      productos.map(p =>
        p.id === id
          ? { ...p, cantidad: Math.max(0, p.cantidad + delta) }
          : p
      )
    );
  };

  return (
    <div className="inventory-bg">
      <div className="inventory-search-section">
        <input
          type="text"
          placeholder="Encontrar productos"
          className="inventory-search"
        />
      </div>
      <div className="inventory-list">
        {productos.map((producto) => (
          <div className="inventory-card" key={producto.id}>
            <img src={producto.imagen} alt="icono" className="inventory-card-img" />
            <div className="inventory-card-info">
              <div className="inventory-card-title">{producto.nombre}</div>
              <div className="inventory-card-oferta">
                {producto.oferta && (
                  <>
                    <span>Oferta: {producto.oferta.id}</span>
                    <span>Precio: {producto.oferta.precio}</span>
                  </>
                )}
              </div>
              <div className="inventory-card-cantidad">
                <span>Cantidad Disponible</span>
                <button onClick={() => handleCantidad(producto.id, -1)} className="inventory-cantidad-btn">-</button>
                <span className={`inventory-cantidad-num${producto.cantidad === 0 ? ' zero' : ''}`}>{producto.cantidad}</span>
                <button onClick={() => handleCantidad(producto.id, 1)} className="inventory-cantidad-btn">+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="inventory-add-offer-btn" onClick={() => setShowModal(true)}>
        agregar oferta
      </button>

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
              style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 12 }}
            />
          ) : (
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <circle cx="8.5" cy="12.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          )}
        </div>
        <label className="modal-upload-btn-admin" style={{ cursor: 'pointer' }}>
          Subir imagen
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </label>
      </div>
      <div className="modal-form-admin">
        <label>
          Nombre del producto:
          <input
            type="text"
            className="modal-input-admin"
            value={oferta}
            onChange={e => setOferta(e.target.value)}
          />
        </label>
        <label>
          Precio:
          <input
            type="text"
            className="modal-input-admin"
            value={precio}
            onChange={e => setPrecio(e.target.value)}
          />
        </label>
        <label>
          ID de la oferta:
          <input
            type="text"
            className="modal-input-admin"
            value={idOferta}
            onChange={e => setIdOferta(e.target.value)}
          />
        </label>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '10px' }}>
          <button className="modal-add-btn-admin" onClick={handleAgregarOferta}>Añadir</button>
          <button
            type="button"
            className="modal-add-btn-admin modal-clear-btn-admin"
            onClick={handleLimpiarModal}
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

export default Dashboard_Inventory;