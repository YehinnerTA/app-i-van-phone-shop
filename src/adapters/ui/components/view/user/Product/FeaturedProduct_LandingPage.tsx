import React from "react";
import './FeaturedProduct_LandingPage.css';
import { useCatalogProduct } from '../../../../hook/useCatalogProduct';
import { useModal } from '../../../../hook/useModal';
import Modal from '../../../modal/Modal';

const FeaturedProduct_LandingPage: React.FC = () => {
    const {
        handleBuyClick,
        searchTermFeatured,
        setSearchTermFeatured,
        filteredFeaturedProducts
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

                <div className="search-container">
                    <input
                        type="text"
                        className="search-box"
                        placeholder={`Buscar en productos destacados...`}
                        value={searchTermFeatured}
                        onChange={(e) => setSearchTermFeatured(e.target.value)}
                    />
                    <div className="search-icon">🔍</div>
                </div>

                <div className="featured-products">
                    {filteredFeaturedProducts.map((product, index) =>
                        <div className="item-featured-product" key={index} onClick={handleProductClick}>
                            <img src={product.img} alt={product.title} className="featured-product-image" />
                            <h3 className="featured-product-title">{product.title}</h3>
                            <p className="featured-product-price">{product.price}</p>
                            <button className="featured-product-button" onClick={handleBuyClick}>Comprar</button>
                        </div>
                    )}
                    {filteredFeaturedProducts.length === 0 && (
                        <p className="no-results">No se encontraron productos destacados.</p>
                    )}
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