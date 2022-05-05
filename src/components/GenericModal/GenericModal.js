import React from 'react'
import {Button,
    Card,
    Container,
    Row,
    Col,Form,Tabs,Tab,Modal} from 'react-bootstrap';

function GenericModal(props) {
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
            <Col sm={12}>
              <label style={{marginRight:15}}>{props.title}</label>
              <input id={props.id} style={styles.modalInputSyle}>
              </input>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={props.handleClickTwo()}
            
              style={{display: props.handleClickTwoVisable}}
            >
            {props.delete}
          </Button>

          <Button
            variant="primary"
            onClick={props.handleClickOne()}>
            {props.Submit}
          </Button>

          <Button
            variant="primary"
            onClick={props.handleClosePrimary()}>
            {props.close}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
  
}


const styles = {
  modalInputSyle: {
    width:600
  }
};


export default GenericModal