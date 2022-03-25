import React from 'react';
import {useState,useEffect} from 'react';
import {Button,
    Card,
    Container,
    Row,
    Col,Form,Tabs,Tab} from 'react-bootstrap';
import GenericMultipleSelect from '../ReusableAppComponents/GenericMultipleSelect';
import GenericDDSelect from '../ReusableAppComponents/GenericDDSelect'
import { Pencil  } from 'react-bootstrap-icons';
    

let optionsDDSelections = ['--Select--','Foods To Be Ommitted', 'Nutrition Supplement', 'Milk Substitute', 'Training Types'];
var itemTypeSelected = ''
import studentInfoApi from '../../api/studentInfoApi';

function Administration() {
  const [tblSearchResults, setSearchResults] = useState([])
  
  const onDDChanged = () =>
  {
    var _ItemTypeelect = document.getElementById('selDDSelections');
    fetchSearchDDListData(_ItemTypeelect.value)
  }
  
  async function fetchSearchDDListData(itemTypeSelected) {        
    let _DD_LIST_DATA = [];
    var myAPI = new studentInfoApi;
    _DD_LIST_DATA = await myAPI.fetchSearchDDListData(itemTypeSelected)
    setSearchResults(_DD_LIST_DATA)
   
    /*  I CAN USE THIS CODE FOR SOME OTHER COMPOENT **
    var _DDSSelect = document.getElementById('selAdminDD'); 
    //clear list to add new ones
    _DDSSelect.innerHTML = "";
  
   
    for(const key in _DD_LIST_DATA) {     
      _DDSSelect.options[_DDSSelect.options.length] = new Option(_DD_LIST_DATA[key]);
    }
   */

}

const callModal =(item) =>{
  console.log("Item Selected:" + item)
}

function CellFormatter(cell, row) {
    
  return (<div><Button variant='warning' 
      onClick={() => callModal(row.ItemName)}
  ><Pencil /></Button></div>);
  

}

      const options = {
        exportCSVText: 'Export CSV',
        insertText: 'Insert',
        deleteText: 'Delete',
        saveText: 'Save',
        closeText: 'Close',
    
        sizePerPage: 25,
        sortOrder: 'desc',
        prePage: 'Prev',
        nextPage: 'Next',
        firstPage: 'First',
        lastPage: 'Last',
        paginationShowsTotal: renderShowsTotal
      };


      function renderShowsTotal(start, to, total) {
        return (
            <p style={{color: 'black'}}>
            From {start} to {to}. Total: {total}&nbsp;&nbsp;
            </p>
        );
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
                                        handleOnChange={onDDChanged}
                                        items = {optionsDDSelections}
                                        name = "selDDSelections"
                               />
                                  </Col>                           
                              </Row>
                               {/* I CAN USE THIS CODE FOR SOME OTHER COMPOENT **}
                               <Row>
                                  <Col sm={6}>
                                     <GenericMultipleSelect 
                                        name = "selAdminDD"
                                        />
                                  </Col>                           
                              </Row>
                              */}
                              <hr></hr>
                            <Row>
                              <Col sm={12}> 
                                <h2>Items</h2>
                                <BootstrapTable data={tblSearchResults} striped hover options={options}
                                  pagination           
                                >
                                  <TableHeaderColumn row="1" width="2%" editable={false} isKey dataField="ItemName" dataFormat={CellFormatter}></TableHeaderColumn>
                                  <TableHeaderColumn row="1" width="98%" dataField="ItemName">Item Name</TableHeaderColumn>
                                    
                                </BootstrapTable>
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