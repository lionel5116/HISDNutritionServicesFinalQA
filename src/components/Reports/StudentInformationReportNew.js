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


function StudentInformationReportNew() {
    const [tblStudentResults, settblStudentResults] = useState([])
    const { ExportCSVButton } = CSVExport;
 
  
    /*
    useEffect(() => {
        fetchStudentData();
    },[]);
    */

   const handleChange =(e) =>{
     e.preventDefault();
     console.log("In the handleChange function");
     var _ddSchoolYear = document.getElementById('ddSchoolYears');
     if(_ddSchoolYear.value != "--Select--") {
      console.log(_ddSchoolYear.value);
       fetchStudentData(_ddSchoolYear.value);
     }
   }

    async function fetchStudentData(schoolYear)
    {
        let studentSampleData = [];
         var myAPI = new studentInfoApi;
        studentSampleData = await myAPI.getAllSudentDataAxios(schoolYear)
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

    const columns = [
    {
      dataField: 'LastName',
      text: 'Last Name',
      sort: true
    },
    {
      dataField: 'FirstName',
      text: 'First Name',
      sort: true
    },
    {
      dataField: 'Menu_Color',
      text: 'Menu Color',
      style: { width: '10px'},
      filter: textFilter()
    },
    {
      dataField: 'Menu_Code',
      text: 'Menu Code',
      style: { width: '10px' },
      filter: textFilter()

    },
    {
      dataField: 'Foods_to_be_Omitted',
      text: 'Foods to be Omitted',
      filter: textFilter()

    },
    {
      dataField: 'Texture_Modification',
      text: 'Texture Modification',
      filter: textFilter()
  
    },
    {
      dataField: 'SupplementName',
      text: 'SupplementName',
      filter: textFilter()

  
    },
    {
      dataField: 'Milk_Sub_Name',
      text: 'Milk Sub Name',
      filter: textFilter()

  
    },
    {
        dataField: 'NeedsF_U_String',
        text: 'Needs FU',
        filter: textFilter()
  
      },
    {
      dataField: 'School',
      text: 'School',
      filter: textFilter()

    },
    {
        dataField: 'id',
        text: 'id',
        style: { width: '10px' },
        hidden :true,
        csvExport: false
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
       
      </div>
    );
}

export default StudentInformationReportNew