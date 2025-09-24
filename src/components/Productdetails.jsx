// ProductDetails.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const { state } = useLocation();
  const products = state?.products;
  const imgUrl = "https://rexkinoo.pythonanywhere.com/static/images/";

  const [quantity, setQuantity] = useState(1);
  const [cartMessage, setCartMessage] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  const navigate=useNavigate("")

  // Always call hooks at the top level
  useEffect(() => {
    if (!products) return;
    const cost = parseFloat(products.product_cost);
    setTotalCost(quantity * cost);
  }, [quantity, products]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.id === products.id);

    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({ ...products, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setCartMessage("Product added to cart!");
  };

  const incrementQty = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQty = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  if (!products) {
    return <p>No products found.</p>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Product Image */}
        <div className="col-md-5">
          <img 
            src={`${imgUrl}${products.product_photo}`} 
            alt={products.product_name} 
            className="img-fluid rounded"
          />
        </div>

        {/* Product Details */}
        <div className="col-md-7">
          <h2>{products.product_name}</h2>
          <p>{products.product_description}</p>
          <h4 className="text-danger">Ksh. {products.product_cost}</h4>

          {/* Quantity Selector */}
          <div className="mb-3 mt-3">
            <label className="form-label">Quantity</label>
            <div className="input-group w-50">
              <button 
                className="btn btn-outline-secondary" 
                onClick={decrementQty}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                className="form-control text-center"
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (!isNaN(value) && value > 0) {
                    setQuantity(value);
                  }
                }}
              />
              <button 
                className="btn btn-outline-secondary" 
                onClick={incrementQty}
              >
                +
              </button>
            </div>
          </div>

          {/* Total Cost */}
          <div className="mb-3">
            <strong>Total Cost: </strong>
            <span className="text-primary">
              Ksh. {totalCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button 
            className="btn btn-success"
            onClick={()=>navigate("/mpesapayment")}
          >
            Add to Cart
          </button>

          {/* Feedback */}
          {cartMessage && (
            <p className="text-success mt-3">{cartMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
