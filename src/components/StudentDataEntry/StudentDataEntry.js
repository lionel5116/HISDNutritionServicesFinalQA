import React from 'react'
import {useState} from 'react';
import {Button,
    Container,
    Row,
    Col,Form,Tabs,Tab} from 'react-bootstrap';
import { useHistory } from "react-router-dom";


//import GenericDDSelect from '../ReusableAppComponents/GenericDDSelect'
//import { Pencil  } from 'react-bootstrap-icons';

//reusable components
import GenericMultiSelectCombo from '../ReusableAppComponents/GenericMultiSelectCombo';
import SchoolListDropDown from '../ReusableAppComponents/SchoolListDropDown';
import SchoolYearDropDown from '../ReusableAppComponents/SchoolYearDropDown';
import AlertDismissible from '../ReusableAppComponents/AlertDismissible';

import studentInfoApi from '../../api/studentInfoApi';

//react bootstrap table next
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

//for modal
import GenericModal from '../GenericModal/GenericModal';
import { useEffect } from 'react';

//location
//https://www.codegrepper.com/code-examples/javascript/history.push+with+params
import { useLocation } from 'react-router-dom';

function StudentDataEntry() {
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
    
    const openAlert = () => {
        setsuccessMsg('alert alert-success')
        setmsgBody("Student Information Add/Update Information")
        setmsgBody2("Successfully wrote record!!!")
        
        //determines whether we should redirect to main menu (works with const closeAlert = (e) => {)
        setshouldReturnToMain(true)

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
                                              Texture_Modification2  :''});

  
/*SELECT TOP (1000) 
      [id][LastName]
      ,[FirstName]
      ,[School]
      ,[Disabled]
      ,[LTA]
      ,[SupplementName]
      ,[CurrentOrderDate]
      ,[Notes]
      ,[NeedsF_U]
      ,[Date_Processed]
      ,[Date_Received]
      ,[Current_Student]
      ,[Milk_Sub]
      ,[Medical_Condition]
      ,[Foods_to_be_Omitted]
      ,[Substitution]
      ,[Texture_Modification]
      ,[Milk_Sub_Name]
      ,[Menu_Code]
      ,[Birthday]
      ,[Student_ID]
      ,[NPO]
      ,[Menu_Color]
      ,[SchoolYear]
      ,[SupplementNameMore]
      ,[Texture_Modification2]
  FROM [HISDNutritionalServices].[dbo].[StudentEntryData]
  where id = 4557
  */

    //STID_24c6b43f-625
   //useEffect Methods ***********
   useEffect(() => {
    const _queryID = location.search;
    if(_queryID != '')
    {
        //console.log("Record ID from search " + _queryID.substring(_queryID.indexOf('=') + 1));
        var id = _queryID.substring(_queryID.indexOf('=') + 1);
        setFullNameFromSearch(location.fullName)
        fetchSingeRecordByRecordID(id)  
    }
    
   }, [location]);

  useEffect(() => {
    //console.log('WS Call fetchSearchDDListDataFTBO')
    fetchSearchDDListDataFTBO();
  },[]);

  useEffect(() => {
    //console.log('WS Call fetchSearchDDListDataNutSub')
    fetchSearchDDListDataNutSub();
  },[]);

  useEffect(() => {
    //console.log('WS Call fetchSearchDDListDataMilkSub')
    fetchSearchDDListDataMilkSub();
  },[]);

  useEffect(() => {
    //fetchSchoolListingData();
  },[]);

  //useEffect Methods END ***********


  async function fetchSingeRecordByRecordID(id) { 
    await fetchSchoolListingData();       
    let _DD_STUDENT_RECORD_DATA = [];
    var myAPI = new studentInfoApi;
    _DD_STUDENT_RECORD_DATA = await myAPI.fetchSingeRecordByRecordID(id)
    student.id = _DD_STUDENT_RECORD_DATA[0].id
    await populateFormWithStudentData(_DD_STUDENT_RECORD_DATA);
    //by the time this the base fields are rendered, we can now set the drop-downs for the
    //School Year and School (using async to pause the thread)
    await setDropDownValuesAndSchoolListings(_DD_STUDENT_RECORD_DATA[0].School)
    await setDropDownValuesForSchoolYear(_DD_STUDENT_RECORD_DATA[0].SchoolYear)
   }


   //let optionsDDSelections = ['--Select--','Foods To Be Ommitted', 'Nutrition Supplement', 'Milk Substitute'];
   //FETCH METHODS FOR THE THREE DROPDOWN SUPPLEMENT (CALLED ON FORM LOAD - useEffect())
   async function fetchSearchDDListDataFTBO() {        
    let _DD_LIST_DATA = [];
    var myAPI = new studentInfoApi;
    _DD_LIST_DATA = await myAPI.fetchSearchDDListData('Foods To Be Ommitted')

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
    _DD_LIST_DATA = await myAPI.fetchSearchDDListData('Nutrition Supplement')

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
    _DD_LIST_DATA = await myAPI.fetchSearchDDListData('Milk Substitute')

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
   //METHODS BELOW ARE FOR ADDING DROPDOWN VALUES TO HIDDEN SUPPLEMENT FIELDS
   const setDropDownSubstitutesFieldValues = (e) =>
   {
        e.preventDefault();
        
        //initalize the hidden suplement field values
        appendDropDownSubstitutesFieldValues('ddFTBOList_Selected','Foods_to_be_Omitted');
        appendDropDownSubstitutesFieldValues('ddNutSubList_Selected','SupplementName');
        appendDropDownSubstitutesFieldValues('ddMilkSubList_Selected','Milk_Sub_Name');

        var element = '';

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

      console.log("Student ID " + student.id )
      if(student.id != '')
      {
        openAlertError('Editing a RECORD IS NOT YET IMPLEMENTED YET.. COMING SOON!!! DEBBIE/DOLLY');
        setrecordSuccessShowHide('block')
        return;
      }
     
      if(student.Student_ID != '' &&
        student.School != '' &&
        student.FirstName != '' &&
        student.LastName != '' )
        {
            //we are good to go       
  
        }
        else{
          openAlertError('You must have at least the following: StudentID,School,First and Last Name!!!!');
          setrecordSuccessShowHide('block')
          return;
        }

      

      setDropDownSubstitutesFieldValues(e);
      var myAPI = new studentInfoApi;
      var _response = await myAPI.AddOrUpdateStudentRecord(student)

      console.log(_response);
      if(_response)
      {
        openAlert();
        setrecordSuccessShowHide('none')
      }
      else{
        openAlertError('There was a problem adding or updating the record');
        setrecordSuccessShowHide('block')
      }

    }

    async function populateFormWithStudentData(fieldData)
    {
     
     var _Student_ID = document.getElementById('Student_ID');
     _Student_ID.value = fieldData[0].Student_ID
     

     var _FirstName = document.getElementById('FirstName');
     _FirstName.value = fieldData[0].FirstName
 
     var _LastName = document.getElementById('LastName');
     _LastName.value = fieldData[0].LastName
   
    
     var _Notes = document.getElementById('Notes');
     _Notes.value = fieldData[0].Notes
 
    
     var _Medical_Condition = document.getElementById('Medical_Condition');
     _Medical_Condition.value = fieldData[0].Medical_Condition
 
 
     
     var _Substitution = document.getElementById('Substitution');
     _Substitution.value = fieldData[0].Substitution
 
     
 
     var _Texture_Modification = document.getElementById('Texture_Modification');
     _Texture_Modification.value = fieldData[0].Texture_Modification
 
    
 
 
     var _SupplementNameMore = document.getElementById('SupplementNameMore');
     _SupplementNameMore.value = fieldData[0].SupplementNameMore
 
 
     var _Diet_Order_Notes = document.getElementById('Diet_Order_Notes');
     _Diet_Order_Notes.value = fieldData[0].Diet_Order_Notes
 
     var _Texture_Modification2 = document.getElementById('Texture_Modification2');
     _Texture_Modification2.value = fieldData[0].Texture_Modification2


     //Supplement Multi-Selects
     var _Foods_to_be_Omitted = document.getElementById('Foods_to_be_Omitted');
     _Foods_to_be_Omitted.value = fieldData[0].Foods_to_be_Omitted
     renderMultiSelectsWithValuesFromFetch('ddFTBOList_Selected',_Foods_to_be_Omitted.value)


     var _SupplementName = document.getElementById('SupplementName');
     _SupplementName.value = fieldData[0].SupplementName
     renderMultiSelectsWithValuesFromFetch('ddNutSubList_Selected', _SupplementName.value)

  
     var _Milk_Sub_Name = document.getElementById('Milk_Sub_Name');
     _Milk_Sub_Name.value = fieldData[0].Milk_Sub_Name
     renderMultiSelectsWithValuesFromFetch('ddMilkSubList_Selected', _Milk_Sub_Name.value)
     
   
     
     //drop downs (School Listing & School Year)
     //MOVED TO ASYNC METHODS BECAUSE THEY ARE RE-USABLE CONTROLS AND THERE WAS A JAVASCRIPT NATIVE ASYNC ISSUE
     /*
     var _SchoolYear = document.getElementById('ddSchoolYears');
     console.log(fieldData[0].SchoolYear)
     _SchoolYear.value = fieldData[0].SchoolYear
   
     var _School = document.getElementById('ddSchoolListings');
     console.log(_School.value)
     console.log(fieldData[0].School)
     _School.value = fieldData[0].School
     */



     //Check Boxes
     var _Disabled = document.getElementById('Disabled');//check box
     if(fieldData[0].Disabled = 1)
     {
       _Disabled.checked = true
     }
 
     var _Current_Student = document.getElementById('Current_Student');//check box
     if(fieldData[0].Current_Student = 1)
     {
       _Current_Student.checked = true
     }
    
     var _LTA = document.getElementById('LTA');//check box
     if(fieldData[0].LTA = 1)
     {
       _LTA.checked = true
     }
    
 
     var _NeedsF_U = document.getElementById('NeedsF_U');//check box
     if(fieldData[0].NeedsF_U = 1)
     {
       _NeedsF_U.checked = true
     }
  
 
     var _NPO = document.getElementById('NPO');//check box
     if(fieldData[0].NPO = 1)
     {
       _NPO.checked = true
     }


      //for dates
     //https://bobbyhadz.com/blog/javascript-set-values-input-date-time#:~:text=Use%20the%20value%20property%20on,%2C%20time%20and%20datetime%2Dlocal%20.
     var _CurrentOrderDate = document.getElementById('CurrentOrderDate');
     var dtTemp = new Date(fieldData[0].CurrentOrderDate)
     var formmatteTrueDate = formatDate(dtTemp).split(' ');
     _CurrentOrderDate.value = formmatteTrueDate[0]

      
     var _Birthday = document.getElementById('Birthday');
     var dtTemp = new Date(fieldData[0].Birthday)
     var formmatteTrueDate = formatDate(dtTemp).split(' ');
     _Birthday.value = formmatteTrueDate[0]


     var _Date_Received = document.getElementById('Date_Received');
     var dtTemp = new Date(fieldData[0].Date_Received)
     var formmatteTrueDate = formatDate(dtTemp).split(' ');
     _Date_Received.value  = formmatteTrueDate[0]
 
 
      //date field
     var _Date_Processed = document.getElementById('Date_Processed');
     var dtTemp = new Date(fieldData[0].Date_Processed)
     var formmatteTrueDate = formatDate(dtTemp).split(' ');
     _Date_Processed.value  = formmatteTrueDate[0]


     
     var _Menu_Color = document.getElementById('ddMenuColor');
     _Menu_Color.value = fieldData[0].Menu_Color
     populateMenuCodeDropDown();
     var _Menu_Code = document.getElementById('ddMenuCode');
     _Menu_Code.value = fieldData[0].Menu_Code


    }

    //THESE ARE THE DROP-DOWNS (RESUSABLE ASYNC FIX)
    async function setDropDownValuesAndSchoolListings(schoolName)
    {
  
      var _School = document.getElementById('ddSchoolListings');
      _School.value = schoolName
    }

    async function setDropDownValuesForSchoolYear(schoolYear)
    {
      var _SchoolYear = document.getElementById('ddSchoolYears');
      _SchoolYear.value = schoolYear
 
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
              break;    //Diet_Order_Notes
      }

     // console.log(user)
    }
   
 

    const populateMenuCodeDropDown = () =>
    {
      
      var _ddMenuColor = document.getElementById('ddMenuColor');
      var _DDMenuCodeSelect = document.getElementById('ddMenuCode'); 
      removeOptions(_DDMenuCodeSelect);  //clear select first

      //console.log("Calling populateMenuCodeDropDown method...for color " + _ddMenuColor.value);
      const listBlueCycle = ['AF-CF','AF','AF + D','AF + D(Compliant)','AF + S','AF + S(Compliant)','CHO 60','Renal','Renal + Milk','Low PRO','Prader - Willi','Custom(with free textbox)'];
      const listGreen = ['DF','DFWEF','EF','EFDF','Poultry','Custom(with free textbox)']
      const listRed = ['WEF','Beef','SF','Citrus','Tomato','Sesame','Apples','Strawberry','Berries','Chocolate','Cinnamon','Pineapple','Carrot','Beans/ Peas/ Lentils','Custom(with free textbox)'];
     
      switch( _ddMenuColor.value) {
        case 'Blue':
          _DDMenuCodeSelect.options[_DDMenuCodeSelect.options.length] = new Option('--Select--');
          for(const key in listBlueCycle) {     
            _DDMenuCodeSelect.options[_DDMenuCodeSelect.options.length] = new Option(listBlueCycle[key]);
          }
        break;

        case 'Red':
          _DDMenuCodeSelect.options[_DDMenuCodeSelect.options.length] = new Option('--Select--');
          for(const key in listRed) {     
            _DDMenuCodeSelect.options[_DDMenuCodeSelect.options.length] = new Option(listRed[key]);
          }
        break;

        case 'Green':
          _DDMenuCodeSelect.options[_DDMenuCodeSelect.options.length] = new Option('--Select--');
          for(const key in listGreen) {     
            _DDMenuCodeSelect.options[_DDMenuCodeSelect.options.length] = new Option(listGreen[key]);
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
      
   //UTILITY METHODS
  //Utility Methods *****
  const generateStudentID =()=>
    {
      var studentIDField = document.getElementById('Student_ID');
      studentIDField.value = 'STID_' + generateUUIDUsingMathRandom().substring(0,12);
      //set this because the onChange is not fired
      student.Student_ID = studentIDField.value;
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


  return (
    <div>
      <main>
        <Container>
        <AlertDismissible 
             show = {showAlert}
             toogleAlert = {(e) => closeAlert(e)}
             msgClass = {successMsg}
             msgBody = {msgBody}
             msgBody2 = {msgBody2}
            />

        <h1>Student Record</h1> 
          <Form style={{display:recordSuccessShowHide}}>
              <Tabs>
              <Tab eventKey="StudentInformation" title="Student Information">
                  <h2><label>{storeFullNameFromSearch}</label></h2>
                <Row className="mb-3">
                  <Form.Group as={Col} >
                    <Form.Label>Student ID*</Form.Label>
                    <Form.Control
                      type="text"
                      name='Student_ID'
                      id='Student_ID'
                      onChange={handleChange}

                    />
                  </Form.Group>

                  <Form.Group as={Col} >

                    <Button variant="primary" type="button"
                      onClick={() => searchStudent()}
                      style={{ marginTop: 30 }}>
                      Search Student
                    </Button>

                    <Button variant="warning" type="button"
                      onClick={() => generateStudentID()}
                      style={{ marginLeft: 10, marginTop: 30 }}>
                      Generate StudentID
                    </Button>

                  </Form.Group>

                  <Form.Group as={Col} >

                    <Form.Label style={{ marginTop: 30 }}>Current Student</Form.Label>
                    <input
                      type="checkbox"
                      name='Current_Student'
                      id='Current_Student'
                      onChange={handleChange}
                      style={{ marginLeft: 10, marginTop: 30 }} />
                  </Form.Group>
                </Row>
               
                <Row className="mb-3">
                       <Form.Group as={Col} >
                            {/*<Form.Label>School</Form.Label>
                            
                            <SchoolListDropDown 
                                handleChange = {(e) =>handleChange(e)}
                                name='ddSchoolListings'
                                id='ddSchoolListings'/>
                          */}
                           <label>School</label>
                           <br></br>
                           <select class="form-select form-select-sm" 
                            aria-label=".form-select-sm example" 
                            style={{ width: 300 }} 
                            name='ddSchoolListings'
                            id='ddSchoolListings'
                            onChange={handleChange}>
                            </select>
                          </Form.Group>
                   </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name='FirstName'
                      id='FirstName'
                      onChange={handleChange}

                    />
                  </Form.Group>

                  <Form.Group as={Col} >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name='LastName'
                      id='LastName'
                      onChange={handleChange}

                    />
                  </Form.Group>


                  <Form.Group className="mb-3">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type="date"
                      name='Birthday'
                      id='Birthday'
                      onChange={handleChange}
                      style={{ width: 200 }} />
                  </Form.Group>

                  <Form.Group as={Col} >
                    <Form.Label>School Year</Form.Label>
                      <SchoolYearDropDown 
                          handleChange = {(e) =>handleChange(e)}
                          name='ddSchoolYears'
                          id='ddSchoolYears'
                          />
                    
                   
                  </Form.Group>

                </Row>
  
                <Row className="mb-3">

                <Form.Group className="mb-3">
                    <Form.Label>Date Received</Form.Label>
                    <Form.Control
                      type="date"
                      name='Date_Received'
                      id='Date_Received'
                      onChange={handleChange}
                      style={{ width: 200 }} />
                  </Form.Group>

                  
                  <Form.Group className="mb-3">
                    <Form.Label style={{ marginLeft:50}}>Date Processed</Form.Label>
                    <Form.Control
                      type="date"
                      name='Date_Processed'
                      id='Date_Processed'
                      onChange={handleChange}
                      style={{ width: 200 ,marginLeft:50}} />
                  </Form.Group>
                </Row>
               
                <Row className="mb-3">
                <Form.Group className="mb-3">
                    <Form.Label>Processing Notes</Form.Label>
                    <Form.Control
                    as="textarea"
                    name='Notes'
                    id='Notes'
                    onChange={handleChange}
                   
                    style={{ height: '100px',width:1000 }}
                   />
                  </Form.Group>

                </Row>


               </Tab>

               <Tab eventKey="DietaryAccommodations" title="Dietary Accommodations">

               <Row className="mb-3"> 

                  <Form.Group as={Col} >

                    <Form.Label style={{ marginTop: 30 }}>Disabled</Form.Label>
                    <input
                      type="checkbox"
                      name='Disabled'
                      id='Disabled'
                      onChange={handleChange}
                      style={{ marginLeft: 10,marginTop: 30 }} />
                  </Form.Group>

                  <Form.Group as={Col} >

                    <Form.Label style={{ marginTop: 30 }}>LTA</Form.Label>
                    <input
                      type="checkbox"
                      name='LTA'
                      id='LTA'
                      onChange={handleChange}
                      style={{ marginLeft: 10,marginTop: 30 }} />
                  </Form.Group>

                  <Form.Group as={Col} >

                    <Form.Label style={{ marginTop: 30 }}>Needs F/U</Form.Label>
                    <input
                      type="checkbox"
                      name='NeedsF_U'
                      id='NeedsF_U'
                      onChange={handleChange}
                      style={{ marginLeft: 10, marginTop: 30 }} />
                  </Form.Group>

               </Row>

               <Row className="mb-3"> 
               <Form.Group className="mb-3">
                    <Form.Label>Medical Diagnosis</Form.Label>
                    <Form.Control
                    as="textarea"
                    name='Medical_Condition'
                    id='Medical_Condition'
                    onChange={handleChange}
                   
                    style={{ height: '100px',width:1000 }}
                   />
                  </Form.Group>
               </Row>

               {/*<Row style={{display:'none'}}>*/}
               <Row style={{display:'none'}}>
               <Button variant="warning" type="button"
                      onClick={(e) => setDropDownSubstitutesFieldValues(e)}
                      >
                      Testing Something with DD Lists
                    </Button>
               </Row>
  
               <Row>
               <Form.Group as={Col} >
               <Form.Label>Foods to be Ommitted</Form.Label>
               <GenericMultiSelectCombo 
                   name_ddLeft = 'ddFTBOList'
                   name_ddRight = 'ddFTBOList_Selected'
                   buttonRight = 'btnSelectRightFTBO'
                   buttonLeft = 'btnSelectLeftFTBO'
                   label_ddLeft = 'Available Trainings'
                   label_ddRight = 'Selected Trainings'
                   handleClickRight = {(e) =>handleClickRightFTBO(e)}
                   handleClickLeft = {(e) =>handleClickLeftFTBO(e)}
                />
                
               </Form.Group >
               </Row>
               {/*<Row style={{display:'none'}}> */}
               <Row style={{display:'none'}}>
               <Col sm={6}>
                  <input type='text' 
                   id='Foods_to_be_Omitted'
                   name='Foods_to_be_Omitted' 
                   onChange={handleChange}/>
                </Col>
               </Row>
  
                    <br></br>
                    <Row className="mb-6">
                        
                        <Form.Group as={Col}>
                            <Form.Label>Substitution</Form.Label>
                            <Form.Control
                            as="textarea"
                            name='Substitution'
                            id='Substitution'
                            style={{ height: '100px',width:350 }}
                            onChange={handleChange}
                            
                        />
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label>Menu Color</Form.Label>
                            <Form.Control as="select"
                                name='ddMenuColor'
                                id='ddMenuColor'
                                style={{ width:200 }}
                                onChange={handleChange}
                              >
                                <option></option>
                                <option>Blue</option>
                                <option>Red</option>
                                <option>Green</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label>Menu Code</Form.Label>
                            <Form.Control as="select"
                                name='ddMenuCode'
                                id='ddMenuCode'
                                style={{ width:200 }}
                                onChange={handleChange}
                            >
                                <option></option>
                            </Form.Control>
                        </Form.Group>

                    </Row>

                    <br></br>
                    <Row>
                    <label  style={{ fontWeight:'bold' }}>Texture Modification</label>
                    </Row>
                    <Row className="mb-6">
                        
                        <Form.Group as={Col} >
                            <Form.Label>Liquids</Form.Label>
                            <Form.Control as="select"
                                name='Texture_Modification'
                                id='Texture_Modification'
                                style={{ width:300 }}
                                onChange={handleChange}   
                            >
                            <option></option>
                            <option>Mildly Thick Liquid (Level 2)</option>
                            <option>Moderately Thick Liquid (Level 3)</option>
                            <option>Extremely Thick Liquid (Level 4)</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label>Solids</Form.Label>
                            <Form.Control as="select"
                                name='Texture_Modification2'
                                id='Texture_Modification2'
                                style={{ width:300 }}
                                onChange={handleChange}
                            >
                            <option></option>
                            <option>Soft & Bite-Sized Solids (Level 6)</option>
                            <option>Minced & Moist Solids (Level 5)</option>
                            <option>Pureed Solids (Level 4)</option>
                            </Form.Control>
                        </Form.Group>

                    </Row>

                    <br></br>
                    <Row>
                    <label  style={{ fontWeight:'bold' }}>Supplements and Milk Substitute</label>
                    </Row>
                    <br></br>

                    <Row>
                    <Form.Group as={Col} >
                    <Form.Label>Nutrition Supplement</Form.Label>
                    <GenericMultiSelectCombo 
                        name_ddLeft = 'ddNutSubList'
                        name_ddRight = 'ddNutSubList_Selected'
                        buttonRight = 'btnSelectRightNutSub'
                        buttonLeft = 'btnSelectLeftNutSub'
                        label_ddLeft = 'Available Trainings'
                        label_ddRight = 'Selected Trainings'
                        handleClickRight = {(e) =>handleClickRightNutSub(e)}
                        handleClickLeft = {(e) =>handleClickLeftNutSub(e)}
                      />
                      
                    </Form.Group >
                    </Row>

                <Row style={{display:'none'}}>
                  <Col sm={6}>
                    <input type='text' 
                    id='SupplementName'
                    name='SupplementName' 
                    onChange={handleChange}/>
                  </Col>
                </Row>
                    <br></br>

                    <Row>
                    <Form.Group as={Col} >
                    <Form.Label>Milk Substitute</Form.Label>
                    <GenericMultiSelectCombo 
                        name_ddLeft = 'ddMilkSubList'
                        name_ddRight = 'ddMilkSubList_Selected'
                        buttonRight = 'btnSelectRightMilkSub'
                        buttonLeft = 'btnSelectLeftMilkSub'
                        label_ddLeft = 'Available Trainings'
                        label_ddRight = 'Selected Trainings'
                        handleClickRight = {(e) =>handleClickRightMilkSub(e)}
                        handleClickLeft = {(e) =>handleClickLeftMilkSub(e)}
                      />
                      
                    </Form.Group >
                    </Row>

                <Row style={{display:'none'}}>
                  <Col sm={6}>
                    <input type='text' 
                    id='Milk_Sub_Name'
                    name='Milk_Sub_Name' 
                    onChange={handleChange}/>
                  </Col>
                </Row>

                    <br></br>
                    <Row>
                    <Form.Group as={Col} >

                      <Form.Label style={{ marginTop: 30 }}>NPO</Form.Label>
                      <input
                        type="checkbox"
                        name='NPO'
                        id='NPO'
                        onChange={handleChange}
                        style={{ marginLeft: 10,marginTop: 30 }} />
                      </Form.Group>
                    </Row>
                    <br></br>

                    <Row className="mb-3"> 
                        <Form.Group className="mb-3">
                          <Form.Label>Other Supplements</Form.Label>
                          <Form.Control
                          as="textarea"
                          name='SupplementNameMore'
                          id='SupplementNameMore'
                          onChange={handleChange}
                        
                          style={{ height: '100px',width:1000 }}
                        />
                        </Form.Group>
                    </Row>

     
               </Tab>

               <Tab eventKey="Documentation" title="Documentation">
               <br></br>
                    <Row className="mb-3"> 
                      <Form.Group className="mb-3">
                      <Form.Label>Current Order Date</Form.Label>
                      <Form.Control
                        type="date"
                        name='CurrentOrderDate'
                        id='CurrentOrderDate'
                        onChange={handleChange}
                        style={{ width: 200 }} />
                    </Form.Group>

                    </Row>

                    <Row className="mb-3"> 
                        <Form.Group className="mb-3">
                          <Form.Label>Physician Diet Order Notes</Form.Label>
                          <Form.Control
                          as="textarea"
                          name='Diet_Order_Notes'
                          id='Diet_Order_Notes'
                          onChange={handleChange}
                        
                          style={{ height: '100px',width:1000 }}
                        />
                        </Form.Group>
                    </Row>

               </Tab>

               <Tab eventKey="Training" title="Training">
                   <br></br>
                    <Row className="mb-3"> 
                    <Form.Group className="mb-3">
                          <Form.Label>School-Wide Training</Form.Label>
                          <Form.Control
                          as="textarea"
                          name='txtSchoolWideTraining'
                          id='txtSchoolWideTraining'
                          style={{ height: '100px',width:1000 }}
                          readOnly 
                        />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3"> 
                    <Form.Group className="mb-3">
                          <Form.Label>School Training Notes</Form.Label>
                          <Form.Control
                          as="textarea"
                          name='txtSchoolTraining'
                          id='txtSchoolTraining'
                          style={{ height: '100px',width:1000 }}
                          readOnly 
                        />
                        </Form.Group>
                    </Row>      
                </Tab>

                <Tab eventKey="Communication" title="Communication">
                   <br></br>
                    <Row className="mb-3"> 
                    <Form.Group className="mb-3">
                          <Form.Label>Student Communication Notes</Form.Label>
                          <Form.Control
                          as="textarea"
                          name='txtStudentCommunicationNotes'
                          id='txtStudentCommunicationNotes'
                          style={{ height: '100px',width:1000 }}
                          readOnly 
                        />
                        </Form.Group>
                    </Row>
                </Tab>
              </Tabs>
            
            <hr></hr>
            <br></br>
          <Row>
            <Col sm={12}>
              <Button variant="outline-primary" onClick={(e) => AddOrUpdateStudentRecord(e)}>Submit</Button>
            </Col>
          </Row>
          </Form>
        </Container>
      </main>

    </div>
  )
}

export default StudentDataEntry
