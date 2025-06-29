import React from "react";
import './Home.css';
import { useModal } from '../../../../hook/useModal';
import Modal from '../../../modal/Modal';
import { useHome } from "../../../../hook/useHome";

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

    const {
        searchTerm,
        setSearchTerm,
        filteredProducts,
    } = useHome();

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
                    <input
                        type="text"
                        className="search-box-home"
                        placeholder="Buscar celulares..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
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
                    {filteredProducts.map((product, index) => (
                        <div className="product-card" key={index} onClick={handleProductClick}>
                            <img src={product.image} alt="product-image" className="product-image" />
                            <div className="product-name">{product.name}</div>
                            <div className="product-price">{product.price}<span className="product-old-price">{product.oldPrice}</span></div>
                        </div>
                    ))}
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