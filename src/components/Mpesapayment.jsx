import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from './Loader';

const Mpesapayment = () => {
  const location = useLocation();
  const [totalCost, setTotalCost] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const stateCart = location.state?.cartItems || [];
    const stateCost = location.state?.totalCost;

    setCartItems(stateCart);
    setTotalCost(stateCost);
  }, [location.state]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      const form = new FormData();
      form.append("phone", phone);
      form.append("amount", totalCost);

      const response = await axios.post(
        "https://aarondev.pythonanywhere.com/api/mpesa_payment",
        form
      );

      setSuccess(response.data.message);

     
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        let purchaseCount = user.purchaseCount || 0;
        purchaseCount++;

        const productNames = cartItems.map(item => item.product_name);

        const newOrder = {
          amount: totalCost,
          date: new Date().toLocaleString(),
          products: productNames
        };

        let orderHistory = user.orderHistory || [];
       orderHistory.push(newOrder);

        let coupon = user.coupon || "";
        if (purchaseCount > 10 && !coupon) {
          coupon = "GOLD-" + Math.random().toString(36).substring(2, 10).toUpperCase();
        }

        const updatedUser = { ...user, purchaseCount, orderHistory, coupon };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      localStorage.removeItem("cart");
    } catch {
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center mt-4">
      <h2 className="text-success">Lipa na M-Pesa</h2>

      <div className="col-md-6">
        <div className="card shadow p-4">

          <form onSubmit={submit}>
            {loading && <Loader />}
            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <input type="text" className="form-control" value={`KES ${totalCost.toLocaleString()}`} readOnly />
            <br />

            <input
              type="number"
              placeholder="Enter phone number e.g. 2547..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              required
            />
            <br />

            <button className="btn btn-success w-100">Complete Transaction</button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Mpesapayment;
