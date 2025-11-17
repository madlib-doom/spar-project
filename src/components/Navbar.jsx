import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import './css/Navbar.css';

const AppNavbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Load user info from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    setUser(null); // reset state
    navigate("/");
  };

  return (
    <Navbar expand="md" bg="dark" variant="dark" className="shadow-sm mt-1">
      <Container>
        {/* Brand/Logo */}
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          Auto<span className="text-success">Mart</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="text-warning fw-bold">Home</Nav.Link>
            <Nav.Link as={Link} to="/addproducts" className="text-warning fw-bold">Sell</Nav.Link>
            <Nav.Link as={Link} to="/products" className="text-warning fw-bold">Shop</Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            {user ? (
              <>
                {/* Welcome message */}
                <span className="text-primary  me-3">Welcome, {user.user_name}!</span>
                
                {/* Profile / Logout Dropdown */}
                <NavDropdown
                  title="Account"
                  id="account-dropdown"
                  align="end"
                  className="account-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                {/* Show Signin/Signup if not logged in */}
                <NavDropdown
                  title="Account"
                  id="account-dropdown"
                  align="end"
                  className="account-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/Signin">Signin</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/Signup">Signup</NavDropdown.Item>
                </NavDropdown>
              </>
            )}

            {/* Cart Icon */}
            <Nav.Link as={Link} to="/cart">
              <img
                src="/images/cart.png"
                alt="Cart"
                style={{ width: '30px', height: '30px' }}
              />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
