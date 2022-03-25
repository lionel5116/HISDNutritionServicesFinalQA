import React, {Component} from 'react';
import {Button,
    Card,
    Container,
    Row,
    Col,Form,Tabs,Tab} from 'react-bootstrap';

function Administration() {
  return (
    <div>
    <main>
       <Container> 
          <h1>Administration</h1>   
           <br></br>         
                  <Form>
                      <Tabs>
                          <Tab eventKey="TempStudentIDS" title="Temp Student IDS">
                            <h2>Temp Student IDS</h2>
                          </Tab>

                          <Tab eventKey="ManageDropdownLists" title="Manage Dropdown Lists">
                              <h2>Activity Logs</h2>
                               <br></br>
                               <Row>
                                  <Col sm={6}>
                                      <select id="mySelect"
                                          multiple
                                          style={{ width: 150 }}>
                                          <option>football</option>
                                          <option>Basketball</option>
                                          <option>Hockey</option>
                                          <option>Swiming</option>
                                      </select>
                                  </Col>                           
                              </Row>
                          </Tab>

                          <Tab eventKey="ArchiveSchoolYear" title="Archive School Year">
                                <h2>Archive School Year</h2>
                          </Tab>

                          <Tab eventKey="ActivityLogs" title="Activity Logs">
                               <h2>Activity Logs</h2>
                          </Tab>
                      </Tabs>
                  </Form>
       </Container>
    </main>
    </div>
  )
}

export default Administration