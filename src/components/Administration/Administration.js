import React from 'react';
import {useState} from 'react';
import { useEffect } from 'react';
import {Button,
    Container,
    Row,
    Col,Form,Tabs,Tab} from 'react-bootstrap';
import GenericDDSelect from '../ReusableAppComponents/GenericDDSelect'
import { Pencil  } from 'react-bootstrap-icons';
import {TrashFill}from 'react-bootstrap-icons';

//react bootstrap table next
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

//for modal
import GenericModal from '../GenericModal/GenericModal';
import SchoolYearDropDown from '../ReusableAppComponents/SchoolYearDropDown';
import AlertSmall from '../ReusableAppComponents/AlertSmall';
import BootStrapSelectForSearch from '../ReusableAppComponents/BootStrapSelectForSearch';
    

let optionsDDSelections = ['--Select--','Foods To Be Omitted', 'Nutrition Supplements', 'Milk Substitutes', 'Training Types'];

var itemTypeSelected = ''
import studentInfoApi from '../../api/studentInfoApi';




function Administration() {
  const [tblSearchResults, setSearchResults] = useState([])
  const [tblSearchTempIDS, setSearchResultsTempIDs] = useState([]);
  const [tblSearchResultsLogs, setSearchResultsLogs] = useState([]);
  const [tblSearchResultsDelete, setSearchResultsDelete] = useState([])

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const [disableAddNewDDItem,setDisableAddNewDDItem] = useState(true);

  const [_nSequenceID,setSequenceID]  = useState(0)
  const [_ItemName,setItemName]  = useState("")
  const [_ItemNameSelected,setItemNameSelected]  = useState("")


  const [_studentIDTemp,setstudentIDTemp]  = useState("")

  const [showAlert, setShowAlert] = useState(false);
  const [msgBody,setmsgBody] = useState('');
  const [alertClassType,setalertClassType] = useState('alert alert-primary');
  

  useEffect(() => {
    fetchLogs();
  },[]);

  useEffect(() => {
    fetchStudentTempIDRecords()
  },[]);


  const onDDChanged = () =>
  {
    var _ItemTypeSelect = document.getElementById('selDDSelections');

    fetchSearchDDListData(_ItemTypeSelect.value)
    
    
    //let optionsDDSelections = ['--Select--','Foods To Be Omitted', 'Nutrition Supplement', 'Milk Substitute', 'Training Types'];
    switch (_ItemTypeSelect.value) {
      case 'Foods To Be Omitted':
        setItemNameSelected('Food To Be Omitted');
        break;
      case 'Nutrition Supplements':
        setItemNameSelected('Nutrition Supplement');
        break;
      case 'Milk Substitutes':
        setItemNameSelected('Milk Substitute');
        break;
        case 'Training Types':
          setItemNameSelected('Training Type');
          break;
      default:
        break;
    }

    toggleAddNewDDItem();
    //console.log("Button State is" + disableAddNewDDItem)
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
 

}

async function fetchStudentTempIDRecords() {         
  let _SEARCH_DATA = [];

  var myAPI = new studentInfoApi;
  try
  {
    _SEARCH_DATA = await myAPI.fetchStudentTempIDRecords()
  }
  catch(err)
  {
    console.log(err)
  }
  setSearchResultsTempIDs(_SEARCH_DATA)
}

async function archiveSchoolYear(){

  const confirmBox = window.confirm(
    "Do you really want to archive this school year ?"
  )
  if (confirmBox === true) {} else {return;}

  var SchoolYear = document.getElementById('ddSchoolYears');
  var myAPI = new studentInfoApi;
  if (SchoolYear.value != "--Select--" &&
     SchoolYear.value != "")
  {
    try
    {
       await myAPI.archiveSchoolYear(SchoolYear.value)
      
       SchoolYear.value = "--Select--";
       await logChanges("Archived School Year",SchoolYear.value)
       fetchLogs();
       
       window.alert("School Year Archived... New Student Entries will reflect new school year");
       //setShowAlert(true)
       //setmsgBody("School Year Archived... New Student Entries will reflect new school year ")
       //setalertClassType('alert alert-success') 
    }
    catch(err)
    {
      console.log(err)
    }
  }
  
}

async function fetchLogs() {         
  let _SEARCH_DATA = [];

  var myAPI = new studentInfoApi;
  try
  {
    _SEARCH_DATA = await myAPI.fetchLogs()
  }
  catch(err)
  {
    console.log(err)
  }
  setSearchResultsLogs(_SEARCH_DATA)
}


function showRowDetailInfo(_name){
  
  setItemName(_name)  // const [_ItemName,setItemName]  = useState("")

  setShow(true)
  //pause the thread for 1/2 second to give the modal time to render
  // we don't use const [_ItemName,setItemName], but we refer to the _ItemName on edit
  setTimeout(() => {  document.getElementById('oldValue').setAttribute('value',_name); }, 500); 
}

function showRowDetailInfoTempIDS(_studentID){
  //console.log("TempIDS  - Data from row from an external function",_studentID)
  setstudentIDTemp(_studentID)//const [_studentIDTemp,setstudentIDTemp]  = useState("")
  setShow3(true)
  setTimeout(() => {  document.getElementById('oldValue').setAttribute('value',_studentID); }, 500);
 
}

async function updateDDItem(){

  //this is for the item DD type we are updating
  var _ItemTypeSelect = document.getElementById('selDDSelections');

  //grab the old value from what was set when the item was selected - DEBBI CHANGE
  var oldValue = _ItemName;  //const [_ItemName,setItemName]  = useState("")
 

  //Whatever they overwrite from the single field (is the new value)
  var _ItemNameNew  = document.getElementById('oldValue').value;
 
  

  var DDType = '';
 

  switch (_ItemTypeSelect.value) {
    case 'Foods To Be Omitted':
      DDType = 'FTBO'
      break;
    case 'Nutrition Supplements':
      DDType = 'NUTR_SUB'
      break;
    case 'Milk Substitutes':
      DDType = 'MILK_SUB'
      break;
      case 'Training Types':
        DDType = 'TRAINING'
        break;
    default:
      break;
  }


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
   

  await logChanges("UpdateDDItem",argument)


  var myAPI = new studentInfoApi;
  await myAPI.UpdateDDListItem(argument)
  setShow(false);
  onDDChanged();
  fetchLogs();
    
}

async function DeleteDDListItem(){

  const confirmBox = window.confirm(
    "Do you really want to delete this item?"
  )
  if (confirmBox === true) {} else {return;}

  var _ItemTypeSelect = document.getElementById('selDDSelections');
  var oldValue = document.getElementById('oldValue').value;
  var DDType = '';
 

  switch (_ItemTypeSelect.value) {
    case 'Foods To Be Omitted':
      DDType = 'FTBO'
      break;
    case 'Nutrition Supplements':
      DDType = 'NUTR_SUB'
      break;
    case 'Milk Substitutes':
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


   await logChanges("DeleteDDListItem",argument)

  var myAPI = new studentInfoApi;
  await myAPI.DeleteDDListItem(argument)
  setShow(false);
  onDDChanged();
  fetchLogs();
    
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
    case 'Foods To Be Omitted':
      DDType = 'FTBO'
      break;
    case 'Nutrition Supplements':
      DDType = 'NUTR_SUB'
      break;
    case 'Milk Substitutes':
      DDType = 'MILK_SUB'
      break;
      case 'Training Types':
        DDType = 'TRAINING'
        break;
    default:
      break;
  }


  var argument  = '';

   if (_ItemNameNew.length > 0
   )
   {
      argument += _ItemNameNew
      argument += "|";
      argument += DDType
   } 
   

   await logChanges("ADD_DDItem",argument)

  var myAPI = new studentInfoApi;
  await myAPI.ADD_DDListItem(argument)
  
  setShow2(false);
  onDDChangedAddNewItem();

  fetchLogs();
    
}
async function EditStudentID(){


  var _ItemNameNew  = document.getElementById('oldValue').value;


  var argument  = '';

   if (_ItemNameNew.length > 0
   )
   {
     
      argument += _studentIDTemp
      argument += "|";
      argument += _ItemNameNew
   } 
   

   await logChanges("EditStudentID",argument)

  var myAPI = new studentInfoApi;
  await myAPI.UpdateStudentTempID(argument)
  
  setShow3(false);
  fetchStudentTempIDRecords();
  fetchLogs();
    
}



async function DeleteStudentRecord(e,id){
  e.preventDefault();
  const confirmBox = window.confirm(
    "Do you really want to delete this student record?"
  )
  if (confirmBox === true) {} else {return;}

  
   await logChanges("DeleteStudent","Deleted Student ID " + id)

  var strSQLStatement = "DELETE StudentEntryData WHERE id = " ; 
  strSQLStatement += id;
  

  var myAPI = new studentInfoApi;
  await myAPI.DeleteStudentRecord(strSQLStatement)

  setSearchResultsDelete([]);

}

//logging
async function  logChanges(sChangeType,changeNote)
{
 

  var myAPI = new studentInfoApi;
  

      var logObject = {
        LogDate: '',
        ChangeType: '',
        ChangeNotes: '',
        Student_ID: '',
        SchoolName: '',
        SchoolNotes: '',
        UserMakingChange:''
      };


      var dateTimeCurrent = new Date().toISOString();

          logObject.LogDate = dateTimeCurrent;
          logObject.ChangeType = sChangeType;
          logObject.ChangeNotes = changeNote;
          logObject.studentID = '';
          logObject.schoolName = '';
          logObject.SchoolNotes = '';
          logObject.UserMakingChange = '';

           await myAPI.insertLogData(logObject)
     
}

const closeAlert = (e) => {
  e.preventDefault();
  setShowAlert(false);

}

      const rowStyle = {  height: '10px', padding: '2px 0' };

      const columns = [{
        dataField: 'ItemName',
        text: 'Item Name',
        sort: true
      }, 
      {
        dataField: 'ItemName',
        text: 'Edit',
        formatter: CellFormatter,
        style: { width: '10px' }
      }, 
    ];

      const columnsTempIDS = [
        {
          dataField: 'Student_ID',
          text: 'Edit',
          style: { color : 'red',fontWeight: 'bold' },
          formatter: CellFormatterTempIDS,
        }, 
      
      {
        dataField: 'LastName',
        text: 'Last Name',
        sort: true
      }, 
      {
        dataField: 'FirstName',
        text: 'First Name',
        sort: true
      }, 
      {
        dataField: 'School',
        text: 'School',
      }, 
      {
        dataField: 'SchoolYear',
        text: 'School Year',
      }
     
    ];

  
  const columnsLogs = [
    {
      dataField: 'LogDate',
      text: 'Log Date',
      sort: true
    }, 
    {
      dataField: 'ChangeType',
      text: 'Change Type',
      sort: true,
      filter: textFilter()
    }, 
    {
      dataField: 'UserMakingChange',
      text: 'User Name',
    }, 
    {
      dataField: 'ChangeNotes',
      text: 'Change Notes',
    }, 
  ];



      function CellFormatter(cell, row) {
        return (
          <div>
            <Pencil 
              onClick={()=>showRowDetailInfo(row.ItemName)}/>
          </div>
        );
      }

      function CellFormatterTempIDS(cell, row) {
        return (
          <div>
           <span onClick={()=>showRowDetailInfoTempIDS(row.Student_ID)}>{row.Student_ID}</span>
            
            {/*<Pencil 
              onClick={()=>showRowDetailInfoTempIDS(row.Student_ID)}/> */}
          </div>
        );
      }

      
      function CellFormatterDeleteStudent(cell, row) {
        return (
          <div>
            <TrashFill 
              onClick={(e)=>DeleteStudentRecord(e,row.id)}/>
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

  const closeModalThird = () =>
  {
      setShow3(false)
  }

 const showTempIDRecords = () =>{
    
 }


 async function fetchSearchData(_SEARCH_STRING_) {         
  let _SEARCH_DATA = [];
  var myAPI = new studentInfoApi;
  try
  {
    _SEARCH_DATA = await myAPI.fetchSearchData(_SEARCH_STRING_)
  }
  catch(err)
  {
    console.log(err)
  }
  setSearchResultsDelete(_SEARCH_DATA)

}

async function fetchSearchData_LIKE_CLAUSES_SearchObjectCurrentYear(_SEARCH_STRING) {         
  let _SEARCH_DATA = [];
  var myAPI = new studentInfoApi;

  try
  {
    _SEARCH_DATA = await myAPI.fetchSearchData_LIKE_CLAUSES_SearchObjectCurrentYear(_SEARCH_STRING)
  }
  catch(err)
  {
    console.log(err)
  }
  
  setSearchResultsDelete(_SEARCH_DATA)

}

 const searchMixed = async () => {

  var oSearchObject = {
    searchType : '',
    firstName : '',
    lastName : '',
    school : '',
  }

  var myAPI = new studentInfoApi;
  var _current_SchoolYear = await myAPI.fetchMAXSchoolYear();

  var _SEARCH_STRING = '';
  var _SEARCH_STRING_NEW = '';

  var studentID = document.getElementById('txtStudentID');
  var FirstName = document.getElementById('txtFirstName');
  var LastName = document.getElementById('txtLastName');
  var SchoolYear = document.getElementById('ddSchoolYears');
  var School = document.getElementById('ddSchoolListings');

  var ddLastNameSearchCrit = document.getElementById('selLastName');
  var ddFirstNameSearchCrit = document.getElementById('selFirstName');


          if (studentID.value != "" &&
            FirstName.value == "" &&
            LastName.value == "" ) {
           
            _SEARCH_STRING += "SELECT id,Student_ID,School,SchoolYear,LastName,FirstName,Current_Student FROM StudentEntryData WHERE Student_ID =";
            _SEARCH_STRING += "'";
            _SEARCH_STRING += studentID.value;
            _SEARCH_STRING += "'";

            _SEARCH_STRING += "AND SchoolYear = ";
            _SEARCH_STRING += "'";
            _SEARCH_STRING += _current_SchoolYear;
            _SEARCH_STRING += "'";
       
            fetchSearchData(_SEARCH_STRING);

          }
          else if (studentID.value == "" &&
            FirstName.value != "" &&
            LastName.value == "" ) {
       
           
              if(ddFirstNameSearchCrit.value == 'equals')
              {
                _SEARCH_STRING += "SELECT id,Student_ID,School,SchoolYear,LastName,FirstName,Current_Student FROM StudentEntryData WHERE FirstName =";
                _SEARCH_STRING += "'";
                _SEARCH_STRING += FirstName.value;
                _SEARCH_STRING += "'";

                _SEARCH_STRING += "AND SchoolYear = ";
                _SEARCH_STRING += "'";
                _SEARCH_STRING += _current_SchoolYear;
                _SEARCH_STRING += "'";

                fetchSearchData(_SEARCH_STRING);

              }
              else if(ddFirstNameSearchCrit.value == 'contains')
              {
                _SEARCH_STRING_NEW = "FIRST_NAME";
                _SEARCH_STRING_NEW +="|";
                _SEARCH_STRING_NEW += FirstName.value;
                fetchSearchData_LIKE_CLAUSES_SearchObjectCurrentYear(_SEARCH_STRING_NEW)
              }

          }
          else if (studentID.value == "" &&
            FirstName.value == "" &&
            LastName.value != "") {
          
            if(ddLastNameSearchCrit.value == 'equals')
            {
              _SEARCH_STRING += "SELECT id,Student_ID,School,SchoolYear,LastName,FirstName,Current_Student FROM StudentEntryData WHERE LastName =";
              _SEARCH_STRING += "'";
              _SEARCH_STRING += LastName.value;
              _SEARCH_STRING += "'";

              _SEARCH_STRING += "AND SchoolYear = ";
              _SEARCH_STRING += "'";
              _SEARCH_STRING += _current_SchoolYear;
              _SEARCH_STRING += "'";

              fetchSearchData(_SEARCH_STRING);
            }
            else if(ddLastNameSearchCrit.value == 'contains')
            {
              _SEARCH_STRING_NEW = "LAST_NAME";
              _SEARCH_STRING_NEW +="|";
              _SEARCH_STRING_NEW += LastName.value;
              fetchSearchData_LIKE_CLAUSES_SearchObjectCurrentYear(_SEARCH_STRING_NEW)
            }
   
          }
          else {
            setSearchResultsDelete([])
          }
      }  
     


 const columnsDeleteStudents = [
  {
    dataField: 'LastName',
    text: 'Last Name',
    sort: true
  },
  {
    dataField: 'FirstName',
    text: 'First Name',
    sort: true
  },
  {
    dataField: 'School',
    text: 'School',
  },
  {
    dataField: 'SchoolYear',
    text: 'SchoolYear',
  },
  {
    dataField: 'currStudentYesNo',
    text: 'Current',
  },
  {
    dataField: 'id',
    text: 'Delete',
    formatter: CellFormatterDeleteStudent,
    style: { width: '10px' }
  },
  ];

  return (
    <div>
      <main>
        <Container>
          <AlertSmall
            show={showAlert}
            msgBody={msgBody}
            alertClassType={alertClassType}
            toogleAlert={(e) => closeAlert(e)}
          />
          <h1>Administration</h1>
          <br></br>
          <Form>
            <Tabs>
              <Tab eventKey="TempStudentIDS" title="Temp Student ID">
                <h2>Temp Student ID</h2>
                <Row style={{ display: "none" }}>
                  <Col sm={6}>
                    <Button
                      variant="primary"
                      onClick={() => fetchStudentTempIDRecords(true)}
                    >
                      Show Temp IDs
                    </Button>
                  </Col>
                </Row>

                <br></br>

                <Row>
                  <Col sm={12}>
                    <BootstrapTable
                      striped
                      hover
                      keyField="Student_ID"
                      data={tblSearchTempIDS}
                      columns={columnsTempIDS}
                      pagination={paginationFactory()}
                      rowStyle={rowStyle}
                    />
                  </Col>
                </Row>
              </Tab>

              <Tab eventKey="ManageDropdownLists" title="Manage Dropdown Lists">
                <br></br>

                <Row>
                  <Col sm={1.75} style={{ paddingRight: 40, marginLeft: 12 }}>
                    Choose List
                  </Col>
                  <Col sm={4}>
                    <GenericDDSelect
                      handleOnChange={onDDChanged}
                      items={optionsDDSelections}
                      name="selDDSelections"
                    />
                  </Col>
                </Row>

                <hr></hr>

                <Row>
                  <Col sm={4}>
                    <Button
                      variant="primary"
                      onClick={() => setShow2(true)}
                      disabled={disableAddNewDDItem}
                    >
                      Add {_ItemNameSelected}
                    </Button>
                  </Col>
                </Row>

                <Row>
                  <Col sm={6}>
                    <h2></h2>

                    <BootstrapTable
                      striped
                      hover
                      keyField="ItemName"
                      data={tblSearchResults}
                      columns={columns}
                      pagination={paginationFactory()}
                      rowStyle={rowStyle}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col sm={12}>
                    <GenericModal
                      id="oldValue"
                      title={_ItemNameSelected}
                      actionLabel="Edit"
                      showPrimaryModal={show}
                      close="Close"
                      Submit="Submit"
                      delete="Delete Item"
                      handleClosePrimary={() => closeModalPrimary}
                      handleClickOne={() => updateDDItem}
                      handleClickTwo={() => DeleteDDListItem}
                      handleClickTwoVisable="block"
                    />

                    <GenericModal
                      id="oldValue"
                      title={_ItemNameSelected}
                      actionLabel="Add"
                      showPrimaryModal={show2}
                      close="Close"
                      Submit="Submit"
                      handleClosePrimary={() => closeModalSecondary}
                      handleClickOne={() => ADD_New_DDItem}
                      //we will hide these in this dialog
                      delete="Delete Item"
                      handleClickTwo={() => DeleteDDListItem}
                      handleClickTwoVisable="none"
                    />

                    <GenericModal
                      id="oldValue"
                      title="Temp Student ID"
                      actionLabel="Edit"
                      showPrimaryModal={show3}
                      close="Close"
                      Submit="Submit"
                      handleClosePrimary={() => closeModalThird}
                      handleClickOne={() => EditStudentID}
                      //we will hide these in this dialog
                      delete="Delete Item"
                      handleClickTwo={() => DeleteDDListItem}
                      handleClickTwoVisable="none"
                    />
                  </Col>
                </Row>
              </Tab>

              <Tab eventKey="ArchiveSchoolYear" title="Archive School Year">
                <h2>Archive School Year</h2>
                <Row>
                  <Col sm={4}>
                    <SchoolYearDropDown name="ddSchoolYears" />
                  </Col>

                  <Col sm={3}>
                    <Button
                      variant="danger"
                      onClick={() => archiveSchoolYear()}
                    >
                      Archive
                    </Button>
                  </Col>
                </Row>
              </Tab>

              <Tab eventKey="ActivityLogs" title="Activity Logs">
                <h2>Activity Logs</h2>
                <Row style={{ display: "none" }}>
                  <Col>
                    <Button variant="primary" onClick={() => fetchLogs()}>
                      View Logs
                    </Button>
                  </Col>
                </Row>
                <br></br>
                <Row>
                  <Col sm={12}>
                    <BootstrapTable
                      striped
                      hover
                      keyField="LogDate"
                      data={tblSearchResultsLogs}
                      columns={columnsLogs}
                      pagination={paginationFactory()}
                      rowStyle={rowStyle}
                      filter={filterFactory()}
                    />
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey="DeleteStudents" title="Delete Students">
                <Row>
                  <Col sm={12}>
                    <h2>Delete Students</h2>
                    <br></br>
                    <Row>
                      <Col
                        sm={1.75}
                        style={{ paddingRight: 10, marginLeft: 12, width: 150 }}
                      >
                        Student ID
                      </Col>
                      <Col sm={1.5}>
                        <label style={{ width: 110 }}>equals</label>
                      </Col>
                      <Col sm={2}>
                        <input
                          type="text"
                          id="txtStudentID"
                          style={{ width: 300 }}
                        />
                      </Col>
                    </Row>
                    <br></br>
                    <Row>
                      <Col
                        sm={1.75}
                        style={{ paddingRight: 10, marginLeft: 12, width: 150 }}
                      >
                        Last Name
                      </Col>
                      <Col sm={1.5}>
                        <BootStrapSelectForSearch name="selLastName" />
                      </Col>
                      <Col sm={2}>
                        <input
                          type="text"
                          id="txtLastName"
                          style={{ width: 300 }}
                        />
                      </Col>
                    </Row>

                    <br></br>
                    <Row>
                      <Col
                        sm={1.75}
                        style={{ paddingRight: 10, marginLeft: 12, width: 150 }}
                      >
                        First Name
                      </Col>
                      <Col sm={1.5}>
                        <BootStrapSelectForSearch name="selFirstName" />
                      </Col>
                      <Col sm={2}>
                        <input
                          type="text"
                          id="txtFirstName"
                          style={{ width: 300 }}
                        />
                      </Col>
                    </Row>

                    <br></br>
                    <Row>
                      <Col sm={12}>
                        <Button variant="outline-primary" 
                            onClick={() => searchMixed()}>Search</Button>
                      </Col>
                    </Row>

                    <br></br>
                    <BootstrapTable
                      striped
                      hover
                      keyField="id"
                      data={tblSearchResultsDelete}
                      columns={columnsDeleteStudents}
                      pagination={paginationFactory()}
                      rowStyle={rowStyle}
                    />
                  </Col>
                </Row>
              </Tab>
            </Tabs>
          </Form>
        </Container>
      </main>
    </div>
  );
}

const styles = {
  modalInputSyle: {
    width:600
  }
};

export default Administration