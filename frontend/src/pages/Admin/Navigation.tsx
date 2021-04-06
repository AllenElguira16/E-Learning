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
                Lessons
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <NavLink href="/admin/lesson/list">Lists of Lessons</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/admin/lesson/upload">Upload Lessons</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
                Students
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <NavLink href="/admin/student/list">Lists of Students</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/admin/student/add">Add Student</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/admin/student/edit">Edit Student</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/admin/student/delete">Delete Student</NavLink>
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
