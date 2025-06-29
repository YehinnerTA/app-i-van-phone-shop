import React from 'react';
import './CatalogProduct_LandingPage.css';
import { useCatalogProduct } from '../../../../hook/useCatalogProduct';
import { useModal } from '../../../../hook/useModal';
import Modal from '../../../modal/Modal';

const CatalogProduct_LandingPage: React.FC = () => {
    const {
        currentIndex,
        activeCategory,
        searchTerm,
        setSearchTerm,
        handleCategoryClick,
        handleBuyClick,
        filteredProducts
    } = useCatalogProduct();

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
        <div className="container-product">
            <div className="product-header">
                <div className={`slider-product ${currentIndex === 0 ? 'active' : ''}`}>
                    <div className='slider-product-content'>
                        <h2 className='slider-product-title'>Celulares</h2>
                        <p className='slider-product-description'>La tecnología más avanzada en la palma de tu mano.</p>
                    </div>
                    <div className='slider-product-image'>
                        <img src="/src/assets/icons/Producto.svg" alt="Phone" />
                    </div>
                </div>
                <div className={`slider-product ${currentIndex === 1 ? 'active' : ''}`}>
                    <div className='slider-product-content'>
                        <h2 className='slider-product-title'>Accesorios</h2>
                        <p className='slider-product-description'>Complementa tu estilo con los mejores accesorios tech.</p>
                    </div>
                    <div className='slider-product-image'>
                        <img src="/src/assets/icons/Accessories.svg" alt="Accessories" />
                    </div>
                </div>
                <div className={`slider-product ${currentIndex === 2 ? 'active' : ''}`}>
                    <div className='slider-product-content'>
                        <h2 className='slider-product-title'>Otros</h2>
                        <p className='slider-product-description'>Todo lo que necesitas para tu mundo digital.</p>
                    </div>
                    <div className='slider-product-image'>
                        <img src="/src/assets/icons/Android-Apple.svg" alt="Others" />
                    </div>
                </div>
            </div>
            <div className="product-content">
                <nav className='product-content-nav'>
                    <ul className='product-list-options'>
                        <li
                            className={`list-options ${activeCategory === 'Celulares' ? 'active' : ''}`}
                            onClick={() => handleCategoryClick('Celulares')}
                        >
                            Celulares
                        </li>
                        <li
                            className={`list-options ${activeCategory === 'Accesorios' ? 'active' : ''}`}
                            onClick={() => handleCategoryClick('Accesorios')}
                        >
                            Accesorios
                        </li>
                        <li
                            className={`list-options ${activeCategory === 'Otros' ? 'active' : ''}`}
                            onClick={() => handleCategoryClick('Otros')}
                        >
                            Otros
                        </li>
                    </ul>
                </nav>

                <div className="product-content-list">
                    <div className="search-container">
                        <input
                            type="text"
                            className="search-box"
                            placeholder={`Buscar en ${activeCategory.toLowerCase()}...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="search-icon">🔍</div>
                    </div>

                    <div className='product-list'>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product, index) => (
                                <div className="product-item" key={index} onClick={handleProductClick}>
                                    <img className='product-item-product' src={product.img} alt={product.title} />
                                    <h3 className='product-item-title'>{product.title}</h3>
                                    <p className='product-item-price'>{product.price}</p>
                                    <button className='product-item-button' title='button-item' onClick={handleBuyClick}>Comprar</button>
                                </div>
                            ))
                        ) : (
                            <p className='search-error'>No se encontraron productos.</p>
                        )}
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

export default CatalogProduct_LandingPage;