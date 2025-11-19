import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  // Base URL for product images
  const imgUrl = "https://rexkinoo.pythonanywhere.com/static/images/";

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    calculateTotal(storedCart);
  }, []);

  // Calculate total cart cost
  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.quantity * parseFloat(item.product_cost), 0);
    setTotalCost(total);
  };

  // Remove item from cart
  const handleRemove = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  // Change item quantity
  const handleQuantityChange = (index, type) => {
    const updatedCart = [...cartItems];
    const item = updatedCart[index];

    if (type === 'increase') item.quantity += 1;
    if (type === 'decrease' && item.quantity > 1) item.quantity -= 1;

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  // Checkout
  const handleCheckout = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/signin");
      }, 2000);
      return;
    }

    if (cartItems.length === 0) return;

    navigate("/mpesapayment", { 
      state: { 
        totalCost, 
        cartItems 
      } 
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center text-primary">Your Shopping Cart</h2>

      {/* Toast for login */}
      {showToast && (
        <div className="toast align-items-center text-bg-danger border-0 show" role="alert">
          <div className="d-flex">
            <div className="toast-body">Please log in to continue.</div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setShowToast(false)}></button>
          </div>
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="text-center mt-5">
          <p>Your cart is empty.</p>
          <button className="btn btn-primary btn-lg" onClick={() => navigate("/products")}>
            Go Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="list-group mb-4">
            {cartItems.map((item, index) => (
              <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  {/* Product Image */}
                  <img 
                    src={`${imgUrl}${item.product_photo}`} 
                    alt={item.product_name} 
                    style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '15px' }}
                  />

                  <div>
                    <h5>{item.product_name}</h5>
                    {/* Quantity Controls */}
                    <div className="input-group input-group-sm w-auto mt-2">
                      <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange(index, 'decrease')}>−</button>
                      <span className="input-group-text">{item.quantity}</span>
                      <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange(index, 'increase')}>+</button>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-column align-items-end">
                  <span className="text-success fw-bold mb-2">
                    Ksh. {(item.quantity * item.product_cost).toLocaleString()}
                  </span>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemove(index)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h4 className="text-end">
            Total: <span className="text-danger">Ksh. {totalCost.toLocaleString()}</span>
          </h4>

          <div className="text-center mt-4">
            <button className="btn btn-success btn-lg" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
