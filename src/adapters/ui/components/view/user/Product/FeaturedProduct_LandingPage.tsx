import React from "react";
import './FeaturedProduct_LandingPage.css';
import { useCatalogProduct } from '../../../../hook/useCatalogProduct';
import { useModal } from '../../../../hook/useModal';
import Modal from '../../../modal/Modal';

const FeaturedProduct_LandingPage: React.FC = () => {
    const {
        handleBuyClick
    } = useCatalogProduct();

    const {
        isModalOpen,
        handleProductClick,
        handleModalOverlayClick,
        handleModalContentClick,
        handleCloseClick,
        handlePrimaryButtonClick,
        handleSecondaryButtonClick
    } = useModal();

    return (
        <div className="container-FeaturedProduct-LandingPage">
            <div className="container-Featured">
                <h2 className="featured-title">Productos Favoritos</h2>
                <p className="featured-description">¡Descubre todo lo que te encanta en un solo lugar!</p>

                <div className="featured-products">
                    <div className="item-featured-product" onClick={handleProductClick}>
                        <img src="/src/assets/images/apple-iphone13.png" alt="Producto Destacado" className="featured-product-image" />
                        <h3 className="featured-product-title">Producto Destacado 1</h3>
                        <p className="featured-product-price">$19.99</p>
                        <button className="featured-product-button" onClick={handleBuyClick}>Comprar</button>
                    </div>
                    <div className="item-featured-product" onClick={handleProductClick}>
                        <img src="/src/assets/images/apple-iphone13.png" alt="Producto Destacado" className="featured-product-image" />
                        <h3 className="featured-product-title">Producto Destacado 1</h3>
                        <p className="featured-product-price">$19.99</p>
                        <button className="featured-product-button" onClick={handleBuyClick}>Comprar</button>
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

export default FeaturedProduct_LandingPage;