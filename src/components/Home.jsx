import React from 'react';
import { Link } from 'react-router-dom';
import Chatbot from './Chatbot'; // import the chatbot component

const Home = () => {
  return (
    <div className="bg-dark text-white">

    
<div
  className="home-hero d-flex flex-column justify-content-center align-items-center text-center"
  style={{
    backgroundImage: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('/images/banner.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "60vh",
    position: "relative",
    color: "white",
  }}
>
  {/* Text content */}
  <div style={{ zIndex: 2, padding: "0 20px", textShadow: "2px 2px 6px rgba(0,0,0,0.5)" }}>
    <h1 className="display-4 fw-bold">Welcome to our Automart Engines Shop</h1>
    <p className="lead">Your one-stop shop for quality automotive engines</p>
    <Link to="/products" className="btn btn-warning btn-lg mt-3">
      Browse Products
    </Link>
  </div>
</div>



      {/* Carousel Section */}
    
      {/* Auto Parts Grid Section */}
      <div className="container my-5">
        <h2 className="text-center mb-3">Find Auto Parts for Any Model</h2>
        <p className="text-center text-muted mb-4">Browse our most popular engine parts</p>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {/* Part 1 */}
          <div className="col">
            <Link to="/products" className="card-link">
              <div className="card h-100 bg-secondary text-white text-center border-0 shadow product-card">
                <img src="images/parts/wheel.png" className="card-img-top p-4" alt="Wheels" />
                <div className="card-body">
                  <h5 className="card-title">Wheels</h5>
                </div>
              </div>
            </Link>
          </div>

          {/* Part 2 */}
          <div className="col">
            <Link to="/products" className="card-link">
              <div className="card h-100 bg-secondary text-white text-center border-0 shadow product-card">
                <img src="images/parts/engine.png" className="card-img-top p-4" alt="Engine" />
                <div className="card-body">
                  <h5 className="card-title">Engine</h5>
                </div>
              </div>
            </Link>
          </div>

          {/* Part 3 */}
          <div className="col">
            <Link to="/products" className="card-link">
              <div className="card h-100 bg-secondary text-white text-center border-0 shadow product-card">
                <img src="images/parts/suspension.png" className="card-img-top p-4" alt="Suspension" />
                <div className="card-body">
                  <h5 className="card-title">Suspension</h5>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Sticky Chatbot */}
      <Chatbot />

    </div>
  );
};

export default Home;
