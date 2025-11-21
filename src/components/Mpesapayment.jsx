import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import "./css/mpesaa.css";

const Mpesapayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [totalCost, setTotalCost] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(15); // <-- 15 sec timer
  const [startCountdown, setStartCountdown] = useState(false);

  useEffect(() => {
    const stateCart = location.state?.cartItems || [];
    const stateCost = location.state?.totalCost || 0;
    setCartItems(stateCart);
    setTotalCost(stateCost);
  }, [location.state]);

  const normalizePhone = (raw) => {
    if (!raw) return "";
    let p = raw.trim().replace(/[\s-\(\)]+/g, "");
    if (p.startsWith("+")) p = p.slice(1);
    if (/^07\d{8}$/.test(p)) return "254" + p.slice(1);
    if (/^2547\d{8}$/.test(p)) return p;
    if (/^7\d{8}$/.test(p)) return "254" + p;
    return p;
  };

  const validatePhone = (raw) => {
    if (!raw.trim()) {
      setPhoneError("Phone number is required");
      setIsPhoneValid(false);
      return false;
    }
    const normalized = normalizePhone(raw);
    if (!/^2547\d{8}$/.test(normalized)) {
      setPhoneError("Enter a valid Kenyan phone number.");
      setIsPhoneValid(false);
      return false;
    }
    setPhoneError("");
    setIsPhoneValid(true);
    return true;
  };

  useEffect(() => {
    validatePhone(phone);
  }, [phone]);

  // Handle countdown & redirect
  useEffect(() => {
    if (!startCountdown) return;

    if (countdown === 0) {
      navigate("/delivery", {
        state: {
          username: JSON.parse(localStorage.getItem("user"))?.username || "Customer",
          totalCost,
          cartItems,
          lat: -1.28,
          lng: 36.83
        }
      });
      return;
    }

    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);

  }, [countdown, startCountdown]);

  const submit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!validatePhone(phone)) return;

    setLoading(true);

    try {
      const normalizedPhone = normalizePhone(phone);
      const form = new FormData();
      form.append("phone", normalizedPhone);
      form.append("amount", totalCost || 0);

      const response = await axios.post(
        "https://aarondev.pythonanywhere.com/api/mpesa_payment",
        form
      );

      setSuccess(
        response.data.message || "Payment initiated. Check your phone."
      );

      // Only start redirect after success
      setStartCountdown(true);

      // Update user
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const updatedUser = { ...user };
        updatedUser.orderHistory = updatedUser.orderHistory || [];
        updatedUser.orderHistory.push({
          amount: totalCost,
          date: new Date().toLocaleString(),
          products: cartItems.map(i => i.product_name)
        });

        updatedUser.purchaseCount = (updatedUser.purchaseCount || 0) + 1;
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      localStorage.removeItem("cart");

    } catch (err) {
      setError("Payment failed or cancelled. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mpesa-page">
      <div className="mpesa-card">

        <img src="/images/mpesalogo.png" className="mpesa-logo" />

        <h2>Lipa na M-Pesa</h2>
        <p>Secure checkout</p>

        <form onSubmit={submit}>

          {loading && <Loader />}

          {success && (
            <div className="alert alert-success">
              {success}
              <br />
              Redirecting in <b>{countdown}</b> seconds…
            </div>
          )}

          {error && <div className="alert alert-danger">{error}</div>}

          <input
            type="text"
            className="form-control"
            value={`KES ${totalCost.toLocaleString()}`}
            readOnly
          />

          <br />

          <input
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-control"
          />

          <div className={phoneError ? "error" : "success"}>
            {phoneError || (isPhoneValid ? "✔ Phone looks good" : "")}
          </div>

          <br />

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={loading || !isPhoneValid || startCountdown}
          >
            {loading ? "Processing…" : "Complete Transaction"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Mpesapayment;
