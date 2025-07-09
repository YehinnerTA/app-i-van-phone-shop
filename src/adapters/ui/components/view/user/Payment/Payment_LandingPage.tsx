import React from "react";
import './Payment_LandingPage.css';
import { usePayment } from "../../../../hook/users/usePayment";

const Payment_LandingPage: React.FC = () => {
    const {
        products,
        priceData,
        removeItem,
        applyDiscount,
        increaseQuantity,
        decreaseQuantity,
        paymentMethod,
        setPaymentMethod,
        paymentFields,
        handleInputChange,
        handleCheckout,
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
                {products.length > 0 ? (
                    products.map(product => (
                        <div className="payment-card-item-container" key={product.id}>
                            <div className="payment-card-item">
                                <div className="payment-card-item-content">
                                    <img src={product.image || 'src/assets/images/apple-iphone13.png'} alt={product.name} className="img-item-card" />
                                    <div className="payment-card-item-details">
                                        <h2 className="payment-item-title">{product.name}</h2>
                                        <div className="payment-item-tags">
                                            <span className="detail-color-item-tags">{product.category}</span>
                                            <span className="detail-storage-item-tags">{product.memory || 'N/A'}</span>
                                        </div>

                                        <div className="payment-item-controller">
                                            <div className="payment-item-number">
                                                <button title="btn-item-quantity" id="quantity-btn-minus" className="btn-item-quantity" onClick={() => decreaseQuantity(product.id)}>-</button>
                                                <span className="quantity-product" id="quantity">{product.quantity}</span>
                                                <button title="btn-item-quantity" id="quantity-btn-plus" className="btn-item-quantity" onClick={() => increaseQuantity(product.id)}>+</button>
                                            </div>
                                            <div className="payment-item-delete">
                                                <p className="item-price" id="itemPrice">S/.{(product.price * product.quantity).toLocaleString()}</p>
                                                <button title="btn-item-delete" className="btn-item-delete" onClick={() => removeItem(product.id)}>
                                                    <img src="src/assets/icons/delete.svg" alt="delete" className="icon-delete" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='Error-message-Payment'>Tu carrito está vacío</p>
                )}

                <div className="payment-card-item-discount">
                    <input type="text" className="text-card-discount" placeholder="Código de descuento" />
                    <button title="btn-discount-product" className="btn-discount-product" onClick={applyDiscount}>Aplicar</button>
                </div>

                <div className="payment-card" title="payment-options">
                    <h2 className="title-payment">Método de Pago</h2>
                    <label className="payment-label">
                        <input
                            type="radio"
                            name="payment"
                            className="payment-radio"
                            value="credit-card"
                            checked={paymentMethod === 'credit-card'}
                            onChange={() => setPaymentMethod('credit-card')}
                        />
                        <img src="src/assets/icons/tarjeta-credito.svg" alt="tarjeta-credito" className="img-option" />
                        Tarjeta de Crédito
                    </label>
                    <label className="payment-label">
                        <input
                            type="radio"
                            name="payment"
                            className="payment-radio"
                            value="yape"
                            checked={paymentMethod === 'yape'}
                            onChange={() => setPaymentMethod('yape')}
                        />
                        <img src="src/assets/icons/yape.svg" alt="yape" className="img-option" />
                        Yape
                    </label>
                    <label className="payment-label">
                        <input
                            type="radio"
                            name="payment"
                            className="payment-radio"
                            value="cash"
                            checked={paymentMethod === 'cash'}
                            onChange={() => setPaymentMethod('cash')}
                        />
                        <img src="src/assets/icons/efectivo.svg" alt="efectivo" className="img-option" />
                        Efectivo
                    </label>

                    {paymentMethod === 'credit-card' && (
                        <div className="payment-form">
                            <input type="text" name="cardNumber" placeholder="Número de Tarjeta" className="payment-input" value={paymentFields.cardNumber || ''} onChange={handleInputChange} />
                            <input type="text" name="expiration" placeholder="Fecha de Expiración (MM/AA)" className="payment-input" value={paymentFields.expiration || ''} onChange={handleInputChange} />
                            <input type="text" name="cvv" placeholder="CVV" className="payment-input" value={paymentFields.cvv || ''} onChange={handleInputChange} />
                        </div>
                    )}

                    {paymentMethod === 'yape' && (
                        <div className="payment-form">
                            <input type="text" name="phone" placeholder="Número de celular asociado a Yape" className="payment-input" value={paymentFields.phone || ''} onChange={handleInputChange} />
                        </div>
                    )}

                    {paymentMethod === 'cash' && (
                        <div className="payment-form">
                            <input type="text" name="fullName" placeholder="Nombre completo" className="payment-input" value={paymentFields.fullName || ''} onChange={handleInputChange} />
                        </div>
                    )}
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
                    <button className="btn-checkout" onClick={handleCheckout}>Finalizar Compra</button>
                    <p className="checkout-text">Garantía de 30 días</p>
                </div>
            </div>
        </div>
    );
};

export default Payment_LandingPage;