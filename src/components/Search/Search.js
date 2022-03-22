import React from 'react'
import {Button,
    Card,
    Container,
    Row,
    Col,
    Image} from 'react-bootstrap';
import BootStrapSelectForSearch from '../ReusableAppComponents/BootStrapSelectForSearch';
import SchoolListDropDown from '../ReusableAppComponents/SchoolListDropDown';
  

function Search() {
  return (
    <div>
    <main>
       <Container>  
           <h1>Search Student Records</h1>   
           <br></br>    
         <Row>
           <Col sm={1.75} style={{paddingRight:10}}>
               Student ID
           </Col>
           <Col sm={1.5}>
             <BootStrapSelectForSearch name ="selStudentID" />
           </Col>
           <Col sm={2}>
               <input type='text' id='txtStudentID' />
           </Col>
         </Row>
           <br></br>
         <Row>
           <Col sm={1.75} style={{paddingRight:10}}>
               Last Name
           </Col>
           <Col sm={1.5}>
             <BootStrapSelectForSearch name ="selLastName" />
           </Col>
           <Col sm={2}>
               <input type='text' id='txtLastName' />
           </Col>
         </Row>

         <br></br>
         <Row>
           <Col sm={1.75} style={{paddingRight:10}}>
               First Name
           </Col>
           <Col sm={1.5}>
             <BootStrapSelectForSearch name ="selFirstName" />
           </Col>
           <Col sm={2}>
               <input type='text' id='txtFirstName' />
           </Col>
         </Row>

         <br></br>
         <Row>
           <Col sm={1.75} style={{paddingRight:40}}>
               School
           </Col>
           <Col sm={1.5}>
               <BootStrapSelectForSearch />
           </Col>
           <Col sm={2}>
               <SchoolListDropDown />
           </Col>
         </Row>

       </Container>
    </main>
    </div>
  )
}

export default Search