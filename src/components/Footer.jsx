import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">

          {/* About Us */}
          <div className="col-md-4 mb-4">
            <Link to='/about' style={{
              textDecoration:'none',
             fontSize:"10px"
             
            }}>🚗 About Us</Link>
            <p>
              We are your trusted shop for high-quality automotive engines. 
              Whether you're repairing or upgrading, we've got the engine you need!
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5>🔗 Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/products" className="text-light text-decoration-none">Products</a></li>
              <li><a href="/Contactus" className="text-light text-decoration-none">Contact Us</a></li>
              <li><a href="/about" className="text-light text-decoration-none">About</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h5>📞 Contact Us</h5>
            <p><strong>Email:</strong> support@engineshop.com</p>
            <p><strong>Phone:</strong> +254 700 123 456</p>
            <p><strong>Location:</strong> Nairobi, Kenya</p>

            {/* Social Media Icons */}
            <div>
              <a href="#" className="text-light me-3"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-light me-3"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-light me-3"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-light"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-center mt-4 border-top pt-3">
          <p className="mb-0">&copy; {new Date().getFullYear()} EngineShop. Developed by Aaron Plimo.All rights reserved &trade; . 🚀</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
