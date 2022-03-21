import React, {Component} from 'react';
import { render } from 'react-dom';
import { BrowserRouter,Route,HashRouter } from 'react-router-dom'
import {Form,FormControl,NavDropdown,Container} from 'react-bootstrap';
import NavbarMain from './NavbarMain/NavbarMain';
import Login from './Login/Login';
import StudentInformation from './StudentInformation/StudentInformation';
import './App.css';

function App() {
    return (
      <div id="MasterContainer">                    
        <HashRouter>
          <NavbarMain />
          <Route
            exact
            path='/'
            component={Login}
          />
          <Route
            exact
            path='/Login'
            component={Login}
          />


            <Route
            exact
            path='/StudentInformation'
            component={StudentInformation}
          />
        </HashRouter>
      </div>     
    );
  }
  
  export default App;
  