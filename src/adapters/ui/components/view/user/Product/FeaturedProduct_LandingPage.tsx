import React from "react";
import './FeaturedProduct_LandingPage.css';
import { useCatalogProduct, ProductWithId } from '../../../../hook/users/useCatalogProduct';
import { useModal } from '../../../../hook/useModal';
import Modal from '../../../modal/Modal';

const FeaturedProduct_LandingPage: React.FC = () => {
    const {
        handleBuyClick,
        searchTermFeatured,
        setSearchTermFeatured,
        filteredFeaturedProducts,
        fetchProducts,
    } = useCatalogProduct();

    const {
        isModalOpen,
        selectedProduct,
        handleProductClick,
        handleModalOverlayClick,
        handleCloseClick,
        handlePrimaryButtonClick,
        handleAddToFavorites,
    } = useModal({ fetchProducts });

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
                    {filteredFeaturedProducts.map((product: ProductWithId, index: number) =>
                        <div className="item-featured-product" key={index} onClick={() => handleProductClick(product)}>
                            <img src={product.image} alt={product.name} className="featured-product-image" />
                            <h3 className="featured-product-title">{product.name}</h3>
                            <p className="featured-product-price">{product.price}</p>
                            <button className="featured-product-button" onClick={handleBuyClick}>Comprar</button>
                        </div>
                    )}
                    {filteredFeaturedProducts.length === 0 && (
                        <p className="no-results">No se encontraron productos destacados.</p>
                    )}
                </div>
            </div>

            {selectedProduct && (
                <Modal
                    isModalOpen={isModalOpen}
                    handleModalOverlayClick={handleModalOverlayClick}
                    handleCloseClick={handleCloseClick}
                    handlePrimaryButtonClick={handlePrimaryButtonClick}
                    handleAddToFavorites={handleAddToFavorites}
                    product={selectedProduct}
                />
            )}
        </div>
    );
};

export default FeaturedProduct_LandingPage;