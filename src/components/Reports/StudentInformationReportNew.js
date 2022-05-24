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

function StudentInformationReportNew() {
    const [tblStudentResults, settblStudentResults] = useState([])
    const { ExportCSVButton } = CSVExport;
 
  
    useEffect(() => {
        fetchStudentData();
    },[]);
  
    async function fetchStudentData()
    {
        let studentSampleData = [];
         var myAPI = new studentInfoApi;
        studentSampleData = await myAPI.getAllSudentDataAxios()
      
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
      text: 'Menu_Color',
      filter: textFilter()
    },
    {
      dataField: 'Menu_Code',
      text: 'Menu_Code',
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
        text: 'NeedsF_U',
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
     <main>
       
            
               <ToolkitProvider
                 keyField="id"
                 data={tblStudentResults}
                 columns={columns}
                 exportCSV = {{
                  onlyExportFiltered: true,
                  exportAll:false
                 }}
                  >
                 {
                     props=> (
                         <div>
                              {/*<ExportCSVButton { ...props.csvProps }>Export</ExportCSVButton>*/}
                              <MyExportCSV { ...props.csvProps } />
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
  
     </main>

    </div>
  )
}

export default StudentInformationReportNew