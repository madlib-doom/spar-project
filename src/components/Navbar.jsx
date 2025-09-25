import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-md navbar-light bg-dark shadow-sm mt-1'>
      {/* Navbar logo/brand */}
      <Link to="/" className='navbar-brand fw-bold m-2'>
        Auto<span className='text-success'>Mart</span>
      </Link>

      {/* Toggle button */}
      <button
        className='navbar-toggler'
        type='button'
        data-bs-toggle="collapse"
        data-bs-target="#navbarcontents"
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      {/* Navbar links */}
      <div id="navbarcontents" className='collapse navbar-collapse'>
        <ul className='navbar-nav me-auto'>
          <li className='nav-item'>
            <b><Link to="/" className='nav-link text-warning'>Home</Link></b>
          </li>
          <li className='nav-item'>
            <b><Link to="/addproducts" className='nav-link text-warning'>Sell</Link></b>
          </li>
          <li className='nav-item'>
            <b><Link to="/products" className='nav-link text-warning'>Shop</Link></b>
          </li>
        </ul>

        {/* Right-aligned links */}
        <ul className='navbar-nav ms-auto'>
          <li className='nav-item'>
            <b><Link to="/signin" className='nav-link text-warning'>Signin</Link></b>
          </li>
          <li className='nav-item'>
            <b><Link to="/signup" className='nav-link text-warning'>Signup</Link></b>
          </li>
          <li className='nav-item'>
            <b><Link to="/about" className='nav-link text-warning'>About us</Link></b>
          </li>

          {/* 🛒 Cart icon link */}
          <li className='nav-item'>
            <Link to="/cart" className='nav-link'>
              <img
                src="/images/cart.png" // <-- Adjust this path based on where your image is located
                alt="Cart"
                style={{ width: '30px', height: '30px' }}
              />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
