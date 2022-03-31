import React from 'react';
import {useState,useEffect} from 'react';
import {Button,
    Card,
    Container,
    Row,
    Col,Form,Tabs,Tab,Modal} from 'react-bootstrap';
import GenericMultipleSelect from '../ReusableAppComponents/GenericMultipleSelect';
import GenericDDSelect from '../ReusableAppComponents/GenericDDSelect'
import { Pencil  } from 'react-bootstrap-icons';
    

let optionsDDSelections = ['--Select--','Foods To Be Ommitted', 'Nutrition Supplement', 'Milk Substitute', 'Training Types'];
var itemTypeSelected = ''
import studentInfoApi from '../../api/studentInfoApi';

function Administration() {
  const [tblSearchResults, setSearchResults] = useState([])
  const [show, setShow] = useState(false);
  const [_nSequenceID,setSequenceID]  = useState(0)
  const [_ItemName,setItemName]  = useState("")
  
  const onDDChanged = () =>
  {
    var _ItemTypeSelect = document.getElementById('selDDSelections');
    fetchSearchDDListData(_ItemTypeSelect.value)
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
      onClick={()=>showRowDetailInfo(row.ItemName)}
  ><Pencil /></Button></div>);
  

}

function showRowDetailInfo(_name){
  console.log("Data from row from an external function",_name)
  //setSequenceID(_id);
  setItemName(_name)
  setShow(true)
}

async function updateDDItem(){
  var _ItemTypeSelect = document.getElementById('selDDSelections');
  var _ItemNameNew = document.getElementById('newValue');
  var oldValue = _ItemName
  var DDType = '';
  //Foods To Be Ommitted', 'Nutrition Supplement', 'Milk Substitute', 'Training Types

  switch (_ItemTypeelect) {
    case 'Foods To Be Ommitted':
      DDType = 'FTBO'
      break;
    case 'Nutrition Supplement':
      DDType = 'NUTR_SUB'
      break;
    case 'Milk Substitute':
      DDType = 'MMILK_SUB'
      break;
      case 'Training Types':
        DDType = 'TRAINING'
        break;
    default:
      break;
  }

  var argument = oldValue;
  argument += "|";
  argument += _ItemNameNew
  argument += "|";
  argument += DDType

  var myAPI = new studentInfoApi;
  await myAPI.fetchSearchDDListData(itemTypeSelected)
    
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
                              <Row>
                                <Col sm={12}>
                                  <Modal
                                    show={show}
                                    size="lg"
                                    aria-labelledby="contained-modal-title-vcenter"
                                    centered
                                  >
                                    <Modal.Header closeButton>
                                      <Modal.Title id="contained-modal-title-vcenter">
                                        Modify Item
                                      </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                      <h4>Edit Item</h4>
                                      <Row>
                                        <Col sm={2}>
                                          <label>Item</label>
                                        </Col>

                                        <Col sm={4}>
                                          <input value={_ItemName}>
                                          </input>
                                        </Col>

                                        <Col sm={2}>
                                          <label>New Value</label>
                                        </Col>

                                        <Col sm={4}>
                                          <input id='newValue'>
                                          </input>
                                        </Col>
                                      </Row>
                                    </Modal.Body>
                                    <Modal.Footer>
                                      <Button variant="warning" onClick={() => setShow(false)}>Submit</Button>
                                      <Button onClick={() => setShow(false)}>Close</Button>
                                    </Modal.Footer>
                                  </Modal>
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