import React, {useState} from 'react'
import { useEffect } from 'react';
import { Col, Container,Row ,Form} from 'react-bootstrap';
//react bootstrap table next
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, {CSVExport} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import studentInfoApi from '../../api/studentInfoApi';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import SchoolYearDropDown from '../ReusableAppComponents/SchoolYearDropDown';


function StudentTrainingNotesReport() {
    const [tblStudentResults, settblStudentResults] = useState([])
    const { ExportCSVButton } = CSVExport;
 
  
   
   const handleChange =(e) =>{
     e.preventDefault();
     //console.log("In the handleChange function");
     var _ddSchoolYear = document.getElementById('ddSchoolYears');
     if(_ddSchoolYear.value != "--Select--") {
      //console.log(_ddSchoolYear.value);
       fetchStudentData(_ddSchoolYear.value);
     }
   }

    async function fetchStudentData(schoolYear)
    {
        let studentSampleData = [];
         var myAPI = new studentInfoApi;
        studentSampleData = await myAPI.getSchoolTrainingInformation(schoolYear)
        settblStudentResults(studentSampleData)
    }

    const MyExportCSV = (props) => {
      const handleClick = () => {
        props.onExport();
      };
      return (
        <div>
          <button className="btn btn-success" onClick={ handleClick }>Export to CSV</button>
        </div>
      );
    };
  
    const rowStyle = {  height: '10px', padding: '2px 0' };

    //b.id,b.FirstName,b.LastName,b.Student_ID,a.NoteType,a.Note,a.DateEntered,a.SchoolName,a.SchoolYear
    const columns = [
    {
        dataField: 'id',
        text: 'id',
        style: { width: '10px' },
        hidden :true,
        csvExport: false
    },
    {
      dataField: 'SchoolYear',
      text: 'Year',
      style: { width: '75x' },
   },
    {
      dataField: 'LastName',
      text: 'Last Name',
      filter: textFilter(),
      sort: true
    },
    {
      dataField: 'FirstName',
      text: 'First Name',
      filter: textFilter(),
      sort: true
    },
    {
      dataField: 'Student_ID',
      text: 'Student ID',
      sort: true
    },
    {
      dataField: 'NoteType',
      text: 'Training Type',
      style: { width: '15x' },
      filter: textFilter(),
      sort: true
    },
    {
      dataField: 'DateEntered',
      text: 'Date Entered',
    },
    {
      dataField: 'School',
      text: 'School Name',
      filter: textFilter()
  
    },
   
    ];


    return (
      <div>
        <Container>
        <Form>
          <Row>
            <Col
              sm={1.75}
              style={{ paddingRight: 8, marginLeft: 12, width: 150 }}
            >
              School Year
            </Col>
            <Col sm={2}>
              <SchoolYearDropDown
                name="ddSchoolYears"
                handleChange={(e) => handleChange(e)}
              />
            </Col>
          </Row>
        </Form>
        </Container>
        <br></br>

        <Container>
        <main>
          <ToolkitProvider
            keyField="id"
            data={tblStudentResults}
            columns={columns}
            exportCSV={{
              onlyExportFiltered: true,
              exportAll: false,
            }}
          >
            {(props) => (
              <div>
              
                <MyExportCSV {...props.csvProps} />
                <hr />
                <BootstrapTable
                  {...props.baseProps}
                  striped
                  hover
                  pagination={paginationFactory()}
                  rowStyle={rowStyle}
                  filter={filterFactory()}
                />
              </div>
            )}
          </ToolkitProvider>
        </main>
        </Container>
       
      </div>
    );
}

export default StudentTrainingNotesReport