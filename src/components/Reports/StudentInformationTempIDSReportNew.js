import React, {useState} from 'react'
import { useEffect } from 'react';
import { Col, Container,Row } from 'react-bootstrap';
//react bootstrap table next
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, {CSVExport} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import studentInfoApi from '../../api/studentInfoApi';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

function StudentInformationTempIDSReportNew() {
    const [tblStudentResults, settblStudentResults] = useState([])
    const { ExportCSVButton } = CSVExport;
 
  
    useEffect(() => {
        fetchStudentData();
    },[]);
  
    async function fetchStudentData()
    {
        let studentSampleData = [];
         var myAPI = new studentInfoApi;
        studentSampleData = await myAPI.getAllSudentDataTEMPIDSAxios()
      
        settblStudentResults(studentSampleData)
      
    }
  
    const rowStyle = {  height: '10px', padding: '2px 0' };

    const columns = [
    {
        dataField: 'Student_ID',
        text: 'Temp_ID',
        filter: textFilter(),
        sort: true
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
      sort: true
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
        hidden :true
      },
    ];


  
    return (
    <div>
     <main>
       
            <Container>

        
               <ToolkitProvider
                 keyField="id"
                 data={tblStudentResults}
                 columns={columns}
                 exportCSV
                 
                  >
                 {
                     props=> (
                         <div>
                              <ExportCSVButton { ...props.csvProps }>Export</ExportCSVButton>
                            
                            <hr />
                            <BootstrapTable { ...props.baseProps }
                              striped
                              hover 
                              pagination={paginationFactory()}
                              rowStyle={rowStyle}
                              filter={ filterFactory()}

                            />
                         </div>
                     )

                 }

               </ToolkitProvider>
               </Container>
  
     </main>

    </div>
  )
}

export default StudentInformationTempIDSReportNew