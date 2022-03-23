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
import studentInfoApi from '../../api/studentInfoApi';
  

function Search() {
    
  
  async function fetchSearchData(_SEARCH_STRING_) {         
      let _SEARCH_DATA = [];
      var myAPI = new studentInfoApi;
      _SEARCH_DATA = await myAPI.fetchSearchData(_SEARCH_STRING_)
      console.log(_SEARCH_DATA)
 }

 async function fetchSearchData_LIKE_CLAUSES(_SEARCH_STRING_) {         
  let _SEARCH_DATA = [];
  var myAPI = new studentInfoApi;
  _SEARCH_DATA = await myAPI.fetchSearchData_LIKE_CLAUSES(_SEARCH_STRING_)
  console.log(_SEARCH_DATA)
}

     //only three values FirstName,LastName,School
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
                //Search By Student ID  - WORKS!!!
                 console.log('Search By Student ID')
                _SEARCH_STRING += "SELECT id,School,SchoolYear,LastName,FirstName,Current_Student FROM StudentEntryData WHERE Student_ID =";
                _SEARCH_STRING +="'";
                _SEARCH_STRING +=studentID.value;
                _SEARCH_STRING +="'";
                console.log(_SEARCH_STRING);
                fetchSearchData(_SEARCH_STRING);
                

            }
            else if (studentID.value == "" &&
                   FirstName.value != "" &&
                   LastName.value == "" &&
                   SchoolYear.value == "--Select--" &&
                   School.value == "--Select--")
            {
                //Search By First Name 
                //only three values FirstName,LastName,School
                console.log('Search By First Name')
                _SEARCH_STRING += FirstName.value
                _SEARCH_STRING +="|"
                _SEARCH_STRING +="-"
                _SEARCH_STRING +="|"
                _SEARCH_STRING +="-"
                _SEARCH_STRING +="|"
                _SEARCH_STRING +="FIRST_NAME"
                console.log("SEARCH_TYPE : FIRST_NAME");
                fetchSearchData_LIKE_CLAUSES(_SEARCH_STRING);
              
   
            }
            else if (studentID.value == "" &&
                   FirstName.value == "" &&
                   LastName.value != "" &&
                   SchoolYear.value == "--Select--" &&
                   School.value == "--Select--")

            {
                //Search By Last Name 
                console.log('Search By Last Name ')
                _SEARCH_STRING += "-"
                _SEARCH_STRING +="|"
                _SEARCH_STRING +=LastName.value
                _SEARCH_STRING +="|"
                _SEARCH_STRING +="-"
                _SEARCH_STRING +="|"
                _SEARCH_STRING +="LAST_NAME"
               
                console.log("SEARCH_TYPE : LAST_NAME");
                fetchSearchData_LIKE_CLAUSES(_SEARCH_STRING);
             

            }
            else if (studentID.value == "" &&
                   FirstName.value == "" &&
                   LastName.value == "" &&
                   SchoolYear.value != "--Select--" &&
                   School.value == "--Select--")
            {
                //Search By School Year - WORKS!!!
                console.log('Search By School Year ')
                _SEARCH_STRING += "SELECT id,School,SchoolYear,LastName,FirstName,Current_Student FROM StudentEntryData WHERE SchoolYear =";
                _SEARCH_STRING +="'";
                _SEARCH_STRING +=SchoolYear.value;
                _SEARCH_STRING +="'";
                console.log(_SEARCH_STRING);
                fetchSearchData(_SEARCH_STRING);

            }
            else if (studentID.value == "" &&
                   FirstName.value == "" &&
                   LastName.value == "" &&
                   SchoolYear.value == "--Select--" &&
                   School.value != "--Select--")
            {
                //Search By School Name  - WORKS!!!
                console.log('Search By School Name')
                _SEARCH_STRING += "SELECT id,School,SchoolYear,LastName,FirstName,Current_Student FROM StudentEntryData WHERE School =";
                _SEARCH_STRING +="'";
                _SEARCH_STRING +=School.value;
                _SEARCH_STRING +="'";
                console.log(_SEARCH_STRING);
                fetchSearchData(_SEARCH_STRING);

            }
            else if (studentID.value == "" &&
                   FirstName.value != "" &&
                   LastName.value != "" &&
                   SchoolYear.value == "--Select--" &&
                   School.value == "--Select--")
            {
                //Search By Last Name and First Name
                console.log('Search By Last Name and First Name')
                _SEARCH_STRING += FirstName.value
                _SEARCH_STRING +="|"
                _SEARCH_STRING +=LastName.value
                _SEARCH_STRING +="|"
                _SEARCH_STRING +="-"
                _SEARCH_STRING +="|"
                _SEARCH_STRING +="LAST_FIRST_NAME"
                console.log("SEARCH_TYPE : LAST_FIRST_NAME");
                fetchSearchData_LIKE_CLAUSES(_SEARCH_STRING);

            }
            else if (studentID.value == "" &&
                  FirstName.value != "" &&
                  LastName.value != "" &&
                  SchoolYear.value == "--Select--" &&
                  School.value != "--Select--")
            {
                //Search By Last Name and First Name and School Name
                console.log('Search By Last Name and First Name and School Name')
                _SEARCH_STRING += FirstName.value
                _SEARCH_STRING +="|"
                _SEARCH_STRING +=LastName.value
                _SEARCH_STRING +="|"
                _SEARCH_STRING +=School.value
                _SEARCH_STRING +="|"
                _SEARCH_STRING +="LAST_FIRST_NAME_SCHOOL"
                
                console.log("SEARCH_TYPE : LAST_FIRST_NAME_SCHOOL");
                fetchSearchData_LIKE_CLAUSES(_SEARCH_STRING);

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