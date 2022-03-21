import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import studentInfoApi from '../../api/studentInfoApi';
import {ListGroup,Form,Container} from 'react-bootstrap';
import axios from 'axios';
import uniqueid from 'uniqid'
import {BootstrapTable,TableHeaderColumn,Grid,Row,Col} from "react-bootstrap-table";



  const selectRowProp = {
    mode: 'checkbox'
  };
  

export class StudentInformation extends Component {
   /*
    static propTypes = {

    }
  */
   constructor(props, context){
     super(props, context);
       this.state = {
        axiosRecsStudent: [],
        done: false
       }
   }

   

    componentDidMount(){
        //this.loadStudentSampleData();
        this.fetchStudentSampleData();
    }


    /*
    loadStudentSampleDataOLD()
    {
        axios.get(`http://appsdev.houstonisd.org/HISDDevAppsWEBAPI/api/StudentEntryData/getStudentInformationDataTop25Rows/`)
          .then(res => {

            let studentSampleData = [];
                studentSampleData = res.data
           
            let studentRecords = studentSampleData.map(studRecItem =><ListGroup.Item key={uniqueid()} 
              action  onClick={() => this.selectHcadRecordItem(studRecItem.FirstName)}>
               School: {studRecItem.School} <br /> 
               LastName: {studRecItem.LastName}  <br /> 
               FirstName: {studRecItem.FirstName } <br /> 
               Medical_Condition: {studRecItem.Medical_Condition} 
              </ListGroup.Item>)

             this.setState({
                    axiosRecsStudent: studentRecords,
                     done: true
                    });
          });
    }
    */

    renderShowsTotal(start, to, total) {
        return (
            <p style={{color: 'black'}}>
            From {start} to {to}. Total: {total}&nbsp;&nbsp;
            </p>
        );
    }

    async loadStudentSampleData()
    {
        let studentSampleData = [];
         var myAPI = new studentInfoApi;
        studentSampleData = await myAPI.getSampleSudentDataAxios()
        let studentRecords = studentSampleData.map(studRecItem =><ListGroup.Item key={uniqueid()} 
        action  onClick={() => this.selectHcadRecordItem(studRecItem.FirstName)}>
         School: {studRecItem.School} <br /> 
         LastName: {studRecItem.LastName}  <br /> 
         FirstName: {studRecItem.FirstName } <br /> 
         Medical_Condition: {studRecItem.Medical_Condition} 
        </ListGroup.Item>)
 
       this.setState({
              axiosRecsStudent: studentRecords,
               done: true
              });
    }

    async fetchStudentSampleData()
    {
        let studentSampleData = [];
         var myAPI = new studentInfoApi;
        studentSampleData = await myAPI.getSampleSudentDataAxios()
      
 
       this.setState({
              axiosRecsStudent: studentSampleData,
               done: true
              });
    }


  selectHcadRecordItem(FirstName)
  {
     alert("Record Information for :" + FirstName)
  }

 
    render() {

        const options = {
            exportCSVText: 'Export CSV',
            insertText: 'Insert',
            deleteText: 'Delete',
            saveText: 'Save',
            closeText: 'Close',
        
            sizePerPage: 50,
            sortOrder: 'desc',
            prePage: 'Prev',
            nextPage: 'Next',
            firstPage: 'First',
            lastPage: 'Last',
            paginationShowsTotal: this.renderShowsTotal
          };

        if(!this.state.done) {
            return (
                <div>
                    Student Information Loading .....
                </div>
            )
        } else {
            return (
              <div id="MasterContainer">
                <Container>
                  {/*
                  <h1>HCAD Records</h1>
                  <Form>
                    <Form.Group controlId="spacer">
                      <hr></hr>
                    </Form.Group>
  
                    <Form.Group controlId="StudentList">
                      <ListGroup>{this.state.axiosRecsStudent}</ListGroup>
                    </Form.Group>
                  </Form>
                  */}
                  <div ref={this.wrapper}>
                            <h2>Boot Strap Table Example</h2>
                            <BootstrapTable data={this.state.axiosRecsStudent} striped hover options={options}
                                deleteRow={true} selectRow={selectRowProp}
                                insertRow
                                exportCSV
                                searchPlaceholder= {'Search by School, Last,First Name'}
                            >
                                <TableHeaderColumn row="1" width="4%" editable={false} isKey dataField="id" >ID</TableHeaderColumn>
                                {/*<TableHeaderColumn row="1" width="45%" dataField="School" dataFormat={this.CustomInputFormatterProductPrice.bind(this)}>Product Name</TableHeaderColumn>*/}
                                <TableHeaderColumn row="1" width="24%" dataField="School" filter={{ type: 'TextFilter', delay: 1000}} dataSort>School</TableHeaderColumn>
                                <TableHeaderColumn row="1" width="24%" dataField="LastName" filter={{ type: 'TextFilter', delay: 1000}} dataSort>LastName</TableHeaderColumn>
                                <TableHeaderColumn row="1" width="24%" dataField="FirstName" filter={{ type: 'TextFilter', delay: 1000}} dataSort>FirstName</TableHeaderColumn>
                                <TableHeaderColumn row="1" width="24%" dataField="Medical_Condition" >Medical Condition</TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                </Container>
              </div>
            );
        }
    }
}

export default StudentInformation
