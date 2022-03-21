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
            <Navbar.Brand href="/Home">Financial Assets</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                
                <NavDropdown title="Actions" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#">Add Institutions</NavDropdown.Item>
                    <NavDropdown.Item href="#">Expenses</NavDropdown.Item>
                    <NavDropdown.Item href="#">Stocks-Investments</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                
                <Nav.Link href="#link">About Us</Nav.Link>
                <Nav.Link href="#/Login">Login</Nav.Link>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
            </Navbar>
        </div>
      )
  }
}
export default NavbarMain;