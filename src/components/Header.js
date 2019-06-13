import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const Header = () => (
  <header id="app-header">
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#/">Book Finder</Navbar.Brand>
      <Navbar.Toggle aria-controls="primary-navbar-nav" />
      <Navbar.Collapse id="primary-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#/favorites">Favorites</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </header>
)
export default Header;