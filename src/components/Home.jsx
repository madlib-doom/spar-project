import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-dark text-white">

      {/* Welcome Header */}
      <div className='home text-center py-4'>
        <h1 className="text-success">Welcome to our Automart Engines Shop</h1>
        <p>Your one-stop shop for quality automotive engines</p>
      </div>

      {/* Carousel Section */}
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div id="homepageCarousel" className="carousel slide carousel-fade rounded shadow" data-bs-ride="carousel">
              <div className="carousel-inner">

                {/* Slide 1 */}
                <div className="carousel-item active">
                  <div className="hero-slide text-white d-flex align-items-center justify-content-center"
                    style={{
                      backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/images/e1.jpeg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "300px",
                      borderRadius: "10px"
                    }}>
                    <div className="text-center px-3">
                      <h4 className="fw-bold">Premium Car Parts</h4>
                      <p>Your trusted source for high-performance engines.</p>
                      <a href="/products" className="btn btn-outline-light btn-sm mt-2">Shop Now</a>
                    </div>
                  </div>
                </div>

                {/* Slide 2 */}
                <div className="carousel-item">
                  <div className="hero-slide text-white d-flex align-items-center justify-content-center"
                    style={{
                      backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/images/e2.jpeg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "300px",
                      borderRadius: "10px"
                    }}>
                    <div className="text-center px-3">
                      <h4 className="fw-bold">Reliable Engines</h4>
                      <p>Tested, trusted, and built to last.</p>
                      <a href="/about" className="btn btn-outline-light btn-sm mt-2">Learn More</a>
                    </div>
                  </div>
                </div>

                {/* Slide 3 */}
                <div className="carousel-item">
                  <div className="hero-slide text-white d-flex align-items-center justify-content-center"
                    style={{
                      backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/images/e3.jpeg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "300px",
                      borderRadius: "10px"
                    }}>
                    <div className="text-center px-3">
                      <h4 className="fw-bold">Nationwide Delivery</h4>
                      <p>Fast and secure delivery across the country.</p>
                      <a href="/Contactus" className="btn btn-outline-light btn-sm mt-2">Contact Us</a>
                    </div>
                  </div>
                </div>

              </div>

              {/* Carousel Controls */}
              <button className="carousel-control-prev" type="button" data-bs-target="#homepageCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#homepageCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Auto Parts Grid Section */}
      <div className="container my-5">
        <h2 className="text-center mb-3">Find Auto Parts for Any Model</h2>
        <p className="text-center text-muted mb-4">Browse our most popular engine parts</p>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {/* Part 1 */}
          <div className="col">
      <Link to="/products" className="card-link">
        <div className="card h-100 bg-secondary text-white text-center border-0 shadow product-card">
          <img src="images/parts/wheel.png" className="card-img-top p-4" alt="Suspension" />
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
          <img src="images/parts/engine.png" className="card-img-top p-4" alt="Suspension" />
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

          {/* Add more parts as needed */}
        </div>
      </div>
    </div>
  );
};

export default Home;
