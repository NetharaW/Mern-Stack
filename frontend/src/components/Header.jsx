import React from "react";
import { Link, useNavigate } from 'react-router-dom'; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'; 

const Header = () => {
  const navigate = useNavigate();
   const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };


  const loginButtonStyle = {
    backgroundColor: '#90EE90', 
    borderColor: '#90EE90',     
    color: 'white',             
    marginLeft: '10px',         
  };

  const loginButtonHoverStyle = {
    backgroundColor: '#7CFC00',
    borderColor: '#7CFC00',
  };


  const logoutButtonStyle = {
    backgroundColor: '#FFB6C1', 
    borderColor: '#FFB6C1',     
    color: 'white',             
    marginLeft: '10px',         
  };

  const logoutButtonHoverStyle = {
    backgroundColor: '#FF6347', 
    borderColor: '#FF6347',
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* Navbar.Brand using Link for client-side navigation */}
        <Navbar.Brand as={Link} to="/">ProdManager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Nav.Link components using Link for client-side navigation */}
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>

            {/* Conditional rendering for Login/Logout button */}
            {isLoggedIn ? (
              // If logged in, show Logout button
              <Button
                variant="" // Remove default Bootstrap variant to apply custom styles
                onClick={handleLogout}
                style={logoutButtonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = logoutButtonHoverStyle.backgroundColor;
                  e.currentTarget.style.borderColor = logoutButtonHoverStyle.borderColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = logoutButtonStyle.backgroundColor;
                  e.currentTarget.style.borderColor = logoutButtonStyle.borderColor;
                }}
              >
                Logout
              </Button>
            ) : (
              // If not logged in, show Login button
              <Nav.Link as={Link} to="/login">
                <Button
                  variant="" // Remove default Bootstrap variant to apply custom styles
                  style={loginButtonStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = loginButtonHoverStyle.backgroundColor;
                    e.currentTarget.style.borderColor = loginButtonHoverStyle.borderColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = loginButtonStyle.backgroundColor;
                    e.currentTarget.style.borderColor = loginButtonStyle.borderColor;
                  }}
                >
                  Login
                </Button>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
