import React, {useState} from 'react'
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import {Button,
    Card,
    Container,
    Row,
    Col,
    Image} from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import {BinocularsFill} from 'react-bootstrap-icons';
import { Pencil  } from 'react-bootstrap-icons';
import BootStrapSelectForSearch from '../ReusableAppComponents/BootStrapSelectForSearch';
import SchoolListDropDown from '../ReusableAppComponents/SchoolListDropDown';
import SchoolYearDropDown from '../ReusableAppComponents/SchoolYearDropDown';
import studentInfoApi from '../../api/studentInfoApi';
import ModalForStudentSearch from '../GenericModal/ModalForStudentSearch';

//react bootstrap table next
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

  

function Search() {
  const history = useHistory();
  const [tblSearchResults, setSearchResults] = useState([])
  const [_studentid_, setStudentID] = useState('');
  const [currentSchoolName,setCurrentSchoolName]= useState('');
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [student, setStudent] = useState({ id  :'',  
                                              Student_ID  :'',
                                              LastName :'', 
                                              FirstName  :'',
                                              School  :'',                     
                                              Disabled  :'',
                                              LTA  :'',
                                              SupplementName  :'',
                                              CurrentOrderDate  :'',
                                              CurrentOrder  :'',
                                              Notes  :'',
                                              NeedsF_U  :'',
                                              Date_Processed  :'',
                                              Date_Received  :'',
                                              Current_Student  :'',
                                              Milk_Sub  :'',
                                              Medical_Condition  :'',
                                              Foods_to_be_Omitted  :'',
                                              Substitution  :'',
                                              Texture_Modification  :'',
                                              Milk_Sub_Name  :'',
                                              Diet_Order_Notes  :'',
                                              Menu_Code  :'',
                                              Birthday  :'',                                
                                              NPO  :'',
                                              Menu_Color  :'',
                                              Inactive  :'',
                                              SchoolYear  :'',
                                              SupplementNameMore  :'',
                                              Texture_Modification2  :''});
    
  
 useEffect(() => {
   // fetchSchoolListingData();
},[]);


useEffect(() => {
  //fetchSchoolYears();
},[]);

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
      setSearchResults(_SEARCH_DATA)
      //console.log(_SEARCH_DATA)
 }

 async function fetchSearchData_LIKE_CLAUSES(_SEARCH_STRING_) {         
  let _SEARCH_DATA = [];
  var myAPI = new studentInfoApi;

  try
  {
    _SEARCH_DATA = await myAPI.fetchSearchData_LIKE_CLAUSES(_SEARCH_STRING_)
  }
  catch(err)
  {
    console.log(err)
  }
  
  setSearchResults(_SEARCH_DATA)
  //console.log(_SEARCH_DATA)
}

function handleChange (e){
  const { name, value } = e.target;
  e.preventDefault();
  
}

     //only three values FirstName,LastName,School
  const searchMixed = () => {

    var _SEARCH_STRING = '';

    var studentID = document.getElementById('txtStudentID');
    var FirstName = document.getElementById('txtFirstName');
    var LastName = document.getElementById('txtLastName');
    var SchoolYear = document.getElementById('ddSchoolYears');
    var School = document.getElementById('ddSchoolListings');

    var ddMatch = document.getElementById('ddMatch');
     if(ddMatch.value == 'anyCriteria')
     {
            if (studentID.value != "" &&
              FirstName.value == "" &&
              LastName.value == "" &&
              SchoolYear.value == "--Select--" &&
              School.value == "--Select--") {
              //Search By Student ID  - WORKS!!!
              console.log('Search By Student ID')
              _SEARCH_STRING += "SELECT id,Student_ID,School,SchoolYear,LastName,FirstName,Current_Student FROM StudentEntryData WHERE Student_ID =";
              _SEARCH_STRING += "'";
              _SEARCH_STRING += studentID.value;
              _SEARCH_STRING += "'";
              console.log(_SEARCH_STRING);
              fetchSearchData(_SEARCH_STRING);


            }
            else if (studentID.value == "" &&
              FirstName.value != "" &&
              LastName.value == "" &&
              SchoolYear.value == "--Select--" &&
              School.value == "--Select--") {
              //Search By First Name 
              //only three values FirstName,LastName,School
              console.log('Search By First Name')
              _SEARCH_STRING += FirstName.value
              _SEARCH_STRING += "|"
              _SEARCH_STRING += "-"
              _SEARCH_STRING += "|"
              _SEARCH_STRING += "-"
              _SEARCH_STRING += "|"
              _SEARCH_STRING += "FIRST_NAME"
              console.log("SEARCH_TYPE : FIRST_NAME");
              fetchSearchData_LIKE_CLAUSES(_SEARCH_STRING);


            }
            else if (studentID.value == "" &&
              FirstName.value == "" &&
              LastName.value != "" &&
              SchoolYear.value == "--Select--" &&
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

              console.log("SEARCH_TYPE : LAST_NAME");
              fetchSearchData_LIKE_CLAUSES(_SEARCH_STRING);


            }
            else if (studentID.value == "" &&
              FirstName.value == "" &&
              LastName.value == "" &&
              SchoolYear.value != "--Select--" &&
              School.value == "--Select--") {
              //Search By School Year - WORKS!!!
              console.log('Search By School Year ')
              _SEARCH_STRING += "SELECT id,Student_ID,School,SchoolYear,LastName,FirstName,Current_Student FROM StudentEntryData WHERE SchoolYear =";
              _SEARCH_STRING += "'";
              _SEARCH_STRING += SchoolYear.value;
              _SEARCH_STRING += "'";
              console.log(_SEARCH_STRING);
              fetchSearchData(_SEARCH_STRING);

            }
            else if (studentID.value == "" &&
              FirstName.value == "" &&
              LastName.value == "" &&
              SchoolYear.value == "--Select--" &&
              School.value != "--Select--") {
              //Search By School Name  - WORKS!!!
              console.log('Search By School Name')
              _SEARCH_STRING += "SELECT id,Student_ID,School,SchoolYear,LastName,FirstName,Current_Student FROM StudentEntryData WHERE School =";
              _SEARCH_STRING += "'";
              _SEARCH_STRING += School.value;
              _SEARCH_STRING += "'";
              console.log(_SEARCH_STRING);
              fetchSearchData(_SEARCH_STRING);

            }
            else if (studentID.value == "" &&
              FirstName.value != "" &&
              LastName.value != "" &&
              SchoolYear.value == "--Select--" &&
              School.value == "--Select--") {
              //Search By Last Name and First Name
              console.log('Search By Last Name and First Name')
              _SEARCH_STRING += FirstName.value
              _SEARCH_STRING += "|"
              _SEARCH_STRING += LastName.value
              _SEARCH_STRING += "|"
              _SEARCH_STRING += "-"
              _SEARCH_STRING += "|"
              _SEARCH_STRING += "LAST_FIRST_NAME"
              console.log("SEARCH_TYPE : LAST_FIRST_NAME");
              fetchSearchData_LIKE_CLAUSES(_SEARCH_STRING);

            }
            else if (studentID.value == "" &&
              FirstName.value != "" &&
              LastName.value != "" &&
              SchoolYear.value == "--Select--" &&
              School.value != "--Select--") {
              //Search By Last Name and First Name and School Name
              console.log('Search By Last Name and First Name and School Name')
              _SEARCH_STRING += FirstName.value
              _SEARCH_STRING += "|"
              _SEARCH_STRING += LastName.value
              _SEARCH_STRING += "|"
              _SEARCH_STRING += School.value
              _SEARCH_STRING += "|"
              _SEARCH_STRING += "LAST_FIRST_NAME_SCHOOL"

              console.log("SEARCH_TYPE : LAST_FIRST_NAME_SCHOOL");
              fetchSearchData_LIKE_CLAUSES(_SEARCH_STRING);

            }
            else {
              setSearchResults([])
            }
        }  //anyCriteria
        else if (ddMatch.value == 'allCriteria'){

          if (studentID.value != "" &&
              FirstName.value != "" &&
              LastName.value != "" &&
              SchoolYear.value != "--Select--" &&
              School.value != "--Select--") {
              //Search By all criteria
              console.log('Search all criteria')
              _SEARCH_STRING += studentID.value;
              _SEARCH_STRING += "|"
              _SEARCH_STRING += FirstName.value
              _SEARCH_STRING += "|"
              _SEARCH_STRING += LastName.value
              _SEARCH_STRING += "|"
              _SEARCH_STRING += School.value
              _SEARCH_STRING += "|"
              _SEARCH_STRING += SchoolYear.value;
              _SEARCH_STRING += "|"
              _SEARCH_STRING += "ALL_CRITERIA"

              console.log("SEARCH_TYPE : ALL_CRITERIA");
              fetchSearchData_LIKE_CLAUSES(_SEARCH_STRING);

            }
            else {
              setSearchResults([])
            }
           
        } //allCriteria
  }

  function showRowDetailInfo(_id){
    console.log("Id from Row",_id)
    fetchSingeRecordByRecordID(_id);
    /*
    setItemName(_name)  // const [_ItemName,setItemName]  = useState("")
  
    setShow(true)
    //pause the thread for 1/2 second to give the modal time to render
    // we don't use const [_ItemName,setItemName], but we refer to the _ItemName on edit
    setTimeout(() => {  document.getElementById('oldValue').setAttribute('value',_name); }, 500); 
    */
    setShow(true);
  }

  /*MODAL ACTIONS */
  const closeModalPrimary = () =>
  {
      setShow(false)
    
  }

  const closeModalSecondary = () =>
  {
      setShow2(false)
  }


  async function EditStudent(){
    
    setShow(false)
      await getNewValuesForStudentDataObject();
      
      var myAPI = new studentInfoApi;
      var _response = await myAPI.AddOrUpdateStudentRecordFromSearch(student);
      if(_response > 0)
      {
        history.push(
          {
            pathname: '/StudentDataEntry',
            search: '?id=' + student.id,
            fullName: student.FirstName + ' ' + student.LastName
    
          })
      }
     
  }

  async function ADD_New_Item(){

    /*
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
  
  
    //console.log("Drop Down Type :" + DDType)
  
    var argument  = '';
  
     if (_ItemNameNew.length > 0
     )
     {
        argument += _ItemNameNew
        argument += "|";
        argument += DDType
     } 
     
  
     //console.log("SQL Statement :" + argument)
     //console.log("Inside of the ADD_New_DDItem method")
  
  
    var myAPI = new studentInfoApi;
    await myAPI.ADD_DDListItem(argument)
    
    setShow2(false);
    onDDChangedAddNewItem();
    */
      
  }

  function handleChangeFromStudentDataEntry (e){
    const { name, value } = e.target;
   
   
    switch (name) {
        //TAB Student Information
        case 'Student_ID':
            setStudent({ ...student, Student_ID: value });
            setStudentID(student.Student_ID)
            if(_studentid_ != '')
            {
              setShouldDisplayAttachment('block')
            }
            else{
              setShouldDisplayAttachment('none')
            }
            break;
        case 'Current_Student':
            setStudent({ ...student, Current_Student: value });
            break;
        case 'ddSchoolListings':
            setStudent({ ...student, School: value });
            break;
        case 'FirstName':
            setStudent({ ...student, FirstName: value });
            break;
        case 'LastName':
            setStudent({ ...student, LastName: value });
            break;

        case 'Birthday':
            setStudent({ ...student, Birthday: value });
            break;

        case 'ddSchoolYears':
            setStudent({ ...student, SchoolYear: value });
            break;

        case 'Date_Received':
            setStudent({ ...student, Date_Received: value });
            break;
        case 'Date_Processed':
              setStudent({ ...student, Date_Processed: value });
              break;
        case 'Notes':
            setStudent({ ...student, Notes: value });
            break;
        
        //TAB Dietary Accommodations
        case 'Disabled':
          setStudent({ ...student, Disabled: value });
          break;
        case 'LTA':
          setStudent({ ...student, LTA: value });
          break;
        case 'NeedsF_U':
          setStudent({ ...student, NeedsF_U: value });
          break;
        case 'Medical_Condition':
          setStudent({ ...student, Medical_Condition: value });  
          break;
       
        /*DROP- DOWNS - SUPPLEMENTS  - HIDDEN FIELDS*/
        case 'Foods_to_be_Omitted':
              setStudent({ ...student, Foods_to_be_Omitted: value }); 
            break; 

        case 'Substitution':
          setStudent({ ...student, Substitution: value });
        break;
        case 'ddMenuColor':
          setStudent({ ...student, Menu_Color: value });
          populateMenuCodeDropDown();
        break;
        case 'ddMenuCode':
          setStudent({ ...student, Menu_Code: value });
        break;
        case 'Texture_Modification':
          setStudent({ ...student, Texture_Modification: value });
        break;
        case 'Texture_Modification2':
          setStudent({ ...student, Texture_Modification2: value });
        break;

        /*DROP- DOWNS - SUPPLEMENTS  - HIDDEN FIELDS*/
        case 'SupplementName':
          setStudent({ ...student, SupplementName: value });
        break;
        case 'Milk_Sub_Name':
          setStudent({ ...student, Milk_Sub_Name: value });
        break;

        case 'NPO':
          setStudent({ ...student, NPO: value });
        break;

        case 'SupplementNameMore':
          setStudent({ ...student, SupplementNameMore: value });
        break;


        //TAB Documentation
        case 'CurrentOrderDate':
          setStudent({ ...student, CurrentOrderDate: value });
        break;
        case 'Diet_Order_Notes':
          setStudent({ ...student, Diet_Order_Notes: value });
        break;


            default:
            break;  
    }

   // console.log(user)
  }

  async function fetchSingeRecordByRecordID(id) { 
    await fetchSchoolListingData();
    await fetchSchoolYears();
    let _DD_STUDENT_RECORD_DATA = [];
    var myAPI = new studentInfoApi;
    _DD_STUDENT_RECORD_DATA = await myAPI.fetchSingeRecordByRecordID(id)
   
    student.id = _DD_STUDENT_RECORD_DATA[0].id
    setStudentID(_DD_STUDENT_RECORD_DATA[0].Student_ID)
    await populateFormWithStudentData(_DD_STUDENT_RECORD_DATA);
    await setDropDownValuesAndSchoolListings(_DD_STUDENT_RECORD_DATA[0].School)
    await setDropDownValuesForSchoolYear(_DD_STUDENT_RECORD_DATA[0].SchoolYear)
    //console.log(student)

   }

async function fetchSchoolListingData() {        
    let _SCHOOL_LISTING_DATA = [];
    var myAPI = new studentInfoApi;
    _SCHOOL_LISTING_DATA = await myAPI.fetchSchoolListings()
   
    var _DDSchoolListingSelect = document.getElementById('ddSchoolListings2'); 

    _DDSchoolListingSelect.options[_DDSchoolListingSelect.options.length] = new Option('--Select--');
    for(const key in _SCHOOL_LISTING_DATA) {     
       _DDSchoolListingSelect.options[_DDSchoolListingSelect.options.length] = new Option(_SCHOOL_LISTING_DATA[key].NameOfInstitution);
    }
 
}

async function setDropDownValuesAndSchoolListings(schoolName)
{
  
      var _School = document.getElementById('ddSchoolListings2');
      _School.value = schoolName
      setCurrentSchoolName(schoolName);
}
async function fetchSchoolYears() {         
  let _SCHOOL_YEAR_DATA = [];
  var myAPI = new studentInfoApi;
  _SCHOOL_YEAR_DATA = await myAPI.fetchSchoolYears()
 
  var _DDSchoolYearSelect = document.getElementById('dd_school_years_modal'); 

  _DDSchoolYearSelect.options[_DDSchoolYearSelect.options.length] = new Option('--Select--');
  for(const key in _SCHOOL_YEAR_DATA) {     
      _DDSchoolYearSelect.options[_DDSchoolYearSelect.options.length] = new Option(_SCHOOL_YEAR_DATA[key]);
  }

 }

async function setDropDownValuesForSchoolYear(schoolYear)
{
  var _SchoolYear = document.getElementById('dd_school_years_modal');
  _SchoolYear.value = schoolYear
}

async function populateFormWithStudentData(fieldData)
{
     
    student.SchoolYear= fieldData[0].SchoolYear
    student.School= fieldData[0].School

     var _Student_ID = document.getElementById('Student_ID');
     _Student_ID.value = fieldData[0].Student_ID
     student.Student_ID = _Student_ID.value;
     

     var _FirstName = document.getElementById('FirstName');
     _FirstName.value = fieldData[0].FirstName
     student.FirstName =_FirstName.value;

 
     var _LastName = document.getElementById('LastName');
     _LastName.value = fieldData[0].LastName
     student.LastName = _LastName.value;
   
     var _Birthday = document.getElementById('Birthday');
     var dtTemp = new Date(fieldData[0].Birthday)
     var formmatteTrueDate = formatDate(dtTemp).split(' ');
     _Birthday.value = formmatteTrueDate[0]
     student.Birthday = _Birthday.value;

    
     
     var _Date_Received = document.getElementById('Date_Received');
     var dtTemp = new Date(fieldData[0].Date_Received)
     var formmatteTrueDate = formatDate(dtTemp).split(' ');
     _Date_Received.value  = formmatteTrueDate[0]
     student.Date_Received = _Date_Received.value;
 
     var _Date_Processed = document.getElementById('Date_Processed');
     var dtTemp = new Date(fieldData[0].Date_Processed)
     var formmatteTrueDate = formatDate(dtTemp).split(' ');
     _Date_Processed.value  = formmatteTrueDate[0]
     student.Date_Processed = _Date_Processed.value;


     var _Notes = document.getElementById('Notes');
     _Notes.value = fieldData[0].Notes
     student.Notes = _Notes.value

}

async function getNewValuesForStudentDataObject()
{
    var _SchoolYear = document.getElementById('dd_school_years_modal');
    student.SchoolYear= _SchoolYear.value;

    var _school = document.getElementById('ddSchoolListings2');
    student.School= _school.value;

     var _Student_ID = document.getElementById('Student_ID');
     student.Student_ID = _Student_ID.value;
     

     var _FirstName = document.getElementById('FirstName');
     student.FirstName =_FirstName.value;

 
     var _LastName = document.getElementById('LastName');
     student.LastName = _LastName.value;
   
     var _Birthday = document.getElementById('Birthday');
     var dtTemp = new Date(_Birthday.value)
     var formmatteTrueDate = formatDate(dtTemp).split(' ');
     _Birthday.value = formmatteTrueDate[0]
     student.Birthday = _Birthday.value;

    
     var _Date_Received = document.getElementById('Date_Received');
     var dtTemp = new Date(_Date_Received.value)
     var formmatteTrueDate = formatDate(dtTemp).split(' ');
     _Date_Received.value  = formmatteTrueDate[0]
     student.Date_Received = _Date_Received.value;
 
     var _Date_Processed = document.getElementById('Date_Processed');
     var dtTemp = new Date(_Date_Processed.value)
     var formmatteTrueDate = formatDate(dtTemp).split(' ');
     _Date_Processed.value  = formmatteTrueDate[0]
     student.Date_Processed = _Date_Processed.value;


     var _Notes = document.getElementById('Notes');
     student.Notes = _Notes.value

}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      // padTo2Digits(date.getSeconds()),  // 👈️ can also add seconds
    ].join(':')
  );
}

  function CellFormatter(cell, row) {
    
    return (
       /*
       <div><BinocularsFill 
        onClick={() => history.push(
          {
            pathname: '/StudentDataEntry',
            search: '?id=' + row.id,
            fullName: row.FirstName + ' ' + row.LastName

          }
        )}/></div>
        */
        <div>
            <Pencil 
              onClick={()=>showRowDetailInfo(row.id)}/>
          </div>

        );
  }

     //for the row height fix
  const rowStyle = {  height: '10px', padding: '2px 0' };

  const columns = [
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
  {
    dataField: 'id',
    text: 'Edit',
    formatter: CellFormatter,
    style: { width: '10px' }
  },
  ];

  return (
    <div>
    <main>
       <Container>  
           <h1>Search Student Records</h1>   
           <br></br>    
         <Row>
           <Col sm={1.75} style={{paddingRight:10,marginLeft:12,width:150}}>
               Student ID
           </Col>
           <Col sm={1.5}>
             <BootStrapSelectForSearch name ="selStudentID" />
           </Col>
           <Col sm={2}>
               <input type='text' id='txtStudentID' style={{ width:300}}/>
           </Col>
         </Row>
           <br></br>
         <Row>
           <Col sm={1.75} style={{paddingRight:10,marginLeft:12,width:150}}>
               Last Name
           </Col>
           <Col sm={1.5}>
             <BootStrapSelectForSearch name ="selLastName" />
           </Col>
           <Col sm={2}>
               <input type='text' id='txtLastName' style={{ width:300}}/>
           </Col>
         </Row>

         <br></br>
         <Row>
           <Col sm={1.75} style={{paddingRight:10,marginLeft:12,width:150}}>
               First Name
           </Col>
           <Col sm={1.5}>
             <BootStrapSelectForSearch name ="selFirstName" />
           </Col>
           <Col sm={2}>
               <input type='text' id='txtFirstName' style={{ width:300}}/>
           </Col> 
         </Row>

         <br></br>
         <Row>
           <Col sm={1.75} style={{paddingRight:40,marginLeft:12,width:150}}>
               School
           </Col>
           <Col sm={1.5}>
               <BootStrapSelectForSearch />
           </Col>
           <Col sm={2}>
               <SchoolListDropDown 
                 handleChange = {(e) =>handleChange(e)}
                 name='ddSchoolListings'/>
           </Col>
         </Row>

         <br></br>
         <Row>
           <Col sm={1.75} style={{paddingRight:8,marginLeft:12,width:150}}>
               School Year
           </Col>
           <Col sm={1.5}>
               <BootStrapSelectForSearch />
           </Col>
           <Col sm={2}>
              <SchoolYearDropDown 
               name='ddSchoolYears'
               onChange={handleChange}/>
           </Col>
         </Row>

         <br></br>
         <Row>
           <Col sm={1.75} style={{ paddingRight: 8 ,marginLeft:12,width:150}}>
               Match
           </Col>
           <Col sm={1.5}>
           <select class="form-select form-select-sm" 
              aria-label=".form-select-sm example" 
              style={{ width: 110,marginRight:20}} id='ddMatch'>
              <option value="anyCriteria">any criteria</option>
              <option value="allCriteria">all criteria</option>
            </select>
           </Col>
           <Col sm={2}>
            
           </Col>
         </Row>

         <br></br>
         <Row>
           <Col sm={12}>
             <Button variant="outline-primary" onClick={() => searchMixed()}>Search</Button>
           </Col>
         </Row>

        <br></br>
        <hr></hr>
        <Row>
          <Col sm={12}> 
            <h2>Search Results</h2>

              <BootstrapTable
                striped
                hover
                keyField='id'
                data={tblSearchResults}
                columns={columns}
                pagination={paginationFactory()}
                rowStyle={rowStyle}

              />
          </Col>
        </Row>
               <Row>
                  <Col sm={12}>
                    <ModalForStudentSearch
                      actionLabel = "Edit"
                      title = "Student"
                      showPrimaryModal={show}
                      close="Close"
                      Submit="Submit"
                      handleClickOne={() => EditStudent}
                      handleClosePrimary={() => closeModalPrimary}
                      handleChange={() => handleChange}

                    />

                    {/*
                    <ModalForStudentSearch
                       actionLabel = "Add"
                       title = "Student"
                       showPrimaryModal={show2}
                       close="Close"
                       Submit="Submit"
                       handleClickOne={() => ADD_New_Item}
                       handleClosePrimary={() => closeModalSecondary}
                    />
                  */}
                
                  </Col>
                </Row>

       </Container>
    </main>
    </div>
  )
}

export default Search