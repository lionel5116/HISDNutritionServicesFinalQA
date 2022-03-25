import React from 'react';
import Nav from 'react-bootstrap/Nav';
import {Navbar} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Form,FormControl,NavDropdown} from 'react-bootstrap';


class NavbarMain extends React.Component {
  constructor(props){
    super(props);  
    
  };

 

  render() {
      return (
        <div id="MasterContainer">
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#/NutritionLogin">Nutrition Services</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">

                <NavDropdown title="Student Records" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#/Search">Search</NavDropdown.Item>
                  <NavDropdown.Item href="#/">Add</NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4"></NavDropdown.Item>
                </NavDropdown>
                
                <Nav.Link href="#">Notes</Nav.Link>
                <Nav.Link href="#">Administrtion</Nav.Link>
                <Nav.Link href="#/HISDReportsMenu">Reports</Nav.Link>
                </Nav>
             
            </Navbar.Collapse>
            </Navbar>
        </div>
      )
  }
}
export default NavbarMain;