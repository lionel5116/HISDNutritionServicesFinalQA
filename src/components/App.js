import React, {Component} from 'react';
import { render } from 'react-dom';
import { BrowserRouter,Route,HashRouter } from 'react-router-dom'
import {Form,FormControl,NavDropdown,Container} from 'react-bootstrap';
import NavbarMain from './NavbarMain/NavbarMain';
import Login from './Login/Login';
import StudentInformationReport from './Reports/StudentInformationReport';
import StudentInformationTempIDSReport from './Reports/StudentInformationTempIDSReport'
import './App.css';
import NutritionLogin from './Login/NutritionLogin';
import HISDReportsMenu from './Reports/HISDReportsMenu';
import Search from './Search/Search';
import Administration from './Administration/Administration';

function App() {
    return (
      <div id="MasterContainer">                    
        <HashRouter>
          <NavbarMain />
        <Route 
            path='/NutritionLogin'
            exact component={NutritionLogin}
          />  
        
         <Route
            
            path='/'
            exact component={NutritionLogin}
          />  
        <Route
            exact
            path='/HISDReportsMenu'
            component={HISDReportsMenu}
          />

          <Route
            exact
            path='/StudentInformationReport'
            component={StudentInformationReport}
          />
           <Route
            exact
            path='/StudentInformationTempIDSReport'
            component={StudentInformationTempIDSReport}
          />

          <Route
            exact
            path='/Search'
            component={Search}
          />

       <Route
            exact
            path='/Administration'
            component={Administration}
          />
         
        </HashRouter>
      </div>     
    );
  }
  
  export default App;
  