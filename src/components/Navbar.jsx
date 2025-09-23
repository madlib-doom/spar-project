import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
<nav className=' navbar navbar-expand-md navbra-light bg-info shadow-sm mt-1 '>
    {/* Below is the navbar logo/brand */}
    <Link to="/" className='"navbar-brand fw-bold m-2'>Auto<span className='text-success'>Mart</span>
    </Link>
    {/* Below is the toggle button  */}
    <button className='navbar-toggler'
     type='button' 
    data-bs-toggle="collapse"
    data-bs-target="#navbarcontents">
        <span className='navbar-toggler-icon'></span>
    </button>
    {/* Below is the div that contains all the links to the different pages */}
    <div id="navbarcontents" className='collapse navbar-collapse'>
        <ul className='navbar-nav me-auto'>
            <li className='nav-item'>
            <b><Link to ="/" className='nav-link'>Home</Link></b>
            </li>
            <li className='nav-item'>
            <b><Link to ="/addproducts" className='nav-link'>Sell</Link></b>
            </li>

        </ul>
        {/* below unordeerd list contains links alligne d fro rigth -hand -side */}
        <ul className='navbar-nav ms-auto'>
        <li className='nav-item'>
            <b><Link to ="/signin" className='nav-link'>Signin</Link></b>

            </li>
            <li className='nav-item'>
            <b><Link to ="/signup" className='nav-link'>Signup</Link></b>
            </li>
            <li className='nav-item'>
            <b><Link to ="/about" className='nav-link'>About us</Link></b>
            </li>

        </ul>
    </div>
</nav>

    
 
  )
}

export default Navbar