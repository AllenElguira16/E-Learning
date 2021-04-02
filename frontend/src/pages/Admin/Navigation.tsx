import React, { useState } from "react";
import { 
  Navbar, 
  NavLink, 
  NavbarBrand, 
  NavbarToggler, 
  Collapse, 
  Nav, 
  UncontrolledDropdown,
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem, 
} from "reactstrap";

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
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
                Teacher
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <NavLink href="/teacher/list">Lists of Teachers</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/teacher/add">Add Teacher</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/teacher/edit">Edit Teacher</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/teacher/delete">Delete Teacher</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
                Students
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <NavLink href="/student/list">Lists of Students</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/student/add">Add Student</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/student/edit">Edit Student</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/student/delete">Delete Student</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  )
}

export default Navigation;
