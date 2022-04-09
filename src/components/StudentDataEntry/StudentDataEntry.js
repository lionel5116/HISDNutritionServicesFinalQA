import React from 'react'
import {useState} from 'react';
import {Button,
    Container,
    Row,
    Col,Form,Tabs,Tab} from 'react-bootstrap';
import GenericDDSelect from '../ReusableAppComponents/GenericDDSelect'
import { Pencil  } from 'react-bootstrap-icons';

//react bootstrap table next
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

//for modal
import GenericModal from '../GenericModal/GenericModal';
import { useEffect } from 'react';


//location
//https://www.codegrepper.com/code-examples/javascript/history.push+with+params
import { useLocation } from 'react-router-dom';



function StudentDataEntry() {
    const location  = useLocation();
    const [storeFullNameFromSearch, setFullNameFromSearch] = useState([])
    const [student, setStudent] = useState({});

    async function AddStudentDataRecord() {
      //var myAPI = new studentInfoApi;
      //var _response = await myAPI.AddStudentComplexDataRecord(student)
    }

    const searchStudent =()=>
    {

    }

    const generateStudentID =()=>
    {
      var studentIDField = document.getElementById('Student_ID');
      studentIDField.value = 'STID_' + generateUUIDUsingMathRandom().substring(0,12);
    }

    

  function generateUUIDUsingMathRandom() { 
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
  
    function handleChange (e){
      const { name, value } = e.target;
     
     
      switch (name) {
          //TAB Student Information
          case 'Student_ID':
              setStudent({ ...student, Student_ID: value });

              break;
          case 'Current_Student':

              setStudent({ ...student, Current_Student: value });
              break;
          case 'School':
              setStudent({ ...student, School: value });

              break;
          case 'FirstName':
              setStudent({ ...student, FirstName: value });

              break;
          case 'LastName':
              setStudent({ ...student, LastName: value });

              break;

          case 'Birthday':
              setStudent({ ...student, Birthday: value });

              break;

          case 'SchoolYear':
              setStudent({ ...student, SchoolYear: value });

              break;

          case 'Date_Received':
              setStudent({ ...student, Date_Received: value });

              break;


          case 'Notes':
              setStudent({ ...student, Notes: value });

              break;
          
          //TAB Dietary Accommodations
        case 'Disabled':
          setStudent({ ...student, Disabled: value });

          break;

        case 'LTA':
          setStudent({ ...student, LTA: value });

          break;

        case 'NeedsF_U':
          setStudent({ ...student, NeedsF_U: value });

          break;

        case 'Medical_Condition':
          setStudent({ ...student, Medical_Condition: value });

          break;
              default:
              break;
      }

     // console.log(user)
    }
   

    useEffect(() => {
        const _queryID = location.search;
        if(_queryID != '')
        {
            console.log("Record ID from search " + _queryID.substring(_queryID.indexOf('=') + 1));
            setFullNameFromSearch(location.fullName)
            console.log("Full Name from search " + location.fullName);
        }
        
     }, [location]);

  return (
    <div>
      <main>
        <Container>
        <h1>Student Record</h1> 
          <Form>
              <Tabs>
              <Tab eventKey="StudentInformation" title="Student Information">
                  <h2><label>{storeFullNameFromSearch}</label></h2>
                <Row className="mb-3">
                  <Form.Group as={Col} >
                    <Form.Label>Student ID*</Form.Label>
                    <Form.Control
                      type="text"
                      name='Student_ID'
                      id='Student_ID'
                      onChange={handleChange}

                    />
                  </Form.Group>

                  <Form.Group as={Col} >

                    <Button variant="primary" type="button"
                      onClick={() => searchStudent()}
                      style={{ marginTop: 30 }}>
                      Search Student
                    </Button>

                    <Button variant="warning" type="button"
                      onClick={() => generateStudentID()}
                      style={{ marginLeft: 10, marginTop: 30 }}>
                      Generate StudentID
                    </Button>

                  </Form.Group>

                  <Form.Group as={Col} >

                    <Form.Label style={{ marginTop: 30 }}>Current Student</Form.Label>
                    <input
                      type="checkbox"
                      name='Current_Student'
                      id='Current_Student'
                      onChange={handleChange}
                      style={{ marginLeft: 10, marginTop: 30 }} />
                  </Form.Group>
                </Row>
               
                <Row className="mb-3">
                       <Form.Group as={Col} >
                            <Form.Label>School</Form.Label>
                            <Form.Control as="select"
                                name='School'
                                id='School'
                                onChange={handleChange}
                                style={{width:500}}
                            >
                                <option></option>
                                <option>Almeda ES</option>
                                <option>Browning ES</option>
                                <option>Clifton MS</option>
                                <option>Gallegos ES</option>
                            </Form.Control>
                        </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name='FirstName'
                      id='FirstName'
                      onChange={handleChange}

                    />
                  </Form.Group>

                  <Form.Group as={Col} >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name='LastName'
                      id='LastName'
                      onChange={handleChange}

                    />
                  </Form.Group>


                  <Form.Group className="mb-3">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type="date"
                      name='Birthday'
                      id='Birthday'
                      onChange={handleChange}
                      style={{ width: 200 }} />
                  </Form.Group>

                  <Form.Group as={Col} >
                    <Form.Label>School Year</Form.Label>
                    <Form.Control as="select"
                      name='SchoolYear'
                      id='SchoolYear'
                      onChange={handleChange}
                      style={{ width: 100 }}
                    >
                      <option></option>
                      <option>2022</option>
                      <option>2021</option>

                    </Form.Control>
                  </Form.Group>

                </Row>
  
                <Row className="mb-3">

                <Form.Group className="mb-3">
                    <Form.Label>Date Received</Form.Label>
                    <Form.Control
                      type="date"
                      name='Date_Received'
                      id='Date_Received'
                      onChange={handleChange}
                      style={{ width: 200 }} />
                  </Form.Group>

                  
                  <Form.Group className="mb-3">
                    <Form.Label style={{ marginLeft:50}}>Date Processed</Form.Label>
                    <Form.Control
                      type="date"
                      name='Date_Processed'
                      id='Date_Processed'
                      onChange={handleChange}
                      style={{ width: 200 ,marginLeft:50}} />
                  </Form.Group>
                </Row>
               
                <Row className="mb-3">
                <Form.Group className="mb-3">
                    <Form.Label>Processing Notes</Form.Label>
                    <Form.Control
                    as="textarea"
                    name='Notes'
                    id='Notes'
                    onChange={handleChange}
                   
                    style={{ height: '100px',width:1000 }}
                   />
                  </Form.Group>

                </Row>


               </Tab>

               <Tab eventKey="DietaryAccommodations" title="Dietary Accommodations">

               <Row className="mb-3"> 

               <Form.Group as={Col} >

                    <Form.Label style={{ marginTop: 30 }}>Disabled</Form.Label>
                    <input
                      type="checkbox"
                      name='Disabled'
                      id='Disabled'
                      onChange={handleChange}
                      style={{ marginLeft: 10,marginTop: 30 }} />
                  </Form.Group>

                  <Form.Group as={Col} >

                    <Form.Label style={{ marginTop: 30 }}>LTA</Form.Label>
                    <input
                      type="checkbox"
                      name='LTA'
                      id='LTA'
                      onChange={handleChange}
                      style={{ marginLeft: 10,marginTop: 30 }} />
                  </Form.Group>

                  <Form.Group as={Col} >

                    <Form.Label style={{ marginTop: 30 }}>Needs F/U</Form.Label>
                    <input
                      type="checkbox"
                      name='NeedsF_U'
                      id='NeedsF_U'
                      onChange={handleChange}
                      style={{ marginLeft: 10, marginTop: 30 }} />
                  </Form.Group>

               </Row>

               <Row className="mb-3"> 
               <Form.Group className="mb-3">
                    <Form.Label>Medical Diagnosis</Form.Label>
                    <Form.Control
                    as="textarea"
                    name='Medical_Condition'
                    id='Medical_Condition'
                    onChange={handleChange}
                   
                    style={{ height: '100px',width:1000 }}
                   />
                  </Form.Group>
               </Row>

               </Tab>

               <Tab eventKey="Documentation" title="Documentation">
                           
               </Tab>

               <Tab eventKey="Training" title="Training">
                           
                </Tab>

                <Tab eventKey="Communication" title="Communication">
                           
                </Tab>

              </Tabs>
          </Form>
        </Container>
      </main>

    </div>
  )
}

export default StudentDataEntry
