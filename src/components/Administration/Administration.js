import React from 'react';
import {useState,useEffect} from 'react';
import {Button,
    Card,
    Container,
    Row,
    Col,Form,Tabs,Tab} from 'react-bootstrap';
import GenericMultipleSelect from '../ReusableAppComponents/GenericMultipleSelect';
import GenericDDSelect from '../ReusableAppComponents/GenericDDSelect'
    
let optionsForMultiselect = ['Dairy Products', 'Eggs as an Ingredient', 'Fluid Dairy Milk', 'Foods Processed in a Facility that Contains Nuts', 'Milk Protein', 'Peanuts', 'Seafood', 'Soy', 'Tree Nuts', 'Wheat/Gluten', 'Whole Egg ']
let optionsDDSelections = ['--Select--','Foods To Be Ommitted', 'Nutrition Supplement', 'Milk Substitute', 'Training Types'];
var itemTypeSelected = ''

function Administration() {

  const [itemTypeSelected, setitemTypeSelected] = useState('')
  //document.getElementById('selDDSelections').addEventListener("change", onDDChanged);
  
  const onDDChanged = () =>
  {
    var _ItemTypeelect = document.getElementById('selDDSelections');
    setitemTypeSelected(_ItemTypeelect.value) 
    fetchSearchDDListData(_ItemTypeelect.value)
  }
  
  async function fetchSearchDDListData(itemTypeSelected) {        
    let _DD_LIST_DATA = [];
    var myAPI = new studentInfoApi;
    _DD_LIST_DATA = await myAPI.fetchSearchDDListData(itemTypeSelected)
   
    var _DDSSelect = document.getElementById('selDDSelections'); 

  
   
    for(const key in _DD_LIST_DATA) {     
      _DDSSelect.options[_DDSSelect.options.length] = new Option(_DD_LIST_DATA[key]);
    }
 
}


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
                            <br></br>
                            <Row>
                                  <Col sm={4}>
                                  <label>Select List</label>
                                  <GenericDDSelect 
                                        onChange={() =>onDDChanged()}
                                        items = {optionsDDSelections}
                                        name = "selDDSelections"
                               />
                                  </Col>                           
                              </Row>
                               <hr />
                               <Row>
                                  <Col sm={6}>
                                     <GenericMultipleSelect 
                                        itemType = {itemTypeSelected}
                                        name = "selAdminDD"
                                        />
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