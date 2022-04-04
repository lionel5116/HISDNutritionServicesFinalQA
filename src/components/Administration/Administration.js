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

//react bootstrap table next
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
    

let optionsDDSelections = ['--Select--','Foods To Be Ommitted', 'Nutrition Supplement', 'Milk Substitute', 'Training Types'];
var itemTypeSelected = ''
import studentInfoApi from '../../api/studentInfoApi';

function Administration() {
  const [tblSearchResults, setSearchResults] = useState([])
  const [show, setShow] = useState(false);
  const [_nSequenceID,setSequenceID]  = useState(0)
  const [_ItemName,setItemName]  = useState("")
  const [_ItemNameSelected,setItemNameSelected]  = useState("")
  
  const onDDChanged = () =>
  {
    var _ItemTypeSelect = document.getElementById('selDDSelections');

    fetchSearchDDListData(_ItemTypeSelect.value)
    setItemNameSelected(_ItemTypeSelect.value);
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



function showRowDetailInfo(_name){
  console.log("Data from row from an external function",_name)

  setItemName(_name)  // const [_ItemName,setItemName]  = useState("")

  setShow(true)
  //pause the thread for 1/2 second to give the modal time to render
  // we don't use const [_ItemName,setItemName], but we refer to the _ItemName on edit
  setTimeout(() => {  document.getElementById('oldValue').setAttribute('value',_name); }, 500); 
}

async function updateDDItem(){

  //this is for the item DD type we are updating
  var _ItemTypeSelect = document.getElementById('selDDSelections');

  //var _ItemNameNew = document.getElementById('newValue');
  //var oldValue = document.getElementById('oldValue').value;

  //grab the old value from what was set when the item was selected - DEBBI CHANGE
  var oldValue = _ItemName;  //const [_ItemName,setItemName]  = useState("")
  console.log("Old Value:" + oldValue)

  //Whatever they overwrite from the single field (is the new value)
  var _ItemNameNew  = document.getElementById('oldValue').value;
  console.log("New Value:" + _ItemNameNew)
  

  var DDType = '';
 

  switch (_ItemTypeSelect.value) {
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


  console.log("Drop Down Type :" + DDType)

  var argument  = '';

   if (_ItemNameNew.length > 0
   )
   {
      argument = oldValue;
      argument += "|";
      argument += _ItemNameNew
      argument += "|";
      argument += DDType
   } 
   

   console.log("SQL Statement :" + argument)


  var myAPI = new studentInfoApi;
  await myAPI.UpdateDDListItem(argument)
  setShow(false);
  onDDChanged();
    
}

async function DeleteDDListItem(){
  //function updateDDItem(){
  var _ItemTypeSelect = document.getElementById('selDDSelections');
  
  //NEVER USED ****
  //var _ItemNameNew = document.getElementById('newValue');


  var oldValue = document.getElementById('oldValue').value;

  var DDType = '';
 

  switch (_ItemTypeSelect.value) {
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


  var argument  = '';
  argument = oldValue;
  argument += "|";
  argument += DDType


  if ( 
        oldValue.length > 0
   )
   {} else {return;}


  var myAPI = new studentInfoApi;
  await myAPI.DeleteDDListItem(argument)
  setShow(false);
  onDDChanged();
    
}

/*
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
*/
      const rowStyle = {  height: '10px', padding: '2px 0' };
      const columns = [{
        dataField: 'ItemName',
        text: 'Edit',
        formatter: CellFormatter,
        style: { width: '10px' }
      }, {
        dataField: 'ItemName',
        text: 'Item Name',
      }, ];

      function CellFormatter(cell, row) {
        return (
          <div>
            <Pencil 
              onClick={()=>showRowDetailInfo(row.ItemName)}/>
          </div>
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
                              
                              <Col sm={6}> 
                               
                                <h2>Items</h2>
                                {/*
                                <BootstrapTable data={tblSearchResults} striped hover options={options}
                                  pagination           
                                >
                                  <TableHeaderColumn row="1" width="2%" editable={false} isKey dataField="ItemName" dataFormat={CellFormatter}></TableHeaderColumn>
                                  <TableHeaderColumn row="1" width="98%" dataField="ItemName">Item Name</TableHeaderColumn>
                                    
                                </BootstrapTable>
                              */}
                              <BootstrapTable   
                                striped
                                hover
                                keyField='ItemName'
                                data={tblSearchResults}
                                columns={columns}
                                pagination={ paginationFactory()}
                                rowStyle={rowStyle}
                              
                              />

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
                                        <Col sm={12}>
                                          <label>Item</label>
                                          <input id='oldValue' style={styles.modalInputSyle}>
                                          </input>
                                        </Col>                             
                                      </Row>
                                    </Modal.Body>
                                    <Modal.Footer>
                                      <Button variant="warning" onClick={() => updateDDItem(false)}>Submit</Button>
                                      <Button onClick={() => setShow(false)}>Close</Button>
                                      <Button variant="danger" onClick={() => DeleteDDListItem(false)}>Delete</Button>
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

const styles = {
  modalInputSyle: {
    width:600
  }
};

export default Administration