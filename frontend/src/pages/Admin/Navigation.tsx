import React, { useState } from 'react';
import {
  Navbar,
  NavLink,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
} from 'reactstrap';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <header>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">E-Learning Web</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/admin/students?page=1">Students</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/admin/lessons?page=1">Lessons</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default Navigation;
