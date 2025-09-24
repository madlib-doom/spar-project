import React from 'react';
import './css/about.css';

const Aboutus = () => {
  return (
    <section className="about-us">
      <div className="container">
        <h2>About Us</h2>
        <p>
          At <strong>Automart</strong>, we specialize in selling high-performance and reliable engines for a wide range of vehicles. 
          Whether you're looking for petrol, diesel, or hybrid engines, our inventory is stocked with only the best from trusted manufacturers.
        </p>

        <div className="about-details">
          <div className="detail">
            <h3>What We Offer</h3>
            <p>
              We provide top-quality new and used engines, thoroughly tested for performance, durability, and efficiency. Our team ensures 
              every engine meets strict quality standards before it reaches our customers.
            </p>
          </div>

          <div className="detail">
            <h3>Our Track Record</h3>
            <p>
              Over the past year alone, we’ve successfully sold and delivered over <strong>3,000 engines</strong> across the country, 
              earning the trust of thousands of satisfied clients in both retail and wholesale markets.
            </p>
          </div>

          <div className="detail">
            <h3>Why Choose Us?</h3>
            <ul>
              <li>Certified and performance-tested engines</li>
              <li>Competitive pricing for all engine types</li>
              <li>Nationwide shipping and fast delivery</li>
              <li>Expert customer support and after-sales service</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;
