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
  

export class StudentInformationTempIDSReport extends Component {
  
   constructor(props, context){
     super(props, context);
       this.state = {
        axiosRecsStudent: [],
        done: false
       }
   }

   

    componentDidMount(){
        this.fetchStudentSampleData();
    }


 

    renderShowsTotal(start, to, total) {
        return (
            <p style={{color: 'black'}}>
            From {start} to {to}. Total: {total}&nbsp;&nbsp;
            </p>
        );
    }

  
    async fetchStudentSampleData()
    {
        let studentSampleData = [];
         var myAPI = new studentInfoApi;
        studentSampleData = await myAPI.getAllSudentDataTEMPIDSAxios()
      
 
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
        
            sizePerPage: 25,
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
                  <div ref={this.wrapper}>
                            <h2>Student Information Report - Temp Student IDs..</h2>
                            <BootstrapTable data={this.state.axiosRecsStudent} striped hover options={options}
                                pagination
                                deleteRow={true} selectRow={selectRowProp}
                                insertRow
                                exportCSV
                                searchPlaceholder= {'Filter Your Search'}
                            >
                                <TableHeaderColumn row="1" width="1%" editable={false} isKey dataField="id" hidden="true">ID</TableHeaderColumn>
                                <TableHeaderColumn row="1" width="25%" dataField="Student_ID" filter={{ type: 'TextFilter', delay: 1000}} dataSort>Student ID</TableHeaderColumn>
                                <TableHeaderColumn row="1" width="25%" dataField="LastName">LastName</TableHeaderColumn>
                                <TableHeaderColumn row="1" width="25%" dataField="FirstName" >FirstName</TableHeaderColumn>
                                <TableHeaderColumn row="1" width="25%" dataField="School" filter={{ type: 'TextFilter', delay: 1000}} dataSort>School</TableHeaderColumn>
                                
                            </BootstrapTable>
                        </div>
                </Container>
              </div>
            );
        }
    }
}

export default StudentInformationTempIDSReport
