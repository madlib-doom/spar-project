import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const { state } = useLocation();
  const product = state?.products;

  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [totalCost, setTotalCost] = useState(0);

  const imgUrl = "https://rexkinoo.pythonanywhere.com/static/images/";

  useEffect(() => {
    if (product) {
      const cost = parseFloat(product.product_cost);
      setTotalCost(cost * quantity);
    }
  }, [product, quantity]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingIndex = cart.findIndex(item => item.id === product.id);

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart'); // go to cart after adding
  };

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  if (!product) {
    return <div className="container mt-5"><h4>No product found.</h4></div>;
  }

  return (
    <div className="container mt-5">
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
