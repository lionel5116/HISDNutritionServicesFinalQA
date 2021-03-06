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
                <Nav.Link href="#/NutritionLogin">Home</Nav.Link>
                <NavDropdown title="Student Records" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#/Search">Search</NavDropdown.Item>
                  <NavDropdown.Item href="#/StudentDataEntry">Add</NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4"></NavDropdown.Item>
                </NavDropdown>
                
                <Nav.Link href="#/Communications">Communications</Nav.Link>
                <Nav.Link href="#/HISDReportsMenu">Reports</Nav.Link>
                <Nav.Link href="#/Administration">Administration</Nav.Link>
                
                </Nav>
             
            </Navbar.Collapse>
            </Navbar>
        </div>
      )
  }
}
export default NavbarMain;