import React from 'react';
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
    

let optionsDDSelections = ['--Select--','Foods To Be Ommitted', 'Nutrition Supplement', 'Milk Substitute', 'Training Types'];
var itemTypeSelected = ''
import studentInfoApi from '../../api/studentInfoApi';

function Administration() {
  const [tblSearchResults, setSearchResults] = useState([])

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [disableAddNewDDItem,setDisableAddNewDDItem] = useState(true);

  const [_nSequenceID,setSequenceID]  = useState(0)
  const [_ItemName,setItemName]  = useState("")
  const [_ItemNameSelected,setItemNameSelected]  = useState("")
  
  const onDDChanged = () =>
  {
    var _ItemTypeSelect = document.getElementById('selDDSelections');

    fetchSearchDDListData(_ItemTypeSelect.value)
    setItemNameSelected(_ItemTypeSelect.value);

    toggleAddNewDDItem();
    console.log("Button State is" + disableAddNewDDItem)
  }

  const onDDChangedAddNewItem = () =>
  {
    var _ItemTypeSelect = document.getElementById('selDDSelections');

    fetchSearchDDListData(_ItemTypeSelect.value)

    toggleAddNewDDItem();

    //setItemNameSelected(_ItemTypeSelect.value);
  }
  
  const toggleAddNewDDItem = () =>
  {
    var _ItemTypeSelect = document.getElementById('selDDSelections');
    if(_ItemTypeSelect.value != "--Select--")
    {
      setDisableAddNewDDItem(false)
    }
    else{
      setDisableAddNewDDItem(true)
    }
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
      DDType = 'MILK_SUB'
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

  var _ItemTypeSelect = document.getElementById('selDDSelections');
  
 
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
      DDType = 'MILK_SUB'
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

async function ADD_New_DDItem(){

  //this is for the item DD type we are updating
  var _ItemTypeSelect = document.getElementById('selDDSelections');

  var _ItemNameNew  = document.getElementById('oldValue').value;

  if(_ItemTypeSelect.value != "--Select--")
  {
     
  }
  else{
    toggleAddNewDDItem();
    return;
  }

  var DDType = '';
 

  switch (_ItemTypeSelect.value) {
    case 'Foods To Be Ommitted':
      DDType = 'FTBO'
      break;
    case 'Nutrition Supplement':
      DDType = 'NUTR_SUB'
      break;
    case 'Milk Substitute':
      DDType = 'MILK_SUB'
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
      argument += _ItemNameNew
      argument += "|";
      argument += DDType
   } 
   

   console.log("SQL Statement :" + argument)
   console.log("Inside of the ADD_New_DDItem method")


  var myAPI = new studentInfoApi;
  await myAPI.ADD_DDListItem(argument)
  
  setShow2(false);
  onDDChangedAddNewItem();
    
}

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

  /* MODAL ACTIONS */
  const closeModalPrimary = () =>
  {
      setShow(false)
  }

  const closeModalSecondary = () =>
  {
      setShow2(false)
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
                              <Button variant="primary"
                                onClick={()=>setShow2(true)}
                                 disabled = {disableAddNewDDItem}
                                 >Add New Item</Button>
                              </Col>
                            </Row>

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
                              
                                <GenericModal 
                                   id="oldValue"
                                   title="Edit DropDown List Item"
                                   actionLabel='Edit Item'
                                   showPrimaryModal= {show}
                                   close = 'Close'
                                   Submit = 'Submit'
                                   delete = 'Delete Item'
 
                                   handleClosePrimary = {()=>closeModalPrimary}
                                   handleClickOne = {()=>updateDDItem}
                                   handleClickTwo = {()=>DeleteDDListItem}

                                   handleClickTwoVisable = 'block' />

                                  <GenericModal 
                                   
                                   id="oldValue"
                                   title = "New DropDown List Item"
                                   actionLabel='Add New Item'
                                   showPrimaryModal= {show2}
                                   close = 'Close'
                                   Submit = 'Submit'
                                
                                   handleClosePrimary = {()=>closeModalSecondary}
                                   handleClickOne = {()=>ADD_New_DDItem}

                                   //we will hide these in this dialog
                                   delete = 'Delete Item'
                                   handleClickTwo = {()=>DeleteDDListItem}
                                   handleClickTwoVisable = 'none' 
                                   
                                   
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

const styles = {
  modalInputSyle: {
    width:600
  }
};

export default Administration