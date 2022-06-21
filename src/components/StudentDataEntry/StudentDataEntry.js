import React from 'react'
import {useState} from 'react';
import {Button,
    Container,
    Row,
    Col,Form,Tabs,Tab} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
//reusable components
import GenericMultiSelectCombo from '../ReusableAppComponents/GenericMultiSelectCombo';
import SchoolListDropDown from '../ReusableAppComponents/SchoolListDropDown';
import SchoolYearDropDown from '../ReusableAppComponents/SchoolYearDropDown';
import AlertDismissible from '../ReusableAppComponents/AlertDismissible';
import UploadFilesLight from '../Upload/upload-files.component';
import studentInfoApi from '../../api/studentInfoApi';

//react bootstrap table next
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

//for modal
import GenericModal from '../GenericModal/GenericModal';
import { useEffect } from 'react';

//redux
import {connect} from 'react-redux';

//location
//https://www.codegrepper.com/code-examples/javascript/history.push+with+params
import { useLocation } from 'react-router-dom';

//function StudentDataEntry({userProps}) {
  const StudentDataEntry = ({userProps}) => {
    const location  = useLocation();
    const [storeFullNameFromSearch, setFullNameFromSearch] = useState([])
    const [recordSuccessShowHide,setrecordSuccessShowHide] = useState(['block'])

    //alert WireUp *******
    //controls import AlertDismissible from '../ReusableAppComponents/AlertDismissible';
    const [showAlert, setShowAlert] = useState(false);
    const [successMsg,setsuccessMsg] = useState('');
    const [msgBody,setmsgBody] = useState('');
    const [msgBody2,setmsgBody2] = useState('');
    const [shouldReturnToMain,setshouldReturnToMain] = useState(false);
    const [_studentid_, setStudentID] = useState('');
    const [shouldDisplayAttachment,setShouldDisplayAttachment] = useState(['none'])
    const [tblFiles, setTblFileData] = useState([])

    //men_color/code
    const [_listGreen, setlistGreen] = useState([])
    const [_listBlueCycle, setistBlueCycle] = useState([])
    const [_listRed, setlistRed] = useState([])

   const history = useHistory();

    //CUT DOWN TO 31 FIELDS (THIS IS ALL YOU ARE USING ON THE SERVICE SIDE)
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
                                              Texture_Modification2  :'',
                                              Menu_Code_Custom:'',
                                              FTBO_Custom:''});

    const [currentSchoolName,setCurrentSchoolName]= useState('');
    const [currentMedicalCondition,setcurrentMedicalCondition]= useState('');


    //security
    const [userRole,setuserRole]=  useState("NONE");


   //useEffect Methods ***********
   useEffect(() => {
    console.log('Logged In User: ' + userProps.fullName)
    console.log('Logged In User Login Id: ' + userProps.loginId)
    console.log('User Role ' + userProps.role)
    const _queryID = location.search;
    if(_queryID != '')
    {
        var id = _queryID.substring(_queryID.indexOf('=') + 1);
        student.id = id;
       
        fetchSingeRecordByRecordID(id) ;
        setStudentID(student.Student_ID);
       
    }
    else{
      //means this is a new record
      //this used to be in a reusable control, moved this component
      fetchSchoolListingData();
      setSchoolYearValue('new');

      var _Current_Student = document.getElementById('Current_Student');
      _Current_Student.checked = true
      student.Current_Student = 1;
    }
    
   }, [location]);

  useEffect(() => {
    fetchSearchDDListDataFTBO();
  },[]);

  useEffect(() => {
    fetchSearchDDListDataNutSub();
  },[]);

  useEffect(() => {
    fetchSearchDDListDataMilkSub();
  },[]);

  useEffect( () => {
    var _DDSchoolListingSelect = document.getElementById('ddSchoolListings');
    setCurrentSchoolName(_DDSchoolListingSelect.value);
  },[]);

  useEffect( () => {
    var _Medical_Condition = document.getElementById('Medical_Condition');
    setcurrentMedicalCondition(_Medical_Condition.value);
  },[]);

  useEffect(()=>{
    fetchUserRoleInfo(userProps.loginId)
   },[])

   useEffect(()=>{
    getMenuCodeListItems()
   },[])


  //useEffect Methods END ***********

 /* MENU COLOR MENU CODE FETCHES*/
  async function getMenuCodeListItems() {    
    var myAPI = new studentInfoApi;    
    let _DD_LIST_DATA = [];
   
    _DD_LIST_DATA = await myAPI.getMenuCodeList('Blue')
    setistBlueCycle(_DD_LIST_DATA);

    _DD_LIST_DATA = [];
    _DD_LIST_DATA = await myAPI.getMenuCodeList('Red')
    setlistRed(_DD_LIST_DATA);

    _DD_LIST_DATA = [];
    _DD_LIST_DATA = await myAPI.getMenuCodeList('Green')
    setlistGreen(_DD_LIST_DATA);
    //console.log(_DD_LIST_DATA);

   }



    /* MENU COLOR MENU CODE FETCHES END*/
  
  async function fetchUserRoleInfo(adUserID) {         
    let _SEARCH_DATA = [];
    
    var myAPI = new studentInfoApi;
    try
    {
      _SEARCH_DATA = await myAPI.fetchUserRoleInfo(adUserID)
    }
    catch(err)
    {
      console.log(err)
      setuserRole('NONE')
    }
  
    if (_SEARCH_DATA.length > 0)
    {
    
      setuserRole(_SEARCH_DATA[0].Role)
    }
    else{
      console.log('Role Not found...');
      setuserRole('NONE')
    }
  
  }

  const populateStudentLabelAddNewRecord = async ()=> {
    var LastName = student.LastName;
    var FirstName = student.FirstName;
    
    var _studentID = document.getElementById('Student_ID');
    var Student_ID = _studentID.value;
    var _DDSchoolListingSelect = document.getElementById('ddSchoolListings');
    var School = _DDSchoolListingSelect.value;

    var _setstudentInfo = LastName;
    _setstudentInfo += ",";
    _setstudentInfo += FirstName;
    _setstudentInfo += " ";
    _setstudentInfo += Student_ID;
    _setstudentInfo += " ";
    _setstudentInfo +=  School;
    setFullNameFromSearch(_setstudentInfo)
  }


  async function fetchSingeRecordByRecordID(id) { 
    await fetchSchoolListingData();       
    let _DD_STUDENT_RECORD_DATA = [];
    var myAPI = new studentInfoApi;
    _DD_STUDENT_RECORD_DATA = await myAPI.fetchSingeRecordByRecordID(id)

    var _setstudentInfo = _DD_STUDENT_RECORD_DATA[0].LastName;
    _setstudentInfo += ",";
    _setstudentInfo += _DD_STUDENT_RECORD_DATA[0].FirstName;
    _setstudentInfo += " ";
    _setstudentInfo += _DD_STUDENT_RECORD_DATA[0].Student_ID;
    _setstudentInfo += " ";
    _setstudentInfo +=  _DD_STUDENT_RECORD_DATA[0].School;
    setFullNameFromSearch(_setstudentInfo)

    setcurrentMedicalCondition(_DD_STUDENT_RECORD_DATA[0].Medical_Condition);

    student.id = _DD_STUDENT_RECORD_DATA[0].id
    setStudentID(_DD_STUDENT_RECORD_DATA[0].Student_ID)
    if(_DD_STUDENT_RECORD_DATA[0].Student_ID != '')
      {
        setShouldDisplayAttachment('block')
        
      }
      else{
        setShouldDisplayAttachment('none')
      }

    // YOU CAN ONLY DO ALERTS INSIDE OF A ASYNCH FUNCTION
    await populateFormWithStudentData(_DD_STUDENT_RECORD_DATA);
    //by the time this the base fields are rendered, we ca.sn now set the drop-downs for the
    //School Year and School (using async to pause the thread)
    await setDropDownValuesAndSchoolListings(_DD_STUDENT_RECORD_DATA[0].School)
    //await setDropDownValuesForSchoolYear(_DD_STUDENT_RECORD_DATA[0].SchoolYear)

    if(_DD_STUDENT_RECORD_DATA[0].School != "")
    {
      await fetchSchoolWideTrainingNotes(_DD_STUDENT_RECORD_DATA[0].School,_DD_STUDENT_RECORD_DATA[0].SchoolYear);
    }

    if(_DD_STUDENT_RECORD_DATA[0].School != "")
    {
      await fetchSchoolTrainingNotes(_DD_STUDENT_RECORD_DATA[0].School);
    }
    
    if(_DD_STUDENT_RECORD_DATA[0].Student_ID != "")
    {
      await fetchCommNotes(_DD_STUDENT_RECORD_DATA[0].Student_ID,_DD_STUDENT_RECORD_DATA[0].SchoolYear);
    }
    

    var _btnfetchAttach = document.getElementById('btnFetchAttachments'); 
    _btnfetchAttach.click();

  
   }


   //let optionsDDSelections = ['--Select--','Foods To Be Ommitted', 'Nutrition Supplement', 'Milk Substitute'];
   //FETCH METHODS FOR THE THREE DROPDOWN SUPPLEMENT (CALLED ON FORM LOAD - useEffect())
   async function fetchSearchDDListDataFTBO() {        
    let _DD_LIST_DATA = [];
    var myAPI = new studentInfoApi;
    _DD_LIST_DATA = await myAPI.fetchSearchDDListData('Foods To Be Omitted')

    var _DDSSelect = document.getElementById('ddFTBOList'); 
      //clear list to add new ones
    _DDSSelect.innerHTML = "";
      
    _DDSSelect.options[_DDSSelect.options.length] = new Option('--Select--');
    for(const key in _DD_LIST_DATA) {     
          _DDSSelect.options[_DDSSelect.options.length] = new Option(_DD_LIST_DATA[key].ItemName);
    }
   }

   async function fetchSearchDDListDataNutSub() {        
    let _DD_LIST_DATA = [];
    var myAPI = new studentInfoApi;
    _DD_LIST_DATA = await myAPI.fetchSearchDDListData('Nutrition Supplements')

    var _DDSSelect = document.getElementById('ddNutSubList'); 
      //clear list to add new ones
    _DDSSelect.innerHTML = "";
      
    _DDSSelect.options[_DDSSelect.options.length] = new Option('--Select--');
    for(const key in _DD_LIST_DATA) {     
          _DDSSelect.options[_DDSSelect.options.length] = new Option(_DD_LIST_DATA[key].ItemName);
    }
   }

   async function fetchSearchDDListDataMilkSub() {        
    let _DD_LIST_DATA = [];
    var myAPI = new studentInfoApi;
    _DD_LIST_DATA = await myAPI.fetchSearchDDListData('Milk Substitutes')

    var _DDSSelect = document.getElementById('ddMilkSubList'); 
      //clear list to add new ones
    _DDSSelect.innerHTML = "";
      
    _DDSSelect.options[_DDSSelect.options.length] = new Option('--Select--');
    for(const key in _DD_LIST_DATA) {     
          _DDSSelect.options[_DDSSelect.options.length] = new Option(_DD_LIST_DATA[key].ItemName);
    }
   }

   async function fetchSchoolListingData() {        
    let _SCHOOL_LISTING_DATA = [];
    var myAPI = new studentInfoApi;
    _SCHOOL_LISTING_DATA = await myAPI.fetchSchoolListings()
   
    var _DDSchoolListingSelect = document.getElementById('ddSchoolListings'); 

    _DDSchoolListingSelect.options[_DDSchoolListingSelect.options.length] = new Option('--Select--');
    for(const key in _SCHOOL_LISTING_DATA) {     
       _DDSchoolListingSelect.options[_DDSchoolListingSelect.options.length] = new Option(_SCHOOL_LISTING_DATA[key].NameOfInstitution);
    }
  }


//school wide training and communication notes

async function fetchSchoolWideTrainingNotes(_school,_year) {        
  let _SCHOOL_NOTE_DATA = [];
  var myAPI = new studentInfoApi;
  _SCHOOL_NOTE_DATA = await myAPI.fetchSchoolTrainingNotes(_school,'School Wide Training',_year)
  var _txtSchoolWideTraining = document.getElementById('txtSchoolWideTraining');
  _txtSchoolWideTraining.value = _SCHOOL_NOTE_DATA;

  }

  async function fetchSchoolTrainingNotes(_school) {        
    let _SCHOOL_NOTE_DATA = [];
    var myAPI = new studentInfoApi;
    _SCHOOL_NOTE_DATA = await myAPI.fetchSchoolTrainingNotes(_school,'School Training')
    //console.log(_SCHOOL_NOTE_DATA);
    var _txtSchoolTraining = document.getElementById('txtSchoolTraining');
    _txtSchoolTraining.value = _SCHOOL_NOTE_DATA;
   
    }

  async function fetchCommNotes(_studentID,_year) {        
    let _SCHOOL_NOTE_DATA = [];
    var myAPI = new studentInfoApi;
    _SCHOOL_NOTE_DATA = await myAPI.fetchCommNotes(_studentID,_year)
   
    var _txtStudentCommunicationNotes = document.getElementById('txtStudentCommunicationNotes');
    _txtStudentCommunicationNotes.value = _SCHOOL_NOTE_DATA;
   
    }

    

   //METHODS BELOW ARE FOR ADDING DROPDOWN VALUES TO HIDDEN SUPPLEMENT FIELDS
   const setDropDownSubstitutesFieldValues = (e) =>
   {
        e.preventDefault();
        
        //initalize the hidden suplement field values
        appendDropDownSubstitutesFieldValues('ddFTBOList_Selected','Foods_to_be_Omitted');
        appendDropDownSubstitutesFieldValues('ddNutSubList_Selected','SupplementName');
        appendDropDownSubstitutesFieldValues('ddMilkSubList_Selected','Milk_Sub_Name');

        var element = '';

        //make sure we get school year
        element = document.getElementById('SchoolYear');
        student.SchoolYear = element.value;

        //set the hidden suplement field values
        element = document.getElementById('Foods_to_be_Omitted');
        student.Foods_to_be_Omitted = element.value;

        element = document.getElementById('SupplementName');
        student.SupplementName = element.value;

        element = document.getElementById('Milk_Sub_Name');
        student.Milk_Sub_Name = element.value;

        //awlays grab the value (in case they pressed the button twice)
        element = document.getElementById('Student_ID');
        student.Student_ID = element.value;


        //my checked boxes
        element = document.getElementById('Disabled');
        if(element.checked) {
          student.Disabled = 1;
        } else {student.Disabled = 0}
        
        element = document.getElementById('LTA');
        if(element.checked) {
          student.LTA = 1;
        } else {student.LTA = 0}

        element = document.getElementById('NeedsF_U');
        if(element.checked) {
          student.NeedsF_U = 1;
        }else {student.NeedsF_U = 0}

        element = document.getElementById('Current_Student');
        if(element.checked) {
          student.Current_Student = 1;
        }else {student.Current_Student = 0}

        element = document.getElementById('NPO');
        if(element.checked) {
          student.NPO = 1;
        }else {student.NPO = 0}

   }

   const appendDropDownSubstitutesFieldValues=(ddListName,fieldName)=>
    {
      var _DDSSelect = document.getElementById(ddListName); 
      var _fieldName = document.getElementById(fieldName);
      var _strDDValues = '';

          Array.from(_DDSSelect.options).forEach(function(option_element) {
            let option_text = option_element.text;
            let option_value = option_element.value;
            _strDDValues += option_value;
            _strDDValues +=",";
        });

        if (_strDDValues.endsWith(','))
        {
          _fieldName.value = _strDDValues.substring(0,_strDDValues.length - 1);
        }
        else{
          _fieldName.value = _strDDValues;
        }
        
    }


  async function AddOrUpdateStudentRecord(e) {
      e.preventDefault()

      if(student.id != '')
      {
        //add logs if applicable
        //if this was an existing record
        var logResponse = await logChanges(e);
      }
     
      if(student.Student_ID != '' &&
        student.School != '' &&
        student.FirstName != '' &&
        student.LastName != '' &&
        student.schoolYear != '')
        { 
          await populateStudentLabelAddNewRecord();
        }
        else{
          window.alert("You must have at least the following: StudentID,School,First and Last Name and School Year");
          return;
        }

      ////make sure we keep the dropdown hidden values in sync as well as check boxes
      setDropDownSubstitutesFieldValues(e);

      var myAPI = new studentInfoApi;
      var _response = await myAPI.AddOrUpdateStudentRecord(student);
     
      if(_response)
      {
        window.alert("The Student Record has been successfully Added/Updated");
      }
      else{
        window.alert("There was a problem adding/updating record");
        return;
      }

    }

    async function populateFormWithStudentData(fieldData)
    {
     
    student.School= fieldData[0].School
    student.Menu_Color= fieldData[0].Menu_Color

    var _SchoolYear = document.getElementById('SchoolYear');
    _SchoolYear.value  = fieldData[0].SchoolYear
    student.SchoolYear = _SchoolYear.value;
    setSchoolYearValue('existing');

     var _Student_ID = document.getElementById('Student_ID');
     _Student_ID.value = fieldData[0].Student_ID
     student.Student_ID = _Student_ID.value;
     

     var _FirstName = document.getElementById('FirstName');
     _FirstName.value = fieldData[0].FirstName
     student.FirstName =_FirstName.value;

 
     var _LastName = document.getElementById('LastName');
     _LastName.value = fieldData[0].LastName
     student.LastName = _LastName.value;
   
    
     var _Notes = document.getElementById('Notes');
     _Notes.value = fieldData[0].Notes
     student.Notes = _Notes.value
 
    
     var _Medical_Condition = document.getElementById('Medical_Condition');
     _Medical_Condition.value = fieldData[0].Medical_Condition
     student.Medical_Condition = _Medical_Condition.value;
 
     /*
     var _Substitution = document.getElementById('Substitution');
     _Substitution.value = fieldData[0].Substitution
     student.Substitution = _Substitution.value;
     */
 
     
     var _Texture_Modification = document.getElementById('Texture_Modification');
     _Texture_Modification.value = fieldData[0].Texture_Modification
     student.Texture_Modification = _Texture_Modification.value;
    
     var _SupplementNameMore = document.getElementById('SupplementNameMore');
     _SupplementNameMore.value = fieldData[0].SupplementNameMore
     student.SupplementNameMore = _SupplementNameMore.value;
 
     
     var _Diet_Order_Notes = document.getElementById('Diet_Order_Notes');
     _Diet_Order_Notes.value = fieldData[0].Diet_Order_Notes
     student.Diet_Order_Notes = _Diet_Order_Notes.value;
     
 
     var _Texture_Modification2 = document.getElementById('Texture_Modification2');
     _Texture_Modification2.value = fieldData[0].Texture_Modification2
     student.Texture_Modification2 = _Texture_Modification2.value;

     //Supplement Multi-Selects
     var _Foods_to_be_Omitted = document.getElementById('Foods_to_be_Omitted');
     _Foods_to_be_Omitted.value = fieldData[0].Foods_to_be_Omitted
     renderMultiSelectsWithValuesFromFetch('ddFTBOList_Selected',_Foods_to_be_Omitted.value)
     student.Foods_to_be_Omitted = _Foods_to_be_Omitted.value;

     var _SupplementName = document.getElementById('SupplementName');
     _SupplementName.value = fieldData[0].SupplementName
     renderMultiSelectsWithValuesFromFetch('ddNutSubList_Selected', _SupplementName.value)
     student.SupplementName = _SupplementName.value;
  
     var _Milk_Sub_Name = document.getElementById('Milk_Sub_Name');
     _Milk_Sub_Name.value = fieldData[0].Milk_Sub_Name
     renderMultiSelectsWithValuesFromFetch('ddMilkSubList_Selected', _Milk_Sub_Name.value)
     student.Milk_Sub_Name = _Milk_Sub_Name.value;

     //new fields added
     //menu code custom
     var _Menu_Code_Custom = document.getElementById('Menu_Code_Custom');
     _Menu_Code_Custom.value = fieldData[0].Menu_Code_Custom
     student.Menu_Code_Custom = _Menu_Code_Custom.value;

     //FTBO_Custom
     var _FTBO_Custom = document.getElementById('FTBO_Custom');
     _FTBO_Custom.value = fieldData[0].FTBO_Custom
     student.FTBO_Custom = _FTBO_Custom.value;
   

     //Check Boxes
     var _Disabled = document.getElementById('Disabled');//check box
     if(fieldData[0].Disabled == 1)
     {
       _Disabled.checked = true
       student.Disabled = 1;
     }
     else
     {
      _Disabled.checked = false
      student.Disabled = 0;
     }
 
     var _Current_Student = document.getElementById('Current_Student');//check box
     if(fieldData[0].Current_Student == 1)
     {
       _Current_Student.checked = true
       student.Current_Student = 1;
     }
     else{
      _Current_Student.checked = false
      student.Current_Student = 0;
     }
    
     var _LTA = document.getElementById('LTA');//check box
     if(fieldData[0].LTA == 1)
     {
      _LTA.checked  = true
       student.LTA = 1;
     }
     else{
      _LTA.checked  = false
      student.LTA = 0;
     }
    
 
     var _NeedsF_U = document.getElementById('NeedsF_U');//check box
     if(fieldData[0].NeedsF_U == 1)
     {
       _NeedsF_U.checked  = true
       student.NeedsF_U = 1;
     }
     else{
      document.getElementById('NeedsF_U').checked  = false
      student.NeedsF_U = 0;
     }
  
 
     var _NPO = document.getElementById('NPO');//check box
     if(fieldData[0].NPO == 1)
     {
       _NPO.checked = true
       student.NPO = 1;
     }
     else{
      _NPO.checked = false
      student.NPO = 0;
     }


      //for dates
     //https://bobbyhadz.com/blog/javascript-set-values-input-date-time#:~:text=Use%20the%20value%20property%20on,%2C%20time%20and%20datetime%2Dlocal%20.
     var _CurrentOrderDate = document.getElementById('CurrentOrderDate');
     var dtTemp = new Date(fieldData[0].CurrentOrderDate)
     var formmatteTrueDate = formatDate(dtTemp).split(' ');
     _CurrentOrderDate.value = formmatteTrueDate[0]
     student.CurrentOrderDate = _CurrentOrderDate.value;

      
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
 
      //date field
     var _Date_Processed = document.getElementById('Date_Processed');
     var dtTemp = new Date(fieldData[0].Date_Processed)
     var formmatteTrueDate = formatDate(dtTemp).split(' ');
     _Date_Processed.value  = formmatteTrueDate[0]
     student.Date_Processed = _Date_Processed.value;

     
     var _Menu_Color = document.getElementById('ddMenuColor');
     _Menu_Color.value = fieldData[0].Menu_Color
     populateMenuCodeDropDown();
     var _Menu_Code = document.getElementById('ddMenuCode');
     _Menu_Code.value = fieldData[0].Menu_Code
     student.Menu_Code = _Menu_Code.value;

    }

    //THESE ARE THE DROP-DOWNS (RESUSABLE ASYNC FIX)
    async function setDropDownValuesAndSchoolListings(schoolName)
    {
  
      var _School = document.getElementById('ddSchoolListings');
      _School.value = schoolName
      setCurrentSchoolName(schoolName);
    }

    async function setDropDownValuesForSchoolYear(schoolYear)
    {
      var _SchoolYear = document.getElementById('ddSchoolYears');
      _SchoolYear.value = schoolYear
 
    }

    async function setSchoolYearValue(mode)
    {
      var myAPI = new studentInfoApi;
      //var _current_SchoolYear = await myAPI.getCurrentSchoolYear();
      var _current_SchoolYear = await myAPI.fetchMAXSchoolYear();
      var _SchoolYear = document.getElementById('SchoolYear');

      var btnSubmitSaveButton = document.getElementById('btnAddOrUpdateStudentRecord')

      if(mode == 'new')
      {
        _SchoolYear.value = _current_SchoolYear
        student.schoolYear = _SchoolYear.value;
        _SchoolYear.readOnly = true;
      }
      else if(mode == 'existing' )
      {
        _SchoolYear.readOnly = true;
        if(student.SchoolYear != _current_SchoolYear)
        {
          btnSubmitSaveButton.disabled = true;
        }
      }
    }

   function renderMultiSelectsWithValuesFromFetch(elementSelectedID,fieldValue)
   {
    if (fieldValue.length > 2) {
      var arrItems = fieldValue.split(',');
      var _mySelect2 = document.getElementById(elementSelectedID);
      arrItems.forEach(element => {
        _mySelect2.options[_mySelect2.options.length] = new Option( element, element);
      })
     }
   }

    //HANDLE CHANGE EVENT FOR WHEN A USER MAKES A CHANGE TO A FIELD ON THE FORM
    function handleChange (e){
      const { name, value } = e.target;
     
     
      switch (name) {
          //TAB Student Information
          case 'Student_ID':
              setStudent({ ...student, Student_ID: value });
              setStudentID(student.Student_ID)
              if(student.Student_ID != '')
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
          case 'SchoolYear':
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
         
          /*DROP- DOWNS - SUPPLEMENTS  - HIDDEN FIELDS*/ //
          case 'Foods_to_be_Omitted':
                setStudent({ ...student, Foods_to_be_Omitted: value }); 
              break; 
          case 'FTBO_Custom':
                setStudent({ ...student, FTBO_Custom: value }); 
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
          case 'Menu_Code_Custom':
            setStudent({ ...student, Menu_Code_Custom: value });
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
   
    const populateMenuCodeDropDown = () =>
    {
      
      var _ddMenuColor = document.getElementById('ddMenuColor');
      var _DDMenuCodeSelect = document.getElementById('ddMenuCode'); 
      removeOptions(_DDMenuCodeSelect);  //clear select first

     /*
      onst [_listGreen, setlistGreen] = useState([])
       const [_listBlueCycle, setistBlueCycle] = useState([])
      const [_listRed, setlistRed] = useState([])
     */

      /*
      const listBlueCycle = ['AF-CF','AF','AF + D','AF + D(Compliant)','AF + S','AF + S(Compliant)','CHO 60','Renal','Renal + Milk','Low PRO','Prader - Willi','Custom(with free textbox)'];
      const listGreen = ['DF','DFWEF','EF','EFDF','Poultry','Custom(with free textbox)']
      const listRed = ['WEF','Beef','SF','Citrus','Tomato','Sesame','Apples','Strawberry','Berries','Chocolate','Cinnamon','Pineapple','Carrot','Beans/ Peas/ Lentils',,'Coconut','Custom(with free textbox)'];
      */
      const listBlueCycle = _listBlueCycle;
      const listGreen = _listGreen;
      const listRed = _listRed;

      switch( _ddMenuColor.value) {
        case 'Blue':
          _DDMenuCodeSelect.options[_DDMenuCodeSelect.options.length] = new Option('--Select--');
          for(const key in listBlueCycle) {     
            _DDMenuCodeSelect.options[_DDMenuCodeSelect.options.length] = new Option(listBlueCycle[key].MenuCode);
          }
        break;

        case 'Red':
          _DDMenuCodeSelect.options[_DDMenuCodeSelect.options.length] = new Option('--Select--');
          for(const key in listRed) {     
            _DDMenuCodeSelect.options[_DDMenuCodeSelect.options.length] = new Option(listRed[key].MenuCode);
          }
        break;

        case 'Green':
          _DDMenuCodeSelect.options[_DDMenuCodeSelect.options.length] = new Option('--Select--');
          for(const key in listGreen) {     
            _DDMenuCodeSelect.options[_DDMenuCodeSelect.options.length] = new Option(listGreen[key].MenuCode);
          }
        break;

        default:
          break; 
      }
    
    }
   
    //HANDLE -CLICK METHODS FOR DROPDOWN LISTS (SUPPLEMENTS) *******
     const handleClickRightFTBO = (e) =>
     {
       e.preventDefault();
   
        var _mySelect = document.getElementById('ddFTBOList');
        var _mySelect2 = document.getElementById('ddFTBOList_Selected');
        
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
   
     const handleClickLeftFTBO = (e) =>
     {
       e.preventDefault();
       var _mySelect2 = document.getElementById('ddFTBOList_Selected');
       _mySelect2.remove(_mySelect2.selectedIndex); 
     }

     const handleClickRightNutSub = (e) =>
     {
       e.preventDefault();
   
        var _mySelect = document.getElementById('ddNutSubList');
        var _mySelect2 = document.getElementById('ddNutSubList_Selected');
        
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
   
     const handleClickLeftNutSub = (e) =>
     {
       e.preventDefault();
       var _mySelect2 = document.getElementById('ddNutSubList_Selected');
       _mySelect2.remove(_mySelect2.selectedIndex); 
     }

     const handleClickRightMilkSub = (e) =>
     {
       e.preventDefault();
   
        var _mySelect = document.getElementById('ddMilkSubList');
        var _mySelect2 = document.getElementById('ddMilkSubList_Selected');
        
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
   
     const handleClickLeftMilkSub = (e) =>
     {
       e.preventDefault();
       var _mySelect2 = document.getElementById('ddMilkSubList_Selected');
       _mySelect2.remove(_mySelect2.selectedIndex); 
     }
//END HANDLE -CLICK METHODS FOR DROPDOWN LISTS (SUPPLEMENTS)  *******

const searchStudent = (e) =>
{
  e.preventDefault();
  
  var studentIDField = document.getElementById('Student_ID')
  var btnSearchStudent = document.getElementById('btnSearchStudentNaturalKey');
  if(studentIDField.value != '')
  {
    fetchSingleStudentByStudentNaturalKey(studentIDField.value);
    btnSearchStudent.disabled = true;
  }
  else
  {
    //openAlertError('You need to enter in a student ID to search for record in Data Warehouse !!!!');
    //setrecordSuccessShowHide('block')
    window.alert('You need to enter in a student ID to search for record in Data Warehouse !!!!');
  }
 
}

async function fetchSingleStudentByStudentNaturalKey(_studentID) {        
  
  var _FirstName = document.getElementById('FirstName')
  var _LastName = document.getElementById('LastName')
 
  let _DATA = [];
  var myAPI = new studentInfoApi;
  _DATA = await myAPI.fetchSingleStudentByStudentNaturalKey(_studentID)
  
  if(_DATA.length > 0)
  {
    if(_DATA[0].NameOfInstitution !='')
    {
      student.School = _DATA[0].NameOfInstitution;
      //YOU CAN ONLY DO AWAITS INSIDE OF AN ASYNC FUNCTION!!!!
      await setDropDownValuesAndSchoolListings(student.School);
    }

    var _Birthday = document.getElementById('Birthday')
     var dtTemp = new Date(_DATA[0].BirthDate)
     var formmatteTrueDate = formatDate(dtTemp).split(' ');
     _Birthday.value = formmatteTrueDate[0]
     student.Birthday = _Birthday.value;

    student.FirstName= _DATA[0].FirstName;
    _FirstName.value = _DATA[0].FirstName;

    student.LastName= _DATA[0].LastName;
    _LastName.value = _DATA[0].LastName;

  }
  else{
    window.alert('No records match the criteria');
    //openAlertError('No records match the criteria');
    //setrecordSuccessShowHide('block')
  }
  
}

   
//logging
async function  logChanges(e)
{
   e.preventDefault();

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

      var _txtSchoolWideTraining = document.getElementById('txtSchoolWideTraining');
      var _DDSchoolListingSelect = document.getElementById('ddSchoolListings');

     
      var dateTimeCurrent = new Date().toISOString();

      if(currentSchoolName != _DDSchoolListingSelect.value)
      {

          var changeSchool = "School Name changed from ";
          changeSchool += currentSchoolName;
          changeSchool += " To ";
          changeSchool += _DDSchoolListingSelect.value;

          logObject.LogDate = dateTimeCurrent;
          logObject.ChangeType = 'SchoolName'
          logObject.ChangeNotes = changeSchool;
          logObject.studentID = student.studentID;
          logObject.schoolName = currentSchoolName;
          logObject.SchoolNotes = _txtSchoolWideTraining.value;
          logObject.UserMakingChange = userProps.loginId;

           await myAPI.insertLogData(logObject)

      }
      
      var _Medical_Condition = document.getElementById('Medical_Condition');
      if(currentMedicalCondition != _Medical_Condition.value)
      {

          var sMedicalCondition = "Medical Condition changed from ";
          sMedicalCondition += currentMedicalCondition;
          sMedicalCondition += " To ";
          sMedicalCondition += _Medical_Condition.value
  
            logObject.LogDate = dateTimeCurrent;
            logObject.ChangeType = 'Medical Condition Change'
            logObject.ChangeNotes = sMedicalCondition;
            logObject.studentID = student.studentID;
            logObject.schoolName = '';
            logObject.SchoolNotes = '';
            logObject.UserMakingChange = '';

             await myAPI.insertLogData(logObject)

      }
}

  //Utility Methods *****
   async function generateStudentID() {
  
      var studentIDField = document.getElementById('Student_ID');
      var _btnGenerateStudentId = document.getElementById('btnGenerateStudentId');

      studentIDField.value = 'STID_' + generateUUIDUsingMathRandom().substring(0,12);
      //set this because the onChange is not fired
      student.Student_ID = studentIDField.value;

     
      setStudentID(student.studentID)
      if(student.studentID != '')
      {
        _btnGenerateStudentId.disabled = true;
        setShouldDisplayAttachment('block')
      }
      else{
        setShouldDisplayAttachment('none')
      }
    }
      function generateUUIDUsingMathRandom() { 
        var d = new Date().getTime();//Timestamp
        var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
    function removeOptions(selectElement) {
      var i, L = selectElement.options.length - 1;
      for(i = L; i >= 0; i--) {
        selectElement.remove(i);
      }
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

    const test = () =>
    {
      console.log("Value for School " + currentSchoolName);
      console.log("Value for MedicalCondition " + currentMedicalCondition);
    }

    async function getCurrentSchoolYear() {        
      let _current_SchoolYear = '';
      var myAPI = new studentInfoApi;
      _current_SchoolYear = await myAPI.getCurrentSchoolYear();
      return _current_SchoolYear;
     }

    
      //attachments
    async function fetchAttachments(e)
    {
      e.preventDefault();

      let _attachments = [];
      var myAPI = new studentInfoApi;
 
      if( _studentid_!='') {} else {return;}
      _attachments =await myAPI.getAttachmentsAxios(_studentid_)
      setTblFileData(_attachments)
    }


    //alerts
    const openAlert = () => {
        setsuccessMsg('alert alert-success')
        setmsgBody("Success")
        setmsgBody2("Success")

        //determines whether we should redirect to main menu (works with const closeAlert = (e) => {)
        //setshouldReturnToMain(true)
        setShowAlert(true);
    }

    const closeAlert = (e) => {
        e.preventDefault();
        setShowAlert(false);
        
        if(shouldReturnToMain)
        {
          history.push(
            {
              pathname: '/NutritionLogin'
            }
          )
        }
         
    }

    const openAlertError = (msg) => {
        setsuccessMsg('alert alert-danger')
        setmsgBody("Student Information Add/Update Information")
        setmsgBody2(msg)

        //determines whether we should redirect to main menu (works with const closeAlert = (e) => {)
        setshouldReturnToMain(false)

        setShowAlert(true);
    }
   //alert WireUp ********

  return (
    <div>
      <main>
        <Container>
          <AlertDismissible
            show={showAlert}
            toogleAlert={(e) => closeAlert(e)}
            msgClass={successMsg}
            msgBody={msgBody}
            msgBody2={msgBody2}
          />
         
          <span style={{ fontWeight:'bold' }}>Current Logged In User:{userProps.fullName}</span>
          <br></br>
          <h1>Student Record</h1>
          <Form style={{ display: recordSuccessShowHide }}>
            <Row style={{ display: "none" }}>
              <Button variant="warning" type="button" onClick={() => test()}>
                Testing Something with DD Lists
              </Button>
            </Row>
            <Row>
              <Col
                sm={12}
                style={{
                  paddingRight: 10,
                  marginLeft: 12,
                  width: 150,
                  color: "blue",
                }}
              >
                <label>{storeFullNameFromSearch}</label>
              </Col>
            </Row>

            <Tabs>
              <Tab eventKey="StudentInformation" title="Student Information">
                <Row className="mb-6">
                  <Col
                    sm={1.75}
                    style={{
                      paddingRight: 10,
                      marginLeft: 12,
                      width: 300,
                      color: "red",
                    }}
                  >
                    Student ID*
                  </Col>
                  <Col sm={10}>
                    <input
                      type="text"
                      name="Student_ID"
                      id="Student_ID"
                      onChange={handleChange}
                      style={{ width: 300, marginRight: 10 }}
                    ></input>

                    <Button
                      variant="primary"
                      type="button"
                      id="btnSearchStudentNaturalKey"
                      onClick={(e) => searchStudent(e)}
                      style={{ marginRight: 10 }}
                    >
                      Search Student
                    </Button>

                    <Button
                      variant="warning"
                      type="button"
                      id="btnGenerateStudentId"
                      onClick={(e) => generateStudentID(e)}
                    >
                      Generate Temp Student ID
                    </Button>
                  </Col>
                </Row>

                <Row>
                  <Form.Group as={Col}>
                    <input
                      type="checkbox"
                      name="Current_Student"
                      id="Current_Student"
                      onChange={handleChange}
                      style={{ marginRight: 10 }}
                    />
                    <Form.Label>Current Student</Form.Label>
                  </Form.Group>
                </Row>

                <Row>
                  <Col
                    sm={1.75}
                    style={{ paddingRight: 10, marginLeft: 12, width: 150 }}
                  >
                    School Name
                  </Col>
                  <Col sm={5}>
                    <select
                      class="form-select form-select-sm"
                      aria-label=".form-select-sm example"
                      style={{ width: 300 }}
                      name="ddSchoolListings"
                      id="ddSchoolListings"
                      onChange={handleChange}
                    ></select>
                  </Col>
                </Row>

                <br></br>
                <Row className="mb-3">
                  <Col
                    sm={1.75}
                    style={{ paddingRight: 10, marginLeft: 12, width: 150 }}
                  >
                    First Name
                  </Col>
                  <Col sm={5}>
                    <input
                      type="text"
                      name="FirstName"
                      id="FirstName"
                      onChange={handleChange}
                      style={{ width: 300 }}
                    ></input>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col
                    sm={1.75}
                    style={{ paddingRight: 10, marginLeft: 12, width: 150 }}
                  >
                    Last Name
                  </Col>
                  <Col sm={5}>
                    <input
                      type="text"
                      name="LastName"
                      id="LastName"
                      onChange={handleChange}
                      style={{ width: 300 }}
                    ></input>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col
                    sm={1.75}
                    style={{ paddingRight: 10, marginLeft: 12, width: 150 }}
                  >
                    Date of Birth
                  </Col>
                  <Col sm={5}>
                    <input
                      type="date"
                      name="Birthday"
                      id="Birthday"
                      onChange={handleChange}
                      style={{ width: 150 }}
                    ></input>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col
                    sm={1.75}
                    style={{ paddingRight: 10, marginLeft: 12, width: 150 }}
                  >
                    School Year
                  </Col>
                  <Col sm={5}>
                    <input
                      type="text"
                      name="SchoolYear"
                      id="SchoolYear"
                      onChange={handleChange}
                      style={{ width: 300 }}
                    ></input>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col
                    sm={1.75}
                    style={{ paddingRight: 10, marginLeft: 12, width: 150 }}
                  >
                    Date Received
                  </Col>
                  <Col sm={5}>
                    <input
                      type="date"
                      name="Date_Received"
                      id="Date_Received"
                      onChange={handleChange}
                      style={{ width: 150 }}
                    ></input>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col
                    sm={1.75}
                    style={{ paddingRight: 10, marginLeft: 12, width: 150 }}
                  >
                    Date Processed
                  </Col>
                  <Col sm={5}>
                    <input
                      type="date"
                      name="Date_Processed"
                      id="Date_Processed"
                      onChange={handleChange}
                      style={{ width: 150 }}
                    ></input>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col
                    sm={1.75}
                    style={{ paddingRight: 10, marginLeft: 12, width: 150 }}
                  >
                    Current Order Date
                  </Col>
                  <Col sm={5}>
                    <input
                      type="date"
                      name="CurrentOrderDate"
                      id="CurrentOrderDate"
                      onChange={handleChange}
                      style={{ width: 150 }}
                    ></input>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col
                    sm={1.75}
                    style={{ paddingRight: 10, marginLeft: 12, width: 150 }}
                  >
                    Notes
                  </Col>
                  <Col sm={5}>
                    <textarea
                      name="Notes"
                      id="Notes"
                      onChange={handleChange}
                      style={{ height: "100px", width: 750 }}
                    ></textarea>
                  </Col>
                </Row>
              </Tab>

              <Tab
                eventKey="DietaryAccommodations"
                title="Dietary Accommodations"
              >
                <Row className="mb-3">
                  <Form.Group as={Col} style={{ marginLeft: 12 }}>
                    <Form.Label>Medical Diagnosis</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="Medical_Condition"
                      id="Medical_Condition"
                      onChange={handleChange}
                      style={{ height: "100px", width: 500 }}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3" style={{ display: "block" }}>
                <Form.Group as={Col} style={{ marginLeft: 12 }}>
                  <input
                    type="checkbox"
                    name="Disabled"
                    id="Disabled"
                    onChange={handleChange}
                  />
                  <Form.Label>Disabled</Form.Label>
                  <br></br>
                  <input
                    type="checkbox"
                    name="LTA"
                    id="LTA"
                    onChange={handleChange}
                  />
                  <Form.Label>LTA</Form.Label>
                  <br></br>
                  <input
                    type="checkbox"
                    name="NeedsF_U"
                    id="NeedsF_U"
                    onChange={handleChange}
                  />
                  <Form.Label>Needs F/U</Form.Label>
                  </Form.Group>
                </Row>
      
                <Row>
                  <Form.Group as={Col} style={{ paddingLeft: 2,marginLeft: 20}}>
                    <Form.Label style={myStyles.genericDropDownHeaderLabels}>
                      Foods to be Omitted
                    </Form.Label>
                    <GenericMultiSelectCombo
                      name_ddLeft="ddFTBOList"
                      name_ddRight="ddFTBOList_Selected"
                      buttonRight="btnSelectRightFTBO"
                      buttonLeft="btnSelectLeftFTBO"
                      label_ddLeft="Available Foods to Exclude"
                      label_ddRight="Selected Foods to Exclude"
                      handleClickRight={(e) => handleClickRightFTBO(e)}
                      handleClickLeft={(e) => handleClickLeftFTBO(e)}
                    />
                  </Form.Group>
                </Row>
            
                <Row style={{ display: "none" }}>
                  <Col sm={6}>
                    <input
                      type="text"
                      id="Foods_to_be_Omitted"
                      name="Foods_to_be_Omitted"
                      onChange={handleChange}
                    />
                  </Col>
                </Row>

                <br></br>

                <Row className="mb-3">
                  
                  <Col sm={1.75} style={{ paddingRight: 40, marginLeft: 25, width: 150 }}
                      >
                    FTBO Custom
                  </Col>
                  <Col sm={2}>
                    <input
                      type="text"
                      name="FTBO_Custom"
                      id="FTBO_Custom"
                      onChange={handleChange}
                      style={{ width: 350 }}
                    ></input>
                  </Col>
                </Row>


                <Row className="mb-3">
                  <Col sm={1.75} style={{ paddingRight: 40, marginLeft: 25, width: 150 }}
                      >
                   Allowable Substitutes
                  </Col>
                  <Col sm={2}>
                    <textarea
                      type="text"
                      name="FTBO_Custom"
                      id="FTBO_Custom"
                      onChange={handleChange}
                      style={{ width: 350 }}>
                    </textarea>
                  </Col>
               </Row>
              

                <Row className="mb-3">
                  <Col sm={1.75} style={{ paddingRight: 40, marginLeft: 25, width: 150 }}
                      >
                   Physician Diet Order Notes
                  </Col>
                  <Col sm={2}>
                    <textarea
                      type="text"
                      name="Diet_Order_Notes"
                      id="Diet_Order_Notes"
                      onChange={handleChange}
                      style={{ width: 350 }}>
                    </textarea>
                  </Col>
                </Row>
      
                <Row>
                  <Col
                    sm={1.75}
                    style={{ paddingRight: 40, marginLeft: 25, width: 150 }}
                  >
                    Menu Color
                  </Col>

                  <Col sm={2}>
                    <select
                      name="ddMenuColor"
                      id="ddMenuColor"
                      style={{ width: 350 }}
                      onChange={handleChange}
                    >
                      <option></option>
                      <option>Blue</option>
                      <option>Red</option>
                      <option>Green</option>
                    </select>
                  </Col>
                </Row>
          
               <br></br>
               
                <Row>
                  <Col
                    sm={1.75}
                    style={{ paddingRight: 8, marginLeft: 25, width: 150 }}
                  >
                    Menu Code
                  </Col>

                  <Col sm={2}>
                    <select
                      name="ddMenuCode"
                      id="ddMenuCode"
                      style={{ width: 350 }}
                      onChange={handleChange}
                    >
                      <option></option>
                    </select>
                  </Col>
                </Row>
             <br>
             </br>
                <Row>
                  <Col
                    sm={1.75}
                    style={{ paddingRight: 40, marginLeft: 25, width: 150 }}
                  >
                     Menu Code Custom
                  </Col>

                  <Col sm={2}>
                  <input
                      type="text"
                      name="Menu_Code_Custom"
                      id="Menu_Code_Custom"
                      onChange={handleChange}
                      style={{ width: 350 }}
                    ></input>
                  </Col>
                </Row>

              <br></br>

             
                <Row>
                  <Form.Group as={Col} style={{ paddingLeft: 2,marginLeft: 20 }}>
                    <Form.Label style={myStyles.genericDropDownHeaderLabels}>
                      Milk Substitutes and Supplements
                    </Form.Label>
                    <GenericMultiSelectCombo
                      name_ddLeft="ddMilkSubList"
                      name_ddRight="ddMilkSubList_Selected"
                      buttonRight="btnSelectRightMilkSub"
                      buttonLeft="btnSelectLeftMilkSub"
                      label_ddLeft="Available Milk Substitutes"
                      label_ddRight="Selected Milk Substitutes"
                      handleClickRight={(e) => handleClickRightMilkSub(e)}
                      handleClickLeft={(e) => handleClickLeftMilkSub(e)}
                    />
                  </Form.Group>
                </Row>

                <Row style={{ display: "none" }}>
                  <Col sm={6}>
                    <input
                      type="text"
                      id="Milk_Sub_Name"
                      name="Milk_Sub_Name"
                      onChange={handleChange}
                    />
                  </Col>
                </Row>

                <Row>
                  <Form.Group as={Col} style={{ paddingLeft: 2,marginLeft: 20}}>
                    <Form.Label style={myStyles.genericDropDownHeaderLabels}>
                     
                    </Form.Label>
                    <GenericMultiSelectCombo
                      name_ddLeft="ddNutSubList"
                      name_ddRight="ddNutSubList_Selected"
                      buttonRight="btnSelectRightNutSub"
                      buttonLeft="btnSelectLeftNutSub"
                      label_ddLeft="Available Nutrition Supplements"
                      label_ddRight="Selected Nutrition Supplements"
                      handleClickRight={(e) => handleClickRightNutSub(e)}
                      handleClickLeft={(e) => handleClickLeftNutSub(e)}
                    />
                  </Form.Group>
                </Row>

                <Row style={{ display: "none" }}>
                  <Col sm={6}>
                    <input
                      type="text"
                      id="SupplementName"
                      name="SupplementName"
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
         

              

                <Row className="mb-3" style={{ display: "block" }}>
                <Col
                    sm={1.75}
                    style={{ paddingRight: 40, marginLeft: 20, width: 150 }}
                  >
                  <input
                    type="checkbox"
                    name="NPO"
                    id="NPO"
                    onChange={handleChange}
                    style={{ marginLeft: 5, marginTop: 10}}
                  />
                  <Form.Label style={{ marginTop: 10 }}>NPO</Form.Label>
                  </Col>
                </Row>


                <Row className="mb-3">
                <Col
                    sm={1.75}
                    style={{ paddingRight: 40, marginLeft: 25, width: 150 }}
                  >
                      
                  Other Supplements
                  </Col>
                  <Col sm={2}>
                    <textarea
                      as="textarea"
                      name="SupplementNameMore"
                      id="SupplementNameMore"
                      onChange={handleChange}
                      style={{ height: "50px", width: 350 }}>
                    </textarea>
                  </Col>
                </Row>



                <Row>
                <Col
                    sm={1.75}
                    style={{ paddingRight: 40, marginLeft: 25, width: 150 }}
                  >
                    Liquids
                  </Col>

                  <Col sm={2}>
                    <select
                     name="Texture_Modification"
                     id="Texture_Modification"
                     style={{ width: 350}}
                     onChange={handleChange}
                    >
                      <option></option>
                       <option>Mildly Thick Liquid (Level 2)</option>
                      <option>Moderately Thick Liquid (Level 3)</option>
                      <option>Extremely Thick Liquid (Level 4)</option>
                    </select>
                  </Col>
                </Row>
                <br></br>
                <Row>
                <Col
                    sm={1.75}
                    style={{ paddingRight: 40, marginLeft: 25, width: 150 }}
                  >
                    Solids
                  </Col>

                  <Col sm={2}>
                    <select
                       name="Texture_Modification2"
                       id="Texture_Modification2"
                       style={{ width: 350 }}
                        onChange={handleChange}
                    >
                        <option></option>
                      <option>Soft & Bite-Sized Solids (Level 6)</option>
                      <option>Minced & Moist Solids (Level 5)</option>
                      <option>Pureed Solids (Level 4)</option>
                    </select>
                  </Col>
                </Row>

              </Tab>

              <Tab eventKey="Documentation" title="Documentation">
                <br></br>
               
                <UploadFilesLight
                  btnFetchAttachments="btnFetchAttachments"
                  displayAttachments={shouldDisplayAttachment}
                  studentID={_studentid_}
                  tblFiles={tblFiles}
                  userRole={userRole}
                  fetchAttachments={(e) => fetchAttachments(e)}
                />
              </Tab>

              <Tab eventKey="Training" title="Training">
                <br></br>
                <Row className="mb-3">
                  <Form.Group as={Col} style={{ marginLeft: 12 }}>
                    <Form.Label>School-Wide Training</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="txtSchoolWideTraining"
                      id="txtSchoolWideTraining"
                      style={{ height: "100px", width: 1000 }}
                      readOnly
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} style={{ marginLeft: 12 }}>
                    <Form.Label>School Training Notes</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="txtSchoolTraining"
                      id="txtSchoolTraining"
                      style={{ height: "100px", width: 1000 }}
                      readOnly
                    />
                  </Form.Group>
                </Row>
              </Tab>

              <Tab eventKey="Communication" title="Communication">
                <br></br>
                <Row className="mb-3">
                  <Form.Group as={Col} style={{ marginLeft: 12 }}>
                    <Form.Label>Student Communication Notes</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="txtStudentCommunicationNotes"
                      id="txtStudentCommunicationNotes"
                      style={{ height: "100px", width: 1000 }}
                      readOnly
                    />
                  </Form.Group>
                </Row>
              </Tab>
            </Tabs>

            <br></br>
            <Row>
              <Col sm={12} style={{ marginLeft: 12 }}>
                <Button
                  variant="primary"
                  onClick={(e) => AddOrUpdateStudentRecord(e)}
                  id="btnAddOrUpdateStudentRecord"
                  name="btnAddOrUpdateStudentRecord"
                >
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </main>
    </div>
  );
}

const myStyles = {
  buttonPadLeft: {
      marginLeft: '2px'
  },
   genericDropDownHeaderLabels: {
    fontWeight:'bold',
    fontSize: '20px'
  },
  ddlabel: {
    position: 'absolute', 
    left: 0,
    width: '10em',
    marginRight:'50px',
    paddingRight:'50px'
    },
  ddMenuColorPaddingAndWidth : {
    width:'200px', 
    marginLeft:'100px'
  },
  ddMenuTextureModPaddingAndWidth : {
    width:'300px', 
    marginLeft:'50px'
  },

};

const mapStateToProps = state => ({
  userProps: state.userReducer.user,
})

export default connect(mapStateToProps)(StudentDataEntry)
