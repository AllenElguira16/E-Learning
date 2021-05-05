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
import { Route, Switch } from 'react-router-dom';

import AddStudent from './AddStudent';
import AddSubject from './AddSubjects';
import AddLesson from './AddLesson';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <header className="mb-4">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">E-Learning Web</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="flex-grow-1" navbar>
            <NavItem>
              <NavLink href="/admin/students?page=1">Students</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/admin/subjects?page=1">Subjects</NavLink>
            </NavItem>
            <NavItem className="ml-md-auto">
              <Switch>
                <Route path="/admin/students" component={AddStudent} />
                <Route path="/admin/subjects/:subject_id" component={AddLesson} />
                <Route path="/admin/subjects" component={AddSubject} />
              </Switch>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default Navigation;
