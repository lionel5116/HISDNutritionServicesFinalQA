import React, {useState,useEffect} from 'react';
import SchoolListDropDown from '../ReusableAppComponents/SchoolListDropDown';
import {Button,
    Container,
    Row,
    Col,Form,Tabs,Tab} from 'react-bootstrap';
import GenericMultipleSelect from '../ReusableAppComponents/GenericMultipleSelect';
import GenericMultiSelectCombo from '../ReusableAppComponents/GenericMultiSelectCombo';
import studentInfoApi from '../../api/studentInfoApi';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { ArrowLeftSquare } from 'react-bootstrap-icons';



function Communications() {
  const [SchoolTraining, setSchoolTraining] = useState({});


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
                       DateEntered:newDate};//vanilla object
                      
   
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
                            />
                        </Col>
                    </Row>
                <br></br>

                {/*
                 <Row>
                     <Col  sm={3}> 
                       <GenericMultipleSelect
                         name='ddTrainingList'
                       />
                     </Col>
                   
                     <Col sm={.5} style={{padding:0}}>
                      <button
                        style={{display:'block'}}
                        id='btnTrainingType'
                        name='btnTrainingType'>
                        {'>'}
                      </button>
                      <button
                        style={{display:'block'}}
                        id='btnRemoveTrainingType'
                        name='btnRemoveTrainingType'>
                       {'<'}
                      </button>
                     </Col>

                     <Col  sm={3}> 
                       <GenericMultipleSelect
                         name='ddTrainingList_Selected'
                       />
                     </Col>
                 </Row>
              */}
    
           
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
                </Tab>
              </Tabs>
          </Form>
      </Container>
     </main>
    </div>
  )
}

export default Communications