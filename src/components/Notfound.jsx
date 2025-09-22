import React from 'react';
import { Link } from 'react-router-dom';
import './css/notfound.css'; // Import the external CSS

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-heading">404 - Page Not Found</h1>
      <p className="notfound-text">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="notfound-link">Go Back Home</Link>
    </div>
  );
};

export default NotFound