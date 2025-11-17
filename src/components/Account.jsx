import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Account = () => {
  const navigate=useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart")
    navigate("/");
  };
  
  return (
    <div className="container mt-5">
      <h2>Account Dashboard</h2>
      <p>Welcome to your account page. Use the links below to manage your profile and settings.</p>
      
      <ul>
        <li><Link to="/profile">View Profile</Link></li>
        <li><Link to="/Signin">Login</Link></li>
        <li><Link to="/Signup">Register</Link></li>
       
        <button onClick={handleLogout}>Logout</button>

      </ul>
    </div>
  );
};

export default Account;
