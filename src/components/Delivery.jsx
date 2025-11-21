import React from "react";
import { useLocation } from "react-router-dom";

const Delivery = () => {
  const { state } = useLocation();
  const username = state?.username || "Customer";
  const totalCost = state?.totalCost;
  const cartItems = state?.cartItems || [];
  const lat = state?.lat;
  const lng = state?.lng;

  const mapsLink = `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <div className="delivery-page">
      <div className="delivery-card">
        <h2>Order Ready for Pickup</h2>

        <p>
          Hello <b>{username}</b>, your payment was successful!
        </p>

        <p>
          Please come and pick your product(s) from our shop using the map below.
        </p>

        <h4>Your Order:</h4>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>{item.product_name}</li>
          ))}
        </ul>
        <p>
  <b>Total Paid:</b> KES {Number(totalCost ?? 0).toLocaleString()}
</p>


        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mt-3"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
};

export default Delivery;
