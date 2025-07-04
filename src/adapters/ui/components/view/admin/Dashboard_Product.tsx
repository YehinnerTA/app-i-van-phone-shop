import React, { useState } from 'react';
import iconProducto from '../../../../../assets/icons/Producto.svg';
import './Dashboard_Product.css';

const productos = [
    { id: 1, nombre: 'Producto', imagen: iconProducto },
    { id: 2, nombre: 'Producto', imagen: iconProducto },
    { id: 3, nombre: 'Producto', imagen: iconProducto },
    { id: 4, nombre: 'Producto', imagen: iconProducto },
    { id: 5, nombre: 'Producto', imagen: iconProducto },
];

const Dashboard_Product: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [previewImg, setPreviewImg] = useState<string | null>(null);
    const [sistema, setSistema] = useState('');
    const [procesador, setProcesador] = useState('');
    const [memoria, setMemoria] = useState('');
    const [camara, setCamara] = useState('');
    const [bateria, setBateria] = useState('');

    // Maneja la carga de la imagen
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

    // Limpiar todos los campos del modal
    const handleLimpiar = () => {
    setPreviewImg(null);
    setSistema('');
    setProcesador('');
    setMemoria('');
    setCamara('');
    setBateria('');
};

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
          Sistema:
          <input
            type="text"
            className="modal-input-admin"
            value={sistema}
            onChange={e => setSistema(e.target.value)}
          />
        </label>
        <label>
          Procesador:
          <input
            type="text"
            className="modal-input-admin"
            value={procesador}
            onChange={e => setProcesador(e.target.value)}
          />
        </label>
        <label>
          Memoria:
          <input
            type="text"
            className="modal-input-admin"
            value={memoria}
            onChange={e => setMemoria(e.target.value)}
          />
        </label>
        <label>
          Camara:
          <input
            type="text"
            className="modal-input-admin"
            value={camara}
            onChange={e => setCamara(e.target.value)}
          />
        </label>
        <label>
          Bateria:
          <textarea
            className="modal-textarea-admin"
            value={bateria}
            onChange={e => setBateria(e.target.value)}
          />
        </label>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '10px' }}>
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

export default Dashboard_Product;

