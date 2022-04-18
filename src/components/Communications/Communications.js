import React, {useState,useEffect} from 'react';
import SchoolListDropDown from '../ReusableAppComponents/SchoolListDropDown';
import {Button,
    Container,
    Row,
    Col,Form,Tabs,Tab} from 'react-bootstrap';
import GenericMultipleSelect from '../ReusableAppComponents/GenericMultipleSelect';
import studentInfoApi from '../../api/studentInfoApi';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { ArrowLeftSquare } from 'react-bootstrap-icons';

function Communications() {


    useEffect(() => {
        fetchSearchDDListData();
      },[]);


    async function fetchSearchDDListData() {        
        let itemTypeSelected = 'Training Types';
        let _DD_LIST_DATA = [];
        var myAPI = new studentInfoApi;
        _DD_LIST_DATA = await myAPI.fetchSearchDDListData(itemTypeSelected)
    
    
        /* I CAN USE THIS CODE FOR SOME OTHER COMPOENT **/
        var _DDSSelect = document.getElementById('ddTrainingList'); 
        //clear list to add new ones
        _DDSSelect.innerHTML = "";
      
        for(const key in _DD_LIST_DATA) {     
          _DDSSelect.options[_DDSSelect.options.length] = new Option(_DD_LIST_DATA[key].ItemName);
        }
    
    }

  return (
    <div>
     <main>
      <Container>
          <h1>Communications</h1>
          <br></br>
          <Form>
              <Tabs>
                 <Tab eventKey="SchoolTrainingNotes" title="School Training Notes">
                     <h2>School Training Notes</h2>
                    <Row>
                        <Col sm={1.75} style={{ paddingRight: 40 }}>
                            School
                        </Col>
                        <Col sm={2}>
                            <SchoolListDropDown />
                        </Col>
                    </Row>
                <br></br>
                 <Row>
                     <Col  sm={3}> 
                       <GenericMultipleSelect
                         name='ddTrainingList'
                       />
                     </Col>
                   
                     <Col sm={1}>
                      {/*<ArrowRightSquare style={{display:'block'}} />
                      <ArrowLeftSquare style={{display:'block'}}/> */}
                      <button
                        style={{display:'block'}}
                        id='btnTrainingType'
                        name='btnTrainingType'>
                        {'>'}
                      </button>
                      <button
                        style={{display:'block'}}
                        id='btnRemoveTrainingType'
                        name='btnRemoveTrainingType'>
                       {'<'}
                      </button>
                     </Col>

                     <Col  sm={3}> 
                       <GenericMultipleSelect
                         name='ddTrainingList_Selected'
                       />
                     </Col>
                 </Row>
                
                <br></br>
                    <Row className="mb-3">
                        <Form.Group className="mb-3">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control
                            as="textarea"
                            name='Notes'
                            id='Notes'
                        
                            style={{ height: '100px',width:1000 }}
                        />
                        </Form.Group>
                    </Row>
                </Tab>

                <Tab eventKey="StudentCommunication" title="Student Communication">
                  <h2>Student Communication</h2>
                </Tab>
              </Tabs>
          </Form>
      </Container>
     </main>
    </div>
  )
}

export default Communications