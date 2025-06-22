import React from "react";
import './Home.css';
import { useModal } from '../../../hook/useModal';
import Modal from '../../modal/Modal';

const Home_LandingPage: React.FC = () => {
    const {
        isModalOpen,
        handleProductClick,
        handleModalOverlayClick,
        handleModalContentClick,
        handleCloseClick,
        handlePrimaryButtonClick,
        handleSecondaryButtonClick,
    } = useModal();

    return (
        <div className="home-landing">
            <div className="home-landing-header">
                <div className="container-home">
                    <div className="container-Android">
                        <strong>Android</strong>
                        <img src="src\assets\icons\Android.svg" alt="Producto Android" />
                    </div>
                    <div className="container-iPhone">
                        <img src="src\assets\icons\Apple.svg" alt="Producto iPhone" />
                        <strong>iPhone</strong>
                    </div>
                </div>

                <div className="search-container-home">
                    <input type="text" className="search-box-home" placeholder="Buscar celulares..." />
                    <div className="search-icon-home">🔍</div>
                </div>
            </div>

            <div className="section-home">
                <div className="section-title-home">Categorías</div>
                <div className="categories-home">
                    <div className="category-item">
                        <div className="category-icon">📱</div>
                        <div className="category-name">Celulares</div>
                    </div>
                    <div className="category-item">
                        <div className="category-icon">🎧</div>
                        <div className="category-name">Audifonos</div>
                    </div>
                    <div className="category-item">
                        <div className="category-icon">⚡</div>
                        <div className="category-name">Cargadores</div>
                    </div>
                    <div className="category-item">
                        <div className="category-icon">🔗</div>
                        <div className="category-name">Otros</div>
                    </div>
                </div>
            </div>

            <div className="home-banner-container">
                <div className="home-banner">
                    <div className="banner-content">
                        <div className="home-title">🔥 Ofertas Especiales</div>
                        <div className="home-subtitle">Hasta 40% de descuento</div>
                    </div>
                </div>
            </div>

            <div className="section-product-home">
                <div className="section-title-home">Productos Destacados</div>
                <div className="products-grid">
                    <div className="product-card" onClick={handleProductClick}>
                        <img src="src\assets\images\apple-iphone13.png" alt="product-image" className="product-image" />
                        <div className="product-name">iPhone 15 Pro</div>
                        <div className="product-price">$999 <span className="product-old-price">$1,199</span></div>
                    </div>
                    <div className="product-card" onClick={handleProductClick}>
                        <img src="src\assets\images\apple-iphone13.png" alt="product-image" className="product-image" />
                        <div className="product-name">Samsung Galaxy S24</div>
                        <div className="product-price">$849 <span className="product-old-price">$999</span></div>
                    </div>
                    <div className="product-card" onClick={handleProductClick}>
                        <img src="src\assets\images\apple-iphone13.png" alt="product-image" className="product-image" />
                        <div className="product-name">Xiaomi 14 Ultra</div>
                        <div className="product-price">$649 <span className="product-old-price">$799</span></div>
                    </div>
                    <div className="product-card" onClick={handleProductClick}>
                        <img src="src\assets\images\apple-iphone13.png" alt="product-image" className="product-image" />
                        <div className="product-name">OnePlus 12</div>
                        <div className="product-price">$599 <span className="product-old-price">$699</span></div>
                    </div>
                </div>
            </div>

            <Modal
                isModalOpen={isModalOpen}
                handleModalOverlayClick={handleModalOverlayClick}
                handleModalContentClick={handleModalContentClick}
                handleCloseClick={handleCloseClick}
                handlePrimaryButtonClick={handlePrimaryButtonClick}
                handleSecondaryButtonClick={handleSecondaryButtonClick}
            />
        </div>
    );
};

export default Home_LandingPage;