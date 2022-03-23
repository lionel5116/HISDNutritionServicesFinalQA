import React from 'react'
import {Button,
    Card,
    Container,
    Row,
    Col,
    Image} from 'react-bootstrap';
import BootStrapSelectForSearch from '../ReusableAppComponents/BootStrapSelectForSearch';
import SchoolListDropDown from '../ReusableAppComponents/SchoolListDropDown';
import SchoolYearDropDown from '../ReusableAppComponents/SchoolYearDropDown';
  

function Search() {


     const searchMixed =()=>
     {
          
           var _SEARCH_STRING = '';
           
           var studentID = document.getElementById('txtStudentID');
           var FirstName = document.getElementById('txtFirstName');
           var LastName = document.getElementById('txtLastName');
           var SchoolYear = document.getElementById('ddSchoolYears');
           var School = document.getElementById('ddSchoolListings');

            if (studentID.value != "" &&
               FirstName.value == "" &&
               LastName.value == "" &&
               SchoolYear.value == "--Select--" &&
               School.value == "--Select--")
            {
                //Search By Student ID
                console.log('Search By Student ID')
          

            }
            else if (studentID.value == "" &&
                   FirstName.value != "" &&
                   LastName.value == "" &&
                   SchoolYear.value == "--Select--" &&
                   School.value == "--Select--")
            {
                //Search By First Name 
                console.log('Search By First Name')
              
   
            }
            else if (studentID.value == "" &&
                   FirstName.value == "" &&
                   LastName.value != "" &&
                   SchoolYear.value == "--Select--" &&
                   School.value == "--Select--")

            {
                //Search By Last Name 
                console.log('Search By Last Name ')
             

            }
            else if (studentID.value == "" &&
                   FirstName.value == "" &&
                   LastName.value == "" &&
                   SchoolYear.value != "--Select--" &&
                   School.value == "--Select--")
            {
                //Search By School Year
                console.log('Search By School Year ')

            }
            else if (studentID.value == "" &&
                   FirstName.value == "" &&
                   LastName.value == "" &&
                   SchoolYear.value == "--Select--" &&
                   School.value != "--Select--")
            {
                //Search By School Name
                console.log('Search By School Name')

            }
            else if (studentID.value == "" &&
                   FirstName.value != "" &&
                   LastName.value != "" &&
                   SchoolYear.value == "--Select--" &&
                   School.value == "--Select--")
            {
                //Search By Last Name and First Name
                console.log('Search By Last Name and First Name')

            }
            else if (studentID.value == "" &&
                  FirstName.value != "" &&
                  LastName.value != "" &&
                  SchoolYear.value == "--Select--" &&
                  School.value != "--Select--")
            {
                //Search By Last Name and First Name and School Name
                console.log('Search By Last Name and First Name and School Name')
            }
        }


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

         <br></br>
         <Row>
           <Col sm={1.75} style={{paddingRight:8}}>
               School Year
           </Col>
           <Col sm={1.5}>
               <BootStrapSelectForSearch />
           </Col>
           <Col sm={2}>
              <SchoolYearDropDown />
           </Col>
         </Row>

         <br></br>
         <Row>
           <Col sm={12}>
             <Button variant="outline-primary" onClick={() => searchMixed()}>Search</Button>
           </Col>
         </Row>

       </Container>
    </main>
    </div>
  )
}

export default Search