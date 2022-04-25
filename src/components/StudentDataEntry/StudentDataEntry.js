import React from 'react'
import {useState} from 'react';
import {Button,
    Container,
    Row,
    Col,Form,Tabs,Tab} from 'react-bootstrap';
import GenericDDSelect from '../ReusableAppComponents/GenericDDSelect'
import { Pencil  } from 'react-bootstrap-icons';

import GenericMultiSelectCombo from '../ReusableAppComponents/GenericMultiSelectCombo';
import SchoolListDropDown from '../ReusableAppComponents/SchoolListDropDown';
import SchoolYearDropDown from '../ReusableAppComponents/SchoolYearDropDown';

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
    const [student, setStudent] = useState({});

  

    var objStudent= {
          id  :'',  //id is an identity column (for fetching)
          Student_ID  :'',
          LastName :'',
          FirstName  :'',
          School  :'',
          WF  :'',
          Menu  :'',
          Disabled  :'',
          Supplement  :'',
          LTA  :'',
          SupplementName  :'',
          CurrentOrderDate  :'',
          CurrentOrder  :'',
          Notes  :'',
          BabyFoodName  :'',
          OneCans_D  :'',
          OneCans_6Wk  :'',
          NeedsF_U  :'',
          Baby_Food_Types  :'',
          Date_Processed  :'',
          Date_Received  :'',
          Current_Student  :'',
          Accommodation_ON_HOLD  :'',
          Milk_Sub  :'',
          Allergy  :'',
          Medical_Condition  :'',
          Foods_to_be_Omitted  :'',
          Substitution  :'',
          Texture_Modification  :'',
          BK_Menu  :'',
          Lu_Menu  :'',
          Milk_Sub_Name  :'',
          Waiting_on_Menu_Approval  :'',
          Nurse  :'',
          Diet_Order_Notes  :'',
          POS_alert  :'',
          Menu_Code  :'',
          Birthday  :'',
          Production_Record  :'',
          NPO  :'',
          Tray_Yes  :'',
          Tray_No  :'',
          Menu_Color  :'',
          Inactive  :'',
          SchoolYear  :'',
          SupplementNameMore  :'',
          Texture_Modification2  :'',
          Archive  :''
   };//plain ol vanilla object


   useEffect(() => {
    const _queryID = location.search;
    if(_queryID != '')
    {
        console.log("Record ID from search " + _queryID.substring(_queryID.indexOf('=') + 1));
        setFullNameFromSearch(location.fullName)
        console.log("Full Name from search " + location.fullName);
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
  
   //let optionsDDSelections = ['--Select--','Foods To Be Ommitted', 'Nutrition Supplement', 'Milk Substitute'];
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

   const setDropDownSubstitutesFieldValues = (e) =>
   {
    e.preventDefault();
     /* for(const key in listBlueCycle) {     
      _DDMenuCodeSelect.options[_DDMenuCodeSelect.options.length] = new Option(listBlueCycle[key]);
    }

    Milk_Sub_Name	
    SupplementName
    Foods_to_be_Omitted	

    */

     var _DDSSelect = document.getElementById('ddFTBOList_Selected'); 

     appendDropDownSubstitutesFieldValues('ddFTBOList_Selected','Foods_to_be_Omitted');
     appendDropDownSubstitutesFieldValues('ddNutSubList_Selected','SupplementName');
     appendDropDownSubstitutesFieldValues('ddMilkSubList_Selected','Milk_Sub_Name');
     
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
        });

        _fieldName.value = _strDDValues;
    }


    async function AddStudentDataRecord() {
      //var myAPI = new studentInfoApi;
      //var _response = await myAPI.AddStudentComplexDataRecord(student)
    }

    

    const searchStudent =()=>
    {

    }

    const generateStudentID =()=>
    {
      var studentIDField = document.getElementById('Student_ID');
      studentIDField.value = 'STID_' + generateUUIDUsingMathRandom().substring(0,12);
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
            
              //*****RESERVE FOR FOODS TO BE OMMITTED ***
          
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

            //****Nutrition Supplement ***

            //*****Milk Substitute ***

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
   
    function removeOptions(selectElement) {
      var i, L = selectElement.options.length - 1;
      for(i = L; i >= 0; i--) {
         selectElement.remove(i);
      }
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

     

  return (
    <div>
      <main>
        <Container>
        <h1>Student Record</h1> 
          <Form>
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
                            <Form.Label>School</Form.Label>
                            <SchoolListDropDown 
                                handleChange = {(e) =>handleChange(e)}
                                name='ddSchoolListings'
                                id='ddSchoolListings'/>
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
                          name='ddSchoolYears'
                          id='ddSchoolYears'
                          onChange={handleChange}
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

               <Row>
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
               <Row>
               <Col sm={6}>
                  <input type='text' 
                   id='Foods_to_be_Omitted'
                   name='Foods_to_be_Omitted' />
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

                <Row>
                  <Col sm={6}>
                    <input type='text' 
                    id='SupplementName'
                    name='SupplementName' />
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

                <Row>
                  <Col sm={6}>
                    <input type='text' 
                    id='Milk_Sub_Name'
                    name='Milk_Sub_Name' />
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
          </Form>
        </Container>
      </main>

    </div>
  )
}

export default StudentDataEntry
