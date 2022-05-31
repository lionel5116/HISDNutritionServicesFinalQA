import React, {useState,useEffect} from 'react';
import SchoolListDropDown from '../ReusableAppComponents/SchoolListDropDown';
import SchoolYearDropDown from '../ReusableAppComponents/SchoolYearDropDown';
import {Button,
    Container,
    Row,
    Col,Form,Tabs,Tab,Label} from 'react-bootstrap';
import GenericMultipleSelect from '../ReusableAppComponents/GenericMultipleSelect';
import GenericMultiSelectCombo from '../ReusableAppComponents/GenericMultiSelectCombo';
import studentInfoApi from '../../api/studentInfoApi';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { ArrowLeftSquare } from 'react-bootstrap-icons';

//react bootstrap table next
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {BinocularsFill} from 'react-bootstrap-icons';
import BootStrapSelectForSearch from '../ReusableAppComponents/BootStrapSelectForSearch';

import AlertSmall from '../ReusableAppComponents/AlertSmall';


function Communications() {
  const [SchoolTraining, setSchoolTraining] = useState({});
  const [tblSearchStudents, setSearchStudents] = useState([]);
  const [showNotesAndSaveButton, setshowNotesAndSaveButton] = useState('none');
  const [showBootStrapTable, setshowBootStrapTable] = useState('none');
  const [studentInfo, setstudentInfo] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [msgBody,setmsgBody] = useState('');
  const [alertClassType,setalertClassType] = useState('alert alert-primary');



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
      
        _DDSSelect.options[_DDSSelect.options.length] = new Option('--Select--');
        for(const key in _DD_LIST_DATA) {     
          _DDSSelect.options[_DDSSelect.options.length] = new Option(_DD_LIST_DATA[key].ItemName);
        }
    
    }


   const dummyHandleChange = (e) =>
   {
    e.preventDefault();
   }

  const handleClickRight = (e) =>
  {
    e.preventDefault();

     var _mySelect = document.getElementById('ddTrainingList');
     var _mySelect2 = document.getElementById('ddTrainingList_Selected');
     
     Array.from(_mySelect.options).forEach(function(option_element) {
         let option_text = option_element.text;
         let option_value = option_element.value;
         let is_option_selected = option_element.selected;
     
 
         var bDuplicate = false;

         if(is_option_selected)
         {
           
          for (var i = 0; i < _mySelect2.length; ++i){
            if (_mySelect2.options[i].value == option_value){
               bDuplicate = true;
               break;
            }
          }

           if(option_value !='--Select--' &&
              bDuplicate == false) {
             _mySelect2.options[_mySelect2.options.length] = new Option( option_text, option_value);
           }  
         }
     
     });
     
  }

  const handleClickLeft = (e) =>
  {
    e.preventDefault();
    var _mySelect2 = document.getElementById('ddTrainingList_Selected');
    _mySelect2.remove(_mySelect2.selectedIndex); 
  }

 function removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for(i = L; i >= 0; i--) {
       selectElement.remove(i);
    }
 }
 
 
  const saveTrainingNotes = (e) =>
  {
    
    e.preventDefault();

    var isValid = validateForm(e)
    console.log(isValid);
  
    //if all entries are filled in.. proceed, otherwise exit
    if(isValid){
      setShowAlert(false)
      setalertClassType('alert alert-primary')  //alert alert-success
      setmsgBody("")
    } else {
      setShowAlert(true)
      setalertClassType('alert alert-danger')
      setmsgBody("Need Valid: school, Year, notes entered and training(s) selected!!!!...")
      return;
    }

   
    var newDate = new Date().toLocaleString();
    var _SchoolName = document.getElementById('ddSchoolListings');
    var _Note = document.getElementById('Notes');
    var _SchoolYear = document.getElementById('ddSchoolYears');

    var TrainingObj = {NoteType: 'School Wide Training', 
                       Note:_Note.value,
                       SchoolName:_SchoolName.value,
                       DateEntered:newDate,
                       Student_ID:'',
                       SchoolYear: _SchoolYear.value};//vanilla object
                      
    var TrainingObjWithTrainings = {};

    //you want to add all of the different trainings on the selected school
    //TrainingType IS ADDED BELOW********
    var _mySelect2 = document.getElementById('ddTrainingList_Selected');
    if(_mySelect2.length > 0)
    {
      Array.from(_mySelect2.options).forEach(function(option_element) {
        let option_text = option_element.text;
        let option_value = option_element.value;
        
        TrainingObjWithTrainings = {...TrainingObj,TrainingType:option_value} 
      
        writeTrainingRecord(TrainingObjWithTrainings)
      });
    }
   

       /*
      //now write School Training notes for the notes section
      //if any data exists in the note field
      if(_SchoolName.value != '' &&
          _SchoolName.value != '--Select--' &&
          _Note.value !='' && 
          _Note.value.length > 5) {
          TrainingObj = {NoteType: 'School Training', 
          Note: _Note.value,
          SchoolName:_SchoolName.value,
          DateEntered:newDate,
          Student_ID:''};//vanilla object
         writeTrainingRecord(TrainingObj)
      }                
     */

    _SchoolName.value = '--Select--';
    _Note.value = '';
    removeOptions(_mySelect2);
  
  }

  const saveCommNotes = (e) =>
  {
    //communication notes for student does not require school name
    e.preventDefault();

    var isValid = validateFormCommunication(e)
    console.log(isValid);
 


   //if all entries are filled in.. proceed, otherwise exit
   if(isValid){
    setShowAlert(false)
    setalertClassType('alert alert-primary')  //alert alert-success
    setmsgBody("")
  } else {
    setShowAlert(true)
    setalertClassType('alert alert-danger')
    setmsgBody("Need Valid: Year, notes and studentID selected/entered !!...")
    return;
  }

    var newDate = new Date().toLocaleString();
    var _SchoolName = document.getElementById('ddSchoolListings_SearchStudent');
    var _studentID = document.getElementById('txtStudentIDHidden');
    var _Note = document.getElementById('CommNotes');
    var _SchoolYear = document.getElementById('ddSchoolYears');

    var TrainingObj = {NoteType: 'Communication', 
                       Note: _Note.value,
                       SchoolName: '',
                       DateEntered:newDate,
                       TrainingType:'',
                       Student_ID:_studentID.value,
                       SchoolYear: _SchoolYear.value};//vanilla object
                      
                       writeTrainingRecord(TrainingObj)

    _SchoolName.value = '--Select--';
    _Note.value = '';

  }

  const validateForm =(e) =>
  {
    e.preventDefault();
    var bIsValid = false;

    var _SchoolName = document.getElementById('ddSchoolListings');
    var _Note = document.getElementById('Notes');
    var _mySelect2 = document.getElementById('ddTrainingList_Selected');
    var _SchoolYear = document.getElementById('ddSchoolYears');
    var lengthOfListOptions = _mySelect2.length;
    
    //for school wide training (from drop - downs)
      if(_SchoolName.value != '' &&
        _SchoolName.value != '--Select--' &&
        _SchoolYear.value  != '' && 
        _SchoolYear.value  != '--Select--' &&
        lengthOfListOptions > 0 &&
        _Note.value !='' && 
        _Note.value.length > 5)
      {
        bIsValid =  true;
      }
     
      return bIsValid;
  }

  const validateFormCommunication =(e) =>
  {
    e.preventDefault();
    var bIsValid = false;
    var _SchoolName = document.getElementById('ddSchoolListings_SearchStudent');
    var _Note = document.getElementById('CommNotes');
    var _SchoolYear = document.getElementById('ddSchoolYears');

    //studentID was written to a hidden field on select
    var _studentID = document.getElementById('txtStudentIDHidden');

    
      if(
      _Note.value !='' && 
      _studentID.value !='' &&
      _SchoolYear.value  != '' && 
      _SchoolYear.value  != '--Select--')
      {
        bIsValid =  true;
      }
      return bIsValid;
  }

  async function writeTrainingRecord(trainingRecord) { 
      var myAPI = new studentInfoApi;
      var _response  = await myAPI.writeTrainingRecord(trainingRecord)
      console.log(_response);
      if(_response == 0)
      {
        setShowAlert(true)
        setmsgBody("There was an issue writing training or communication notes")
        setalertClassType('alert alert-danger')  
      }
      else if (_response == 1 ){
        setShowAlert(true)
        setmsgBody("Note(s) added...")
        setalertClassType('alert alert-success')  
      }
  }



  function handleChange (e){
    const { name, value } = e.target;
    e.preventDefault();
  }

  const closeAlert = (e) => {
    e.preventDefault();
    setShowAlert(false);
  
}

  //for the row height fix
  const rowStyle = {  height: '10px', padding: '2px 0' };

  const columns = [{
    dataField: 'Student_ID',
    text: '',
    formatter: CellFormatterSearchStudent,
    style: { width: '10px' }
  },
  {
    dataField: 'LastName',
    text: 'Last Name',
  },
  {
    dataField: 'FirstName',
    text: 'First Name',
  },
  {
    dataField: 'School',
    text: 'School',
  },
  {
    dataField: 'currStudentYesNo',
    text: 'Current',
  },
  ];

const selectedStudentRecord = (e,_studentID,_setstudentInfo) =>
{
  e.preventDefault();

  setshowBootStrapTable('none')

  var studentID = document.getElementById('txtStudentIDHidden');
  studentID.value = _studentID;

  var lblStudentInfoField = document.getElementById('lblStudentInfo');
  lblStudentInfoField.innerHTML = _setstudentInfo;
  
  setshowNotesAndSaveButton('block');
  setSearchStudents([]);
}

function CellFormatterSearchStudent(cell, row) {
  //build string for label to display
  var _setstudentInfo = "Student: " + row.Student_ID;
      _setstudentInfo += "->";
      _setstudentInfo += row.LastName;
      _setstudentInfo += ",";
      _setstudentInfo += row.FirstName;
     
 

  return (<div><BinocularsFill 
        onClick={(e) => selectedStudentRecord(e,row.Student_ID,_setstudentInfo)}/>
    </div>);
}


  async function fetchSearchData(_SEARCH_STRING_) {
    let _SEARCH_DATA = [];
    var myAPI = new studentInfoApi;
    try {
      _SEARCH_DATA = await myAPI.fetchSearchData(_SEARCH_STRING_)
      if(_SEARCH_DATA.length > 0)
      {
        setshowBootStrapTable('block')
        
      }
    }
    catch (err) {
      console.log(err)
      setshowBootStrapTable('none')
    }
    
    setSearchStudents(_SEARCH_DATA)
  }

  /*
  async function fetchSearchData_LIKE_CLAUSES(_SEARCH_STRING_) {
    let _SEARCH_DATA = [];
    var myAPI = new studentInfoApi;

    try {
      _SEARCH_DATA = await myAPI.fetchSearchData_LIKE_CLAUSES(_SEARCH_STRING_)
    }
    catch (err) {
      console.log(err)
    }

    setSearchStudents(_SEARCH_DATA)

  }*/
  
  async function fetchSearchData_LIKE_CLAUSES_OBJECT(_SEARCH_STRING) {         
    let _SEARCH_DATA = [];
    var myAPI = new studentInfoApi;
  
    try
    {
      _SEARCH_DATA = await myAPI.fetchSearchData_LIKE_CLAUSES_SearchObject(_SEARCH_STRING)
      if(_SEARCH_DATA.length > 0)
      {
        setshowBootStrapTable('block')
        
      }
    }
    catch(err)
    {
      console.log(err)
      setshowBootStrapTable('none')
    }
  
    setSearchStudents(_SEARCH_DATA)

  }



const searchMixed = (e) => {

  //this will be set to 'block' when a row is selected
  setshowNotesAndSaveButton('none');
  

  e.preventDefault();

  var _SEARCH_STRING = '';
  var _SEARCH_STRING_NEW = '';

  var studentID = document.getElementById('txtStudentID');
  var LastName = document.getElementById('txtLastName');
  var School = document.getElementById('ddSchoolListings_SearchStudent');
  var lblStudentInfoField = document.getElementById('lblStudentInfo');
  lblStudentInfoField.innerHTML = '';

  var ddLastNameSearchCrit = document.getElementById('selLastName');

  if(ddMatch.value == 'anyCriteria')
  {
          if (studentID.value != "" &&
            LastName.value == "" &&
            School.value == "--Select--") {
           
            _SEARCH_STRING += "SELECT id,Student_ID,School,SchoolYear,LastName,FirstName,Current_Student FROM StudentEntryData WHERE Student_ID =";
            _SEARCH_STRING += "'";
            _SEARCH_STRING += studentID.value;
            _SEARCH_STRING += "'";

            fetchSearchData(_SEARCH_STRING);

          }
          else if (studentID.value == "" &&
            LastName.value != "" &&
            School.value == "--Select--") {
     

            if(ddLastNameSearchCrit.value == 'equals')
            {
              _SEARCH_STRING += "SELECT id,Student_ID,School,SchoolYear,LastName,FirstName,Current_Student FROM StudentEntryData WHERE LastName =";
              _SEARCH_STRING += "'";
              _SEARCH_STRING += LastName.value;
              _SEARCH_STRING += "'";
              fetchSearchData(_SEARCH_STRING);
            }
            else if(ddLastNameSearchCrit.value == 'contains')
            {
              _SEARCH_STRING_NEW = "LAST_NAME";
              _SEARCH_STRING_NEW +="|";
              _SEARCH_STRING_NEW += LastName.value;
              fetchSearchData_LIKE_CLAUSES_OBJECT(_SEARCH_STRING_NEW)
            }


          }
          else if (studentID.value == "" &&
            LastName.value == "" &&
            School.value != "--Select--") {
   
            console.log('Search By School Name')
            _SEARCH_STRING += "SELECT id,Student_ID,School,SchoolYear,LastName,FirstName,Current_Student FROM StudentEntryData WHERE School =";
            _SEARCH_STRING += "'";
            _SEARCH_STRING += School.value;
            _SEARCH_STRING += "'";
            
            fetchSearchData(_SEARCH_STRING);

          }
          else {
            setSearchStudents([])
          }
    }  //anyCriteria
    else if (ddMatch.value == 'allCriteria'){

      if (studentID.value != "" &&
          LastName.value != "" &&
          School.value != "--Select--" ) {
          //Search By all criteria

          _SEARCH_STRING_NEW = "ALL_CRITERIA_STUD_COMM";
          _SEARCH_STRING_NEW +="|";
          _SEARCH_STRING_NEW += studentID.value;
          _SEARCH_STRING_NEW += "|"
          _SEARCH_STRING_NEW += LastName.value
          _SEARCH_STRING_NEW += "|"
          _SEARCH_STRING_NEW += School.value
          fetchSearchData_LIKE_CLAUSES_OBJECT(_SEARCH_STRING_NEW)

        }
        else {
          setSearchResults([])
        }
       
    } //allCriteria
}

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
          <h1>Communications</h1>
          <br></br>
          <Form>
          <Row>
                <Col sm={1.75} style={{marginLeft: 12 ,marginRight:5}}>
                      School Year
                  </Col>
                  <Col sm={2}>
                      <SchoolYearDropDown 
                      name='ddSchoolYears'
                      onChange={(e) => handleChange(e)}/>
                  </Col>
                </Row>

                <br></br>
            <Tabs>
          

              <Tab eventKey="SchoolTrainingNotes" title="School Training Notes">
                <h2>School Training Notes</h2>
                <Row>
                  <Col sm={1.75} style={{ paddingRight: 40, marginLeft: 12 }}>
                    School
                  </Col>
                  <Col sm={2}>
                    <SchoolListDropDown
                      handleChange={(e) => handleChange(e)}
                      name="ddSchoolListings"
                    />
                  </Col>
                </Row>
               

                <br></br>
              

                <GenericMultiSelectCombo
                  name_ddLeft="ddTrainingList"
                  name_ddRight="ddTrainingList_Selected"
                  buttonRight="btnSelectRight"
                  buttonLeft="btnSelectLeft"
                  label_ddLeft="Available Trainings"
                  label_ddRight="Selected Trainings"
                  handleClickRight={(e) => handleClickRight(e)}
                  handleClickLeft={(e) => handleClickLeft(e)}
                />

                <br></br>
                <Row className="mb-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ marginLeft: 12 }}>Notes</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="Notes"
                      id="Notes"
                      style={{ height: "100px", width: 1000, marginLeft: 12 }}
                    />
                  </Form.Group>
                </Row>

                <Row>
                  <Col sm={12}>
                    <Button
                      variant="primary"
                      onClick={(e) => saveTrainingNotes(e)}
                    >
                      Save And Send
                    </Button>
                  </Col>
                </Row>
              </Tab>

              <Tab
                eventKey="StudentCommunication"
                title="Student Communications"
              >
                <h2>Student Communications</h2>
                <br></br>

                <Row>
                  <Col style={{ display: "none" }}>
                    <input type="text" id="txtStudentIDHidden" />
                  </Col>
                </Row>

                <Row>
                  <Col sm={1.75} style={{ paddingRight: 10 ,marginLeft:12,width:150}}>
                    Student ID
                  </Col>
                  <Col sm={1.5}>
                    <label style={{ width:110}}>equals</label>
                  </Col>
                  <Col sm={4}>
                    <input type="text" id="txtStudentID" style={{ width:300}}/>
                  </Col>
                </Row>
                <br></br>
                <Row>
                  <Col sm={1.75} style={{ paddingRight: 10 ,marginLeft:12,width:150}}>
                    Last Name
                  </Col>
                  <Col sm={1.5}>
                    <BootStrapSelectForSearch name="selLastName" />
                  </Col>
                  <Col sm={4}>
                    <input type="text" id="txtLastName" style={{ width:300}} />
                  </Col>
                </Row>

                <br></br>
                <Row>
                  <Col sm={1.75} style={{ paddingRight: 40 ,marginLeft:12,width:150}}>
                    School
                  </Col>
                  <Col sm={1.5}>
                    <label style={{ width:110}}>equals</label>
                  </Col>
                  <Col sm={4}>
                    <SchoolListDropDown
                      handleChange={(e) => dummyHandleChange(e)}
                      name="ddSchoolListings_SearchStudent"
                    />
                  </Col>
                </Row>

                <br></br>
                <Row>
                  <Col sm={1.75} style={{ paddingRight: 8 ,marginLeft:12,width:150}}>
                    Match
                  </Col>
                  <Col sm={1.5}>
                    <select
                      class="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                      style={{ width: 110,marginRight:20}}
                      id="ddMatch"
                    >
                      <option value="anyCriteria">any criteria</option>
                      <option value="allCriteria">all criteria</option>
                    </select>
                  </Col>
                  <Col sm={2}></Col>
                </Row>

                <br></br>

                <Row>
                  <Col sm={2}>
                    <Button
                      variant="primary"
                      onClick={(e) => searchMixed(e)}
                      style={{ paddingLeft:10}}
                    >
                      Search
                    </Button>
                  </Col>
                </Row>

                <br></br>

                <Row style={{ display: showBootStrapTable }}>
                  <Col sm={12}>
                    <BootstrapTable
                      striped
                      hover
                      keyField="Student_ID"
                      data={tblSearchStudents}
                      columns={columns}
                      pagination={paginationFactory()}
                      rowStyle={rowStyle}
                    />
                  </Col>
                </Row>

                <br></br>
                <label
                  id="lblStudentInfo"
                  style={{ fontWeight: "bold" }}
                ></label>
                <Row
                  className="mb-3"
                  style={{ display: showNotesAndSaveButton }}
                >
                  <Form.Group className="mb-3">
                    <Form.Label 
                    style={{marginLeft:12}}>
                       Student Communication Notes</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="CommNotes"
                      id="CommNotes"
                      style={{ height: "100px", width: 1000 ,marginLeft:12}}
                    />
                  </Form.Group>
                </Row>

                <Row style={{ display: showNotesAndSaveButton }}>
                  <Col sm={2}>
                    <Button variant="primary" onClick={(e) => saveCommNotes(e)}>
                      Save And Send
                    </Button>
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

export default Communications