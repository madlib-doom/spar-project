import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [removedItemName, setRemovedItemName] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    calculateTotal(storedCart);
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => {
      return sum + (item.quantity * parseFloat(item.product_cost));
    }, 0);
    setTotalCost(total);
  };

  const handleRemove = (indexToRemove) => {
    const itemName = cartItems[indexToRemove].product_name;
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);

    setRemovedItemName(itemName);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleQuantityChange = (index, type) => {
    const updatedCart = [...cartItems];
    const item = updatedCart[index];

    if (type === 'increase') {
      item.quantity += 1;
    } else if (type === 'decrease' && item.quantity > 1) {
      item.quantity -= 1;
    }

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    navigate("/mpesapayment", {
      state: { totalCost }
    });
  };

  return (
    <div className="container mt-5 position-relative">

      <h2 className="mb-4 text-center text-primary">Your Shopping Cart</h2>

      {/* Toast Notification */}
      <div
        className="toast-container position-fixed top-0 end-0 p-3"
        style={{ zIndex: 9999 }}
      >
        <div
          className={`toast align-items-center text-bg-warning border-0 ${showToast ? 'show' : 'hide'}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">
              <strong>{removedItemName}</strong> was removed from your cart.
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

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="list-group mb-4">
            {cartItems.map((item, index) => (
              <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">{item.product_name}</h5>

                  {/* Quantity Controls */}
                  <div className="input-group input-group-sm w-auto mt-2">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => handleQuantityChange(index, 'decrease')}
                    >−</button>
                    <span className="input-group-text">{item.quantity}</span>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => handleQuantityChange(index, 'increase')}
                    >+</button>
                  </div>
                </div>

                <div className="d-flex flex-column align-items-end">
                  <span className="text-success fw-bold mb-2">
                    Ksh. {(item.quantity * item.product_cost).toLocaleString()}
                  </span>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleRemove(index)}
                  >
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
