import React from 'react'
import {Button,
    Col,Form,
    Row,
    Modal} from 'react-bootstrap';
    
import SchoolListDropDown from '../ReusableAppComponents/SchoolListDropDown';
import SchoolYearDropDown from '../ReusableAppComponents/SchoolYearDropDown';

function ModalForStudentSearch(props) {
  return (
    <div>
      <Modal
        show={props.showPrimaryModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.actionLabel} {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col
              sm={1.75}
              style={{ paddingRight: 10, marginLeft: 12, width: 150 }}
            >
              Student ID *
            </Col>
            <Col sm={2}>
              <input type="text" id="Student_ID" style={{ width: 300 }} />
              
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col
              sm={1.75}
              style={{ paddingRight: 10, marginLeft: 12, width: 150 }}
            >
              School Name *
            </Col>
            <Col sm={5}>
              <select
                class="form-select form-select-sm"
                aria-label=".form-select-sm example"
                style={{ width: 500 }}
                name='ddSchoolListings2'
                id='ddSchoolListings2'
              ></select> 
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col
              sm={1.75}
              style={{ paddingRight: 10, marginLeft: 12, width: 150 }}
            >
              First Name
            </Col>
            <Col sm={2}>
              <input type="text" id="FirstName" style={{ width: 300 }} />
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col
              sm={1.75}
              style={{ paddingRight: 10, marginLeft: 12, width: 150 }}
            >
              Last Name
            </Col>
            <Col sm={2}>
              <input type="text" id="LastName" style={{ width: 300 }} />
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col
              sm={1.75}
              style={{ paddingRight: 10, marginLeft: 12, width: 150 }}
            >
              Date of Birth
            </Col>
            <Col sm={2}>
              <input type="date" id="Birthday" style={{ width: 300 }} />
            </Col>
          </Row>
          <br></br>
          <Row className="mb-3">
                <Col sm={1.75} style={{paddingRight:10,marginLeft:12,width:150}}>
                    School Year
                  </Col>
                  <Col sm={5}>
                      <input
                      type="text"
                      name="SchoolYear"
                      id="SchoolYear"
                      style={{ width:300}}
                    ></input>
                  </Col>
          </Row>
          <br></br>
          <Row>
            <Col
              sm={1.75}
              style={{ paddingRight: 10, marginLeft: 12, width: 150 }}
            >
              Date Received
            </Col>
            <Col sm={2}>
              <input type="date" id="Date_Received" style={{ width: 300 }} />
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col
              sm={1.75}
              style={{ paddingRight: 10, marginLeft: 12, width: 150 }}
            >
              Date Processed
            </Col>
            <Col sm={2}>
              <input type="date" id="Date_Processed" style={{ width: 300 }} />
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col
              sm={1.75}
              style={{ paddingRight: 10, marginLeft: 12, width: 150 }}
            >
              Notes
            </Col>
            <Col sm={2}>
              <textarea
                id="Notes"
                style={{ height: "100px", width: 500 }}
              ></textarea>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.handleClickOne()}>
            {props.Submit}
          </Button>

          <Button variant="primary" onClick={props.handleClosePrimary()}>
            {props.close}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
  
}


const styles = {
  modalInputSyle: {
    width:600
  }
};


export default ModalForStudentSearch