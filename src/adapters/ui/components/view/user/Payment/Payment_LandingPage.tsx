import React from "react";
import './Payment_LandingPage.css';
import { usePayment } from "../../../../hook/usePayment";

const Payment_LandingPage: React.FC = () => {
    const {
        quantity,
        priceData,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        applyDiscount,
    } = usePayment();

    return (
        <div className="payment-landing-page">
            <div className="payment-landing-page-header">
                <img src="src/assets/icons/carrito.svg" alt="product-item" className="img-car-payment" />
                <div className="payment-landing-page-header-text">
                    <h1 className="title-header">Mi Carrito</h1>
                    <p className="numer-product-header">{priceData.productCount}</p>
                </div>
            </div>

            <div className="payment-landing-page-content">
                {quantity > 0 && (
                    <div className="payment-card-item-container">
                        <div className="payment-card-item">
                            <div className="payment-card-item-content">
                                <img src="src/assets/images/apple-iphone13.png" alt="product-item" className="img-item-card" />
                                <div className="payment-card-item-details">
                                    <h2 className="payment-item-title">iPhone 15 Pro Max</h2>
                                    <div className="payment-item-tags">
                                        <span className="detail-color-item-tags">Azul</span>
                                        <span className="detail-storage-item-tags">256gb</span>
                                    </div>

                                    <div className="payment-item-controller">
                                        <div className="payment-item-number">
                                            <button title="btn-item-quantity" id="quantity-btn-minus" className="btn-item-quantity" onClick={decreaseQuantity}>-</button>
                                            <span className="quantity-product" id="quantity">{priceData.quantityDisplay}</span>
                                            <button title="btn-item-quantity" id="quantity-btn-plus" className="btn-item-quantity" onClick={increaseQuantity}>+</button>
                                        </div>
                                        <div className="payment-item-delete">
                                            <p className="item-price" id="itemPrice">{priceData.itemPrice}</p>
                                            <button title="btn-item-delete" className="btn-item-delete" onClick={removeItem}>
                                                <img src="src/assets/icons/delete.svg" alt="delete" className="icon-delete" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="payment-card-item-discount">
                    <input type="text" className="text-card-discount" placeholder="Código de descuento" />
                    <button title="btn-discount-product" className="btn-discount-product" onClick={applyDiscount}>Aplicar</button>
                </div>

                <div className="payment-card" title="payment-options">
                    <h2 className="title-payment">Método de Pago</h2>
                    <label className="payment-label">
                        <input type="radio" name="payment" className="payment-radio" value="credit-card" />
                        <img src="src/assets/icons/tarjeta-credito.svg" alt="tarjeta-credito" className="img-option" />
                        Tarjeta de Crédito
                    </label>
                    <label className="payment-label">
                        <input type="radio" name="payment" className="payment-radio" value="paypal" />
                        <img src="src/assets/icons/paypal.svg" alt="paypal" className="img-option" />
                        PayPal
                    </label>
                    <label className="payment-label">
                        <input type="radio" name="payment" className="payment-radio" value="apple-pay" />
                        <img src="src/assets/icons/apple-pay.svg" alt="apple-pay" className="img-option" />
                        Apple Pay
                    </label>
                    <label className="payment-label">
                        <input type="radio" name="payment" className="payment-radio" value="google-pay" />
                        <img src="src/assets/icons/google-pay.svg" alt="Google-Pay" className="img-option" />
                        Google Pay
                    </label>
                </div>

                <div className="payment-card" title="payment-summary">
                    <h2 className="title-payment">Resumen del pedido</h2>
                    <div className="payment-order-summary">
                        <div className="order-item">
                            <span className="order-item-name">Subtotal</span>
                            <span className="order-item-price" id="subtotal">{priceData.subtotal}</span>
                        </div>
                        <div className="order-item">
                            <span className="order-item-name">Descuento</span>
                            <span className="order-item-price" id="discount">{priceData.discount}</span>
                        </div>
                        <div className="order-item total">
                            <span className="order-item-name">Total</span>
                            <span className="order-item-price" id="total">{priceData.total}</span>
                        </div>
                    </div>
                </div>

                <div className="payment-checkout">
                    <button className="btn-checkout">Finalizar Compra</button>
                    <p className="checkout-text">Garantía de 30 días</p>
                </div>
            </div>
        </div>
    );
};

export default Payment_LandingPage;