import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Container,Button } from 'react-bootstrap';
import {
  Card,
  Row,
  Col} from 'react-bootstrap';
  import {BootstrapTable,TableHeaderColumn,Grid} from "react-bootstrap-table";

  import studentInfoApi from '../../api/studentInfoApi'
  import Config from '../../api/config'

//https://www.filestack.com/fileschool/react/react-file-upload/
function UploadFilesLight(props)
{
    const [file, setFile] = useState('')

    //const [tblFiles, setTblFileData] = useState([])

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    const url = Config.REST_URL + '/api/UploadFiles/upload/' + props.studentID;
    
    if(file != '') {} else {return;}
    if(props.studentID !='') {} else {return;}

    console.log(url)
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });

     {props.fetchAttachments()}
  }

  function renderShowsTotal(start, to, total) {
    return (
        <p style={{color: 'black'}}>
        From {start} to {to}. Total: {total}&nbsp;&nbsp;
        </p>
    );
}


/*
async function fetchAttachments()
{
  let _attachments = [];
  var myAPI = new studentInfoApi;
  if(props.studentID !='') {} else {return;}
  _attachments =await myAPI.getAttachmentsAxios(props.studentID)
  //console.log(_attachments)
  setTblFileData(_attachments)
}
*/


function CellFormatter(cell, row) {
  return (<div><a href={Config.REST_URL + '/api/UploadFiles/DownloadFile/' + row.id}>{cell}</a></div>);
}

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
    paginationShowsTotal: renderShowsTotal
  };

  return (
    <div className="UploadFilesLight" style={{display:props.displayAttachments}}>
      <Container>
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
                   >Fetch Attachments</Button>
          </Col>
        </Row>
   
        <br></br>

        <Row>
          <Col sm={12}> 
            <h2>Files - Attachments</h2>
            <BootstrapTable data={props.tblFiles} striped hover options={options}
              pagination           
            >
              <TableHeaderColumn row="1" width="33%" editable={false} isKey dataField="id" dataFormat={CellFormatter}>Download</TableHeaderColumn>
              <TableHeaderColumn row="1" width="33%" dataField="Student_ID">Student ID</TableHeaderColumn>
              <TableHeaderColumn row="1" width="33%" dataField="Name">Name</TableHeaderColumn>           
            </BootstrapTable>
          </Col>
        </Row>
      </Container>
    </div>
  );
}


export default UploadFilesLight;