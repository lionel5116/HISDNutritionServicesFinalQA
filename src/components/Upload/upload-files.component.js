import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Container,Button } from 'react-bootstrap';
import {
  Card,
  Row,
  Col} from 'react-bootstrap';
  //import {BootstrapTable,TableHeaderColumn,Grid} from "react-bootstrap-table";
  import { TrashFill,ArrowClockwise  } from 'react-bootstrap-icons';
  import studentInfoApi from '../../api/studentInfoApi';
  import Config from '../../api/config'
  import AlertSmall from '../ReusableAppComponents/AlertSmall';

  //react bootstrap table next
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


//https://www.filestack.com/fileschool/react/react-file-upload/
function UploadFilesLight(props)
{
    const [file, setFile] = useState('')
    const [showAlert, setShowAlert] = useState(false);
    const [msgBody,setmsgBody] = useState('');
    const [alertClassType,setalertClassType] = useState('alert alert-primary');

    //const [tblFiles, setTblFileData] = useState([])

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    const url = Config.REST_URL + '/api/UploadFiles/upload/' + props.studentID;
    
    if(file != '') {} else {return;}
    if(props.studentID !='') {} else {return;}

  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    try{

      axios.post(url, formData, config).then((response) => {
        //console.log(response.data);
        var _btnfetchAttach = document.getElementById('btnFetchAttachments'); 
        _btnfetchAttach.click();
      });

      window.alert("File Uploaded!");
    }
    catch(error)
    {
      window.alert("There was an issue uploading file!");
    }
  }
   


async function deleteAttachment(id) {  
 

  const confirmBox = window.confirm(
    "Are you sure you want to delete this item?"
  )
  if (confirmBox === true) {} else {return;}

  let results = '';
  var myAPI = new studentInfoApi;
  try
  {
    results = await myAPI.deleteAttachment(id)
    var _btnfetchAttach = document.getElementById('btnFetchAttachments'); 
    _btnfetchAttach.click();
    
    window.alert("File Deleted");
  }
  catch(err)
  {
    console.log(err)
    window.alert("There was an issue deleting the attachment!!");
   
  }

}


const closeAlert = (e) => {
  e.preventDefault();
  setShowAlert(false);

}


function CellFormatter(cell, row) {
  return (<div><a href={Config.REST_URL + '/api/UploadFiles/DownloadFile/' + row.id}>{cell}</a></div>);
}

function CellFormatteDelete(cell, row) {
  return ( <div>
    <TrashFill 
      onClick={()=>deleteAttachment(row.id)}/>
  </div>
 );
}



const rowStyle = {  height: '10px', padding: '2px 0' };

const columns = [
  {
    dataField: 'id',
    text: 'id',
    formatter: CellFormatter
  }, 
  {
    dataField: 'Student_ID',
    text: 'Student ID'

  }, 
  {
    dataField: 'Name',
    text: 'Name'
  }, 
  {
    dataField: 'id',
    text: 'Delete',
    formatter: CellFormatteDelete
  }, 
];

  return (
    <div className="UploadFilesLight" style={{display:props.displayAttachments}}>
      <Container>
      <AlertSmall
         show={showAlert}
         msgBody={msgBody}
         alertClassType={alertClassType}
         toogleAlert={(e) => closeAlert(e)}
        />
        <Row>
          <Col sm={12}>
            <form>
              <h1>Upload Attachments</h1>
              <input type="file" onChange={handleChange} />
              <Button variant="warning" onClick={(e) => handleSubmit(e)}>Upload </Button>
            </form>
          </Col>
        </Row>

       <hr></hr>

      
       <Row>
          <Col sm={12}>
          <Button variant="warning" 
                   onClick={props.fetchAttachments}
                   id={props.btnFetchAttachments}
                   name={props.btnFetchAttachments}
                   style={{display:"none"}}
                   ><ArrowClockwise /></Button>
          </Col>
        </Row>
   
        <br></br>

        <Row>
          <Col sm={12}> 
            <h2>Files - Attachments</h2>
            {/*
            <BootstrapTable data={props.tblFiles} striped hover options={options}
              pagination           
            >
              <TableHeaderColumn row="1" width="33%" editable={false} isKey dataField="id" dataFormat={CellFormatter}>Download</TableHeaderColumn>
              <TableHeaderColumn row="1" width="33%" dataField="Student_ID">Student ID</TableHeaderColumn>
              <TableHeaderColumn row="1" width="33%" dataField="Name">Name</TableHeaderColumn>  
              <TableHeaderColumn row="1" width="33%" editable={false} dataField="id" dataFormat={CellFormatteDelete}>Delete</TableHeaderColumn>         
            </BootstrapTable>
          */}
                  <BootstrapTable
                      striped
                      hover
                      keyField="id"
                      data={props.tblFiles}
                      columns={columns}
                      pagination={paginationFactory()}
                      rowStyle={rowStyle}
                
                    />

          </Col>
        </Row>
      </Container>
    </div>
  );
}


export default UploadFilesLight;