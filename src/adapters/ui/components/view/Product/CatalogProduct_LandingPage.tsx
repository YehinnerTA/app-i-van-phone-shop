import React from 'react';
import './CatalogProduct_LandingPage.css';
import { useCatalogProduct } from '../../../hook/useCatalogProduct';

const CatalogProduct_LandingPage: React.FC = () => {
    const {
        currentIndex,
        activeCategory,
        handleCategoryClick,
        handleProductClick,
        handleBuyClick,
        handleModalOverlayClick,
        handleModalContentClick,
        handleCloseClick,
    } = useCatalogProduct();

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
                    {activeCategory === 'Celulares' && (
                        <div className='product-list'>
                            <div className="product-item" onClick={handleProductClick}>
                                <img className='product-item-product' src="/src/assets/images/apple-iphone13.png" alt="Product 1" />
                                <h3 className='product-item-title'>Smartphone X</h3>
                                <p className='product-item-price'>$499.99</p>
                                <button className='product-item-button' title='button-item' onClick={handleBuyClick}>Comprar</button>
                            </div>
                            <div className="product-item" onClick={handleProductClick}>
                                <img className='product-item-product' src="/src/assets/images/apple-iphone13.png" alt="Product 2" />
                                <h3 className='product-item-title'>Smartphone Y</h3>
                                <p className='product-item-price'>$599.99</p>
                                <button className='product-item-button' title='button-item' onClick={handleBuyClick}>Comprar</button>
                            </div>
                            <div className="product-item" onClick={handleProductClick}>
                                <img className='product-item-product' src="/src/assets/images/apple-iphone13.png" alt="Product 3" />
                                <h3 className='product-item-title'>Headphones Z</h3>
                                <p className='product-item-price'>$199.99</p>
                                <button className='product-item-button' title='button-item' onClick={handleBuyClick}>Comprar</button>
                            </div>
                        </div>
                    )}

                    {activeCategory === 'Accesorios' && (
                        <div className='product-list'>
                            <div className="product-item" onClick={handleProductClick}>
                                <img className='product-item-product' src="/src/assets/images/audifonos.jpeg" alt="Product 4" />
                                <h3 className='product-item-title'>Audifonos</h3>
                                <p className='product-item-price'>$249.99</p>
                                <button className='product-item-button' title='button-item' onClick={handleBuyClick}>Comprar</button>
                            </div>
                            <div className="product-item" onClick={handleProductClick}>
                                <img className='product-item-product' src="/src/assets/images/audifonos.jpeg" alt="Product 5" />
                                <h3 className='product-item-title'>Cargador</h3>
                                <p className='product-item-price'>$29.99</p>
                                <button className='product-item-button' title='button-item' onClick={handleBuyClick}>Comprar</button>
                            </div>
                            <div className="product-item" onClick={handleProductClick}>
                                <img className='product-item-product' src="/src/assets/images/audifonos.jpeg" alt="Product 6" />
                                <h3 className='product-item-title'>Cable</h3>
                                <p className='product-item-price'>$19.99</p>
                                <button className='product-item-button' title='button-item' onClick={handleBuyClick}>Comprar</button>
                            </div>
                        </div>
                    )}

                    {activeCategory === 'Otros' && (
                        <div className=' product-list'>
                            <div className="product-item" onClick={handleProductClick}>
                                <img className='product-item-product' src="/src/assets/images/funda.jpeg" alt="Product 7" />
                                <h3 className='product-item-title'>Carca celular</h3>
                                <p className='product-item-price'>$299.99</p>
                                <button className='product-item-button' title='button-item' onClick={handleBuyClick}>Comprar</button>
                            </div>
                            <div className="product-item" onClick={handleProductClick}>
                                <img className='product-item-product' src="/src/assets/images/funda.jpeg" alt="Product 8" />
                                <h3 className='product-item-title'>Mica</h3>
                                <p className='product-item-price'>$399.99</p>
                                <button className='product-item-button' title='button-item' onClick={handleBuyClick}>Comprar</button>
                            </div>
                            <div className="product-item" onClick={handleProductClick}>
                                <img className='product-item-product' src="/src/assets/images/funda.jpeg" alt="Product 9" />
                                <h3 className='product-item-title' >Splash</h3>
                                <p className='product-item-price'>$149.99</p>
                                <button className='product-item-button' title='button-item' onClick={handleBuyClick}>Comprar</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="modal-overlay" id="productModal" onClick={handleModalOverlayClick}>
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
                        <button className="modal-button secondary">Añadir a Favoritos</button>
                        <button className="modal-button primary">Comprar Ahora</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CatalogProduct_LandingPage;