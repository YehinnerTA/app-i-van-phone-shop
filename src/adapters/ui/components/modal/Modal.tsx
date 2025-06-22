import React from 'react';
import './Modal.css';

interface ModalProps {
    isModalOpen: boolean;
    handleModalOverlayClick: (event: React.MouseEvent) => void;
    handleModalContentClick: (event: React.MouseEvent) => void;
    handleCloseClick: () => void;
    handlePrimaryButtonClick: () => void;
    handleSecondaryButtonClick: () => void;
}

const Modal: React.FC<ModalProps> = ({
    isModalOpen,
    handleModalOverlayClick,
    handleModalContentClick,
    handleCloseClick,
    handlePrimaryButtonClick,
    handleSecondaryButtonClick,
}) => {
    if (!isModalOpen) return null;

    return (
        <div className="modal-overlay active" onClick={handleModalOverlayClick}>
            <div className="modal-content" onClick={handleModalContentClick}>
                <button className="modal-close" onClick={handleCloseClick}>&times;</button>

                <div className="badge">NUEVO</div>

                <img className="modal-product-image" src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center" alt="Smartphone X" />

                <h2 className="modal-product-title">Smartphone X</h2>
                <p className="modal-product-price">$499.99</p>

                <div className="modal-product-description">
                    El Smartphone X representa la última innovación en tecnología móvil. Con un diseño elegante y características avanzadas, este dispositivo ofrece una experiencia excepcional para usuarios exigentes. Su pantalla de alta resolución y procesador de última generación garantizan un rendimiento superior en todas las tareas.
                </div>

                <div className="modal-product-specs">
                    <h4 className='product-spect-item'>Especificaciones Técnicas</h4>
                    <div className="spec-item">
                        <span className="spec-label">Pantalla:</span>
                        <span className="spec-value">6.5" OLED Super Retina</span>
                    </div>
                    <div className="spec-item">
                        <span className="spec-label">Procesador:</span>
                        <span className="spec-value">A16 Bionic Chip</span>
                    </div>
                    <div className="spec-item">
                        <span className="spec-label">Memoria:</span>
                        <span className="spec-value">128GB / 256GB / 512GB</span>
                    </div>
                    <div className="spec-item">
                        <span className="spec-label">Cámara:</span>
                        <span className="spec-value">48MP Triple Lente</span>
                    </div>
                    <div className="spec-item">
                        <span className="spec-label">Batería:</span>
                        <span className="spec-value">4500mAh</span>
                    </div>
                    <div className="spec-item">
                        <span className="spec-label">Sistema:</span>
                        <span className="spec-value">iOS 17</span>
                    </div>
                    <div className="spec-item">
                        <span className="spec-label">Conectividad:</span>
                        <span className="spec-value">5G, WiFi 6, Bluetooth 5.3</span>
                    </div>
                </div>

                <div className="modal-buttons">
                    <button className="modal-button secondary" onClick={handleSecondaryButtonClick}>Añadir a Favoritos</button>
                    <button className="modal-button primary" onClick={handlePrimaryButtonClick}>Comprar Ahora</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;