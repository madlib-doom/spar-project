// src/components/Loader.jsx
import React from 'react';
import './css/loader.css'; // We'll create this CSS file next

const Loader = () => {
  return (
 
      <div className="custom-loader-wrapper">
    <div className="custom-circle"></div>
    <div className="custom-circle"></div>
    <div className="custom-circle"></div>
    <div className="custom-shadow"></div>
    <div className="custom-shadow"></div>
    <div className="custom-shadow"></div>
  </div>
    
  );
};

export default Loader;
