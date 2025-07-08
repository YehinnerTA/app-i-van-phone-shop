import React from 'react';
import './Modal.css';
import { ProductRegisterDto } from '../../../../application/dtos/ProductRegisterDto';

interface ModalProps {
    isModalOpen: boolean;
    handleModalOverlayClick: (event: React.MouseEvent) => void;
    handleCloseClick: () => void;
    handlePrimaryButtonClick: () => void;
    handleAddToFavorites: () => void;
    product: ProductRegisterDto | null;
}

const Modal: React.FC<ModalProps> = ({
    isModalOpen,
    handleModalOverlayClick,
    handleCloseClick,
    handleAddToFavorites,
    handlePrimaryButtonClick,
    product,
}) => {
    if (!isModalOpen || !product) return null;

    return (
        <div className="modal-overlay active" onClick={handleModalOverlayClick}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={handleCloseClick}>&times;</button>

                <div className="badge">NUEVO</div>

                <img className="modal-product-image" src={product.image} alt={product.name} />

                <h2 className="modal-product-title">{product.name}</h2>
                <p className="modal-product-price">s/{product.price}</p>

                <div className="modal-product-description">{product.description}</div>

                <div className="modal-product-specs">
                    <h4 className='product-spect-item'>Especificaciones Técnicas</h4>
                    <div className="spec-item">
                        <span className="spec-label">Pantalla:</span>
                        <span className="spec-value">{product.screen || 'No disponible'}</span>
                    </div>
                    <div className="spec-item">
                        <span className="spec-label">Procesador:</span>
                        <span className="spec-value">{product.processor || 'No disponible'}</span>
                    </div>
                    <div className="spec-item">
                        <span className="spec-label">Memoria:</span>
                        <span className="spec-value">{product.memory || 'No disponible'}</span>
                    </div>
                    <div className="spec-item">
                        <span className="spec-label">Cámara:</span>
                        <span className="spec-value">{product.camera || 'No disponible'}</span>
                    </div>
                    <div className="spec-item">
                        <span className="spec-label">Batería:</span>
                        <span className="spec-value">{product.battery || 'No disponible'}</span>
                    </div>
                    <div className="spec-item">
                        <span className="spec-label">Sistema:</span>
                        <span className="spec-value">{product.system || 'No disponible'}</span>
                    </div>
                    <div className="spec-item">
                        <span className="spec-label">Conectividad:</span>
                        <span className="spec-value">{product.connectivity || 'No disponible'}</span>
                    </div>
                </div>

                <div className="modal-buttons">
                    <button className="modal-button secondary" onClick={handleAddToFavorites}>{product.featured ? 'Quitar de Favoritos' : 'Añadir a Favoritos'}</button>
                    <button className="modal-button primary" onClick={handlePrimaryButtonClick}>{product.buy ? 'Quitar del carrito' : 'Añadir al carrito'}</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;