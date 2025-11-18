import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const { state } = useLocation();
  const product = state?.products;

  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [totalCost, setTotalCost] = useState(0);

  // Toast state
  const [showToast, setShowToast] = useState(false);

  const imgUrl = "https://rexkinoo.pythonanywhere.com/static/images/";

  useEffect(() => {
    if (product) {
      const cost = parseFloat(product.product_cost);
      setTotalCost(cost * quantity);
    }
  }, [product, quantity]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Fix: use product_id field, not id
    const existingIndex = cart.findIndex(
      item => item.product_id === product.product_id
    );

    if (existingIndex >= 0) {
      // Increase quantity
      cart[existingIndex].quantity += quantity;
    } else {
      // Add new product to cart
      cart.push({
        product_id: product.product_id,
        product_name: product.product_name,
        product_cost: product.product_cost,
        product_photo: product.product_photo,
        quantity: quantity
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // Show toast and redirect after 2 seconds
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate('/cart');
    }, 2000);
  };

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  if (!product) {
    return <div className="container mt-5"><h4>No product found.</h4></div>;
  }

  return (
    <div className="container mt-5">

      {/* Toast Notification */}
      <div
        className="toast-container position-fixed top-0 end-0 p-3"
        style={{ zIndex: 9999 }}
      >
        <div
          className={`toast align-items-center text-bg-success border-0 ${showToast ? 'show' : 'hide'}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">
              Item added to cart!
            </div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={() => setShowToast(false)}
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Product Image */}
        <div className="col-md-5">
          <img
            src={`${imgUrl}${product.product_photo}`}
            alt={product.product_name}
            className="img-fluid rounded shadow"
          />
        </div>

        {/* Product Info */}
        <div className="col-md-7">
          <h2>{product.product_name}</h2>
          <p>{product.product_description}</p>
          <h4 className="text-danger">Ksh. {parseFloat(product.product_cost).toLocaleString()}</h4>

          {/* Quantity Selector */}
          <div className="mt-3 mb-3">
            <label className="form-label">Quantity</label>
            <div className="input-group w-50">
              <button className="btn btn-outline-secondary" onClick={decrement}>-</button>
              <input
                type="number"
                min="1"
                className="form-control text-center"
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value > 0) {
                    setQuantity(value);
                  }
                }}
              />
              <button className="btn btn-outline-secondary" onClick={increment}>+</button>
            </div>
          </div>

          {/* Total Cost */}
          <div className="mb-3">
            <strong>Total Cost:</strong>
            <span className="text-primary ms-2">
              Ksh. {totalCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>

          {/* Add to Cart */}
          <button className="btn btn-success btn-lg" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
