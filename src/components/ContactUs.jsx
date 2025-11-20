import React, { useState } from "react";

const ContactUs = () => {
  const [tab, setTab] = useState("contact"); // "contact" or "visit"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

 
  const lat =  -1.28;
  const lng = 36.83;
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTimeout(() => {
      setStatus("Thank you for contacting us! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4">Get in Touch or Visit Us</h2>

      {/* Tabs */}
      <div className="d-flex justify-content-center mb-4 gap-2">
        <button
          className={`btn ${tab === "contact" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setTab("contact")}
        >
          Contact Form
        </button>

        <button
          className={`btn ${tab === "visit" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setTab("visit")}
        >
          Visit Us / Map
        </button>
      </div>

      <div className="card shadow-sm p-4">
        <div className="row">
          {/* Left Section */}
          <div className="col-md-6">
            {tab === "contact" ? (
              <div>
                <h4>Contact Us</h4>
                {status && <div className="alert alert-success">{status}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Your Message</label>
                    <textarea
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className="form-control"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Send Message
                  </button>
                </form>
              </div>
            ) : (
              <div className="visit-shop">
              <h4 className="visit-title">Visit Our Shop — Riverside, Nairobi</h4>
            
              <p className="visit-subtext">
                Below is an approximate location in Riverside, Nairobi for easy navigation.
              </p>
            
              <ul className="visit-list">
                <li><strong>Address:</strong> Riverside, Nairobi (Approximate)</li>
                <li><strong>Phone:</strong> +254 700 000 000</li>
                <li><strong>Hours:</strong> Mon–Fri 9:00–18:00, Sat 10:00–16:00</li>
              </ul>
            
              <a
                href={mapsLink}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-success visit-btn"
              >
                Open in Google Maps
              </a>
            </div>
            
            )}
          </div>

          {/* Right Section (Map) */}
          <div className="col-md-6">
            <div style={{ width: "100%", height: "100%", minHeight: "300px" }}>
              <iframe
                title="map"
                src={mapSrc}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "0",
                  borderRadius: "5px",
                }}
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
