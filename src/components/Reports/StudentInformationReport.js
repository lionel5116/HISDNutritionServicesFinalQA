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
  

export class StudentInformationReport extends Component {
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
        this.fetchStudentSampleData();
    }


 

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
        studentSampleData = await myAPI.getAllSudentDataAxios()
      
 
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
                            <h2>Student Information Report</h2>
                            <BootstrapTable data={this.state.axiosRecsStudent} striped hover options={options}
                                pagination
                                deleteRow={true} selectRow={selectRowProp}
                                insertRow
                                exportCSV
                                searchPlaceholder= {'Filter Your Search'}
                            >
                                <TableHeaderColumn row="1" width="1%" editable={false} isKey dataField="id" hidden="true">ID</TableHeaderColumn>
                                {/*<TableHeaderColumn row="1" width="6%" dataField="Student_ID">Student_ID</TableHeaderColumn>*/}
                                <TableHeaderColumn row="1" width="10%" dataField="LastName">LastName</TableHeaderColumn>
                                <TableHeaderColumn row="1" width="10%" dataField="FirstName" >FirstName</TableHeaderColumn>
                                <TableHeaderColumn row="1" width="5%" dataField="Menu_Color" filter={{ type: 'TextFilter', delay: 1000}} dataSort>Menu Color</TableHeaderColumn>
                                <TableHeaderColumn row="1" width="5%" dataField="Menu_Code" filter={{ type: 'TextFilter', delay: 1000}} dataSort>Menu Code</TableHeaderColumn>            
                                <TableHeaderColumn row="1" width="10%" dataField="School" filter={{ type: 'TextFilter', delay: 1000}} dataSort>School</TableHeaderColumn>
                                <TableHeaderColumn row="1" width="15%" dataField="SupplementName" filter={{ type: 'TextFilter', delay: 1000}} dataSort>SupplementName</TableHeaderColumn>
                                <TableHeaderColumn row="1" width="15%" dataField="Substitution" filter={{ type: 'TextFilter', delay: 1000}} dataSort>Substitution</TableHeaderColumn>
                                <TableHeaderColumn row="1" width="15%" dataField="Foods_to_be_Omitted" filter={{ type: 'TextFilter', delay: 1000}} dataSort>Omitted Foods</TableHeaderColumn>
                                <TableHeaderColumn row="1" width="15%" dataField="Texture_Modification" filter={{ type: 'TextFilter', delay: 1000}} dataSort>Texture Mod</TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                </Container>
              </div>
            );
        }
    }
}

export default StudentInformationReport
