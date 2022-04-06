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
                  <Row>
                    <Col sm={12}>

                     </Col>
                    </Row> 
               </Tab>

               <Tab eventKey="DietaryAccommodations" title="Dietary Accommodations">
                           
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
