import React, {useState,useEffect} from 'react';
import SchoolListDropDown from '../ReusableAppComponents/SchoolListDropDown';
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


function Communications() {
  const [SchoolTraining, setSchoolTraining] = useState({});
  const [tblSearchStudents, setSearchStudents] = useState([]);
  const [showNotesAndSaveButton, setshowNotesAndSaveButton] = useState('none');
  const [studentInfo, setstudentInfo] = useState('');


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
 
 // using the function:
 

  const saveTrainingNotes = (e) =>
  {
    
    e.preventDefault();

    var isValid = validateForm(e)
    console.log(isValid);
 
   //if all entries are filled in.. proceed, otherwise exit
   if(isValid){} else {return;}

    var newDate = new Date().toLocaleString();
    var _SchoolName = document.getElementById('ddSchoolListings');
    var _Note = document.getElementById('Notes');
    //had to use an vanilla object because of the dropdown selected action when looping
    //does not work with useState very well
    var TrainingObj = {NoteType: 'Training', 
                       Note: _Note.value,
                       SchoolName:_SchoolName.value,
                       DateEntered:newDate,
                       Student_ID:''};//vanilla object
                      
   
    var _TrainingObj = {};

    var _mySelect2 = document.getElementById('ddTrainingList_Selected');
    Array.from(_mySelect2.options).forEach(function(option_element) {
      let option_text = option_element.text;
      let option_value = option_element.value;
      
      _TrainingObj = {...TrainingObj,TrainingType:option_value} 
      console.log(_TrainingObj);
      writeTrainingRecord(_TrainingObj)
    });

    _SchoolName.value = '--Select--';
    _Note.value = '';
    removeOptions(_mySelect2);
  }

  const saveCommNotes = (e) =>
  {
    
    e.preventDefault();

    var isValid = validateFormCommunication(e)
    console.log(isValid);
 

   if(isValid){} else {return;}

    var newDate = new Date().toLocaleString();
    var _SchoolName = document.getElementById('ddSchoolListings_SearchStudent');
    var _studentID = document.getElementById('txtStudentIDHidden');
    var _Note = document.getElementById('CommNotes');

    var TrainingObj = {NoteType: 'Communication', 
                       Note: _Note.value,
                       SchoolName:_SchoolName.value,
                       DateEntered:newDate,
                       TrainingType:'',
                       Student_ID:_studentID.value};//vanilla object
                      
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
    var lengthOfListOptions = _mySelect2.length;
    if(_SchoolName.value != '' &&
      _SchoolName.value != '--Select--' &&
      _Note.value !='' &&
      lengthOfListOptions > 0)
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
    var _studentID = document.getElementById('txtStudentIDHidden');


    if(_SchoolName.value != '' &&
      _SchoolName.value != '--Select--' &&
      _Note.value !='' && 
      _studentID.value !='')
      {
        bIsValid =  true;
      }
      
      return bIsValid;
  }

  async function writeTrainingRecord(trainingRecord) { 
      var myAPI = new studentInfoApi;
      var _response = await myAPI.writeTrainingRecord(trainingRecord)
  }



  function handleChange (e){
    const { name, value } = e.target;
    e.preventDefault();
   
   return;   //this will only work if you are fetching values soley from an onchange event for every control on your form

    switch (name) {
        case 'ddSchoolListings':
          setSchoolTraining({ ...SchoolTraining, SchoolName: value });
            break;
        case 'Notes':
          setSchoolTraining({ ...SchoolTraining, Note: value });
            break;
        default:
            break;
    }

  }



  //for the row height fix
  const rowStyle = {  height: '10px', padding: '2px 0' };

  const columns = [{
    dataField: 'Student_ID',
    text: 'id',
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
  console.log('You selected ' + _studentID)
  var studentID = document.getElementById('txtStudentIDHidden');
  var lblStudentInfoField = document.getElementById('lblStudentInfo');
  lblStudentInfoField.innerHTML = _setstudentInfo;
  studentID.value = _studentID;
  setshowNotesAndSaveButton('block');
  setSearchStudents([]);
}

function CellFormatterSearchStudent(cell, row) {
  var _setstudentInfo = row.Student_ID;
      _setstudentInfo += ":";
      _setstudentInfo += row.LastName;
      _setstudentInfo += ",";
      _setstudentInfo += row.FirstName;
     
  //setstudentInfo(_setstudentInfo);

  return (<div><BinocularsFill 
        onClick={(e) => selectedStudentRecord(e,row.Student_ID,_setstudentInfo)}/>
    </div>);
}


  async function fetchSearchData(_SEARCH_STRING_) {
    let _SEARCH_DATA = [];
    var myAPI = new studentInfoApi;
    try {
      _SEARCH_DATA = await myAPI.fetchSearchData(_SEARCH_STRING_)
    }
    catch (err) {
      console.log(err)
    }
    setSearchStudents(_SEARCH_DATA)

  }

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

  }


const searchMixed = (e) => {

  setshowNotesAndSaveButton('none');

  e.preventDefault();

  var _SEARCH_STRING = '';

  var studentID = document.getElementById('txtStudentID');
  var LastName = document.getElementById('txtLastName');
  var School = document.getElementById('ddSchoolListings_SearchStudent');


  if (studentID.value != "" &&
    LastName.value == "" &&
    School.value == "--Select--") {
    //Search By Student ID  - WORKS!!!
    console.log('Search By Student ID')
    _SEARCH_STRING += "SELECT Student_ID,School,SchoolYear,LastName,FirstName,Current_Student FROM StudentEntryData WHERE Student_ID =";
    _SEARCH_STRING += "'";
    _SEARCH_STRING += studentID.value;
    _SEARCH_STRING += "'";
    //console.log(_SEARCH_STRING);
    fetchSearchData(_SEARCH_STRING);

  }
  else if (studentID.value == "" &&
    LastName.value != "" &&
    School.value == "--Select--") {
    //Search By Last Name 
    console.log('Search By Last Name ')
    _SEARCH_STRING += "-"
    _SEARCH_STRING += "|"
    _SEARCH_STRING += LastName.value
    _SEARCH_STRING += "|"
    _SEARCH_STRING += "-"
    _SEARCH_STRING += "|"
    _SEARCH_STRING += "LAST_NAME"

    //console.log("SEARCH_TYPE : LAST_NAME");
    fetchSearchData_LIKE_CLAUSES(_SEARCH_STRING);

  }
  else if (studentID.value == "" &&
    LastName.value == "" &&
    School.value != "--Select--") {
    //Search By School Name  - WORKS!!!
    console.log('Search By School Name')
    _SEARCH_STRING += "SELECT Student_ID,School,SchoolYear,LastName,FirstName,Current_Student FROM StudentEntryData WHERE School =";
    _SEARCH_STRING += "'";
    _SEARCH_STRING += School.value;
    _SEARCH_STRING += "'";
    //console.log(_SEARCH_STRING);
    fetchSearchData(_SEARCH_STRING);

  }
  else {
    setSearchStudents([])
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
                            <SchoolListDropDown 
                              handleChange = {(e) =>handleChange(e)}
                              name='ddSchoolListings'
                            />
                        </Col>
                    </Row>
                <br></br>
           
                 <GenericMultiSelectCombo 
                   name_ddLeft = 'ddTrainingList'
                   name_ddRight = 'ddTrainingList_Selected'
                   buttonRight = 'btnSelectRight'
                   buttonLeft = 'btnSelectLeft'
                   label_ddLeft = 'Available Trainings'
                   label_ddRight = 'Selected Trainings'
                   handleClickRight = {(e) =>handleClickRight(e)}
                   handleClickLeft = {(e) =>handleClickLeft(e)}
                   />
            
                     
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

    
                <Row>
                <Col sm={12}>
                  <Button variant="outline-primary" onClick={(e) => saveTrainingNotes(e)}>Save</Button>
                </Col>
                </Row>

                </Tab>
               

                <Tab eventKey="StudentCommunication" title="Student Communication">
                  <h2>Student Communication</h2>
                <br></br>

                <Row>
                  <Col style={{display:'none'}}>
                  <input type='text' id='txtStudentIDHidden' />
                  </Col>
                </Row>

                <Row>
                  <Col sm={1.75} style={{ paddingRight: 10 }}>
                    Student ID
                  </Col>
               
                  <Col sm={2}>
                    <input type='text' id='txtStudentID' />
                  </Col>
                </Row>
                <br></br>
                <Row>
                  <Col sm={1.75} style={{ paddingRight: 10 }}>
                    Last Name
                  </Col>
              
                  <Col sm={2}>
                    <input type='text' id='txtLastName' />
                  </Col>
                </Row>


                <br></br>
                <Row>
                  <Col sm={1.75} style={{ paddingRight: 40 }}>
                    School
                  </Col>

                  <Col sm={2}>
                    <SchoolListDropDown
                      handleChange={(e) => dummyHandleChange(e)}
                      name='ddSchoolListings_SearchStudent' />
                  </Col>
                </Row>

                <br></br>

                <Row>
                  <Col sm={12}>
                    <Button variant="outline-primary" onClick={(e) => searchMixed(e)}>Search</Button>
                  </Col>
                </Row>

                <br></br>

                  <Row>
                    <Col sm={12}>
                     <label id="lblStudentInfo"></label> 
                    <BootstrapTable   
                      striped
                      hover
                      keyField='Student_ID'
                      data={tblSearchStudents}
                      columns={columns}
                      pagination={ paginationFactory()}
                      rowStyle={rowStyle}
                    
                    />
                    </Col>
                  </Row>
          
                  <br></br>
                   <Row className="mb-3"
                        style={{display:showNotesAndSaveButton}}
                        >
                        <Form.Group className="mb-3">
                            <Form.Label>Communication Notes</Form.Label>
                            <Form.Control
                            as="textarea"
                            name='CommNotes'
                            id='CommNotes'
                            style={{ height: '100px',width:1000 }}
                            
                        />
                        </Form.Group>
                    </Row>

                    <Row 
                      style={{display:showNotesAndSaveButton}}>
                    <Col sm={12}
                        >
                      <Button variant="outline-primary" onClick={(e) => saveCommNotes(e)}>Save</Button>
                    </Col>
                    </Row>
   
                </Tab>
              </Tabs>
          </Form>
      </Container>
     </main>
    </div>
  )
}

export default Communications