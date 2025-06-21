import React from "react";
import './FeaturedProduct_LandingPage.css';

const FeaturedProduct_LandingPage: React.FC = () => {
    return (
        <div className="container-Featured">
            <h2 className="featured-title">Productos Favoritos</h2>
            <p className="featured-description">¡Descubre todo lo que te encanta en un solo lugar!</p>

            <div className="featured-products">
                <div className="item-featured-product">
                    <img src="/src/assets/images/apple-iphone13.png" alt="Producto Destacado" className="featured-product-image" />
                    <h3 className="featured-product-title">Producto Destacado 1</h3>
                    <p className="featured-product-price">$19.99</p>
                    <button className="featured-product-button">Comprar</button>
                </div>
                <div className="item-featured-product">
                    <img src="/src/assets/images/apple-iphone13.png" alt="Producto Destacado" className="featured-product-image" />
                    <h3 className="featured-product-title">Producto Destacado 1</h3>
                    <p className="featured-product-price">$19.99</p>
                    <button className="featured-product-button">Comprar</button>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProduct_LandingPage;