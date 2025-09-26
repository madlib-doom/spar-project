import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import './css/Navbar.css'; // 👈 import your custom CSS

const AppNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/signin');
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
            {/* Account Dropdown */}
            <NavDropdown
              title={<span className="account-link">Account</span>}
              id="account-dropdown"
              align="end"
              className="account-dropdown"
            >
              <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Signin">Signin</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Signup">Signup</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>

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
