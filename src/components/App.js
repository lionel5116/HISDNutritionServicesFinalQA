import React, {Component} from 'react';
import { render } from 'react-dom';
import { BrowserRouter,Route,HashRouter } from 'react-router-dom'
import {Form,FormControl,NavDropdown,Container} from 'react-bootstrap';
import NavbarMain from './NavbarMain/NavbarMain';
import Login from './Login/Login';
//import StudentInformationReport from './Reports/StudentInformationReport';
import StudentInformationReportNew from './Reports/StudentInformationReportNew';
//import StudentInformationTempIDSReport from './Reports/StudentInformationTempIDSReport'
import StudentInformationTempIDSReportNew from './Reports/StudentInformationTempIDSReportNew';
import './App.css';
import NutritionLogin from './Login/NutritionLogin';
import HISDReportsMenu from './Reports/HISDReportsMenu';
import Search from './Search/Search';
import Administration from './Administration/Administration';
import StudentDataEntry from './StudentDataEntry/StudentDataEntry';
import Communications from './Communications/Communications';
import StudentTrainingNotesReport from './Reports/StudentTrainingNotesReport';


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
            component={StudentInformationReportNew}
          />
           <Route
            exact
            path='/StudentInformationTempIDSReport'
            component={StudentInformationTempIDSReportNew}
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

          <Route
            exact
            path='/StudentDataEntry'
            component={StudentDataEntry}
          />
         
         <Route
            exact
            path='/Communications'
            component={Communications}
          />
           <Route
            exact
            path='/StudentTrainingNotesReport'
            component={StudentTrainingNotesReport}
          />
         
        </HashRouter>
      </div>     
    );
  }
  
  export default App;
  