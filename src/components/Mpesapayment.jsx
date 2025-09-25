import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from './Loader';

const Mpesapayment = () => {
  const location = useLocation();
  const [totalCost, setTotalCost] = useState(0);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Load cost from state or fallback to localStorage
  useEffect(() => {
    const stateCost = location.state?.totalCost;
    const localCost = localStorage.getItem('totalCost');

    if (stateCost) {
      setTotalCost(stateCost);
    } else if (localCost) {
      setTotalCost(parseFloat(localCost));
    }
  }, [location.state]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      const data = new FormData();
      data.append("phone", phone);
      data.append("amount", totalCost);

      const response = await axios.post(
        "https://aarondev.pythonanywhere.com/api/mpesa_payment",
        data
      );

      setSuccess(response.data.message);
      localStorage.removeItem("cart");
      localStorage.removeItem("totalCost");
    } catch (err) {
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='row justify-content-center mt-4'>
      <h2 className='text-success'>Lipa na M-Pesa</h2>

      <div className="col-md-6">
        <div className="card shadow p-4">
          <form onSubmit={submit}>
            <label>Fill in the details to complete the transaction:</label>
            {loading && <Loader />}
            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Display readonly total amount */}
            <input
  type="text"
  className="form-control"
  value={`KES ${totalCost.toLocaleString()}`}
  readOnly
/>

            <br />

            {/* Phone number input */}
            <input
              type="number"
              placeholder="Enter phone number e.g. 2547..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              required
            />
            <br />

            <button className="btn btn-success w-100">
              Complete Transaction
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Mpesapayment;
