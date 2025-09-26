import React from 'react';
import { Link } from 'react-router-dom';

const Account = () => {
  return (
    <div className="container mt-5">
      <h2>Account Dashboard</h2>
      <p>Welcome to your account page. Use the links below to manage your profile and settings.</p>
      
      <ul>
        <li><Link to="/profile">View Profile</Link></li>
        <li><Link to="/Signin">Login</Link></li>
        <li><Link to="/Signup">Register</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </div>
  );
};

export default Account;
