import React from 'react'
import {Button,
    Container,
    Row,
    Col,Form,Tabs,Tab} from 'react-bootstrap';

function GenericMultiSelectCombo(props) {
  return (
    <div>
          <Form>
              <Row>
                  <Col sm={3}>
                      <label style={{fontWeight:'bold'}}>{props.label_ddLeft}</label>
                      <select class="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                          style={{ width: 250 }}
                          id={props.name_ddLeft}
                          multiple
                      >
                      </select>
                  </Col>

                  <Col sm={.5} style={{ padding: 0 ,marginTop:50}}>
                      <button
                          style={{ display: 'block' }}
                          name={props.buttonRight}
                          onClick={props.handleClickRight}>
                          {'>'}
                      </button>
                      <button
                          style={{ display: 'block' }}
                          name={props.buttonLeft}
                          onClick={props.handleClickLeft}>
                          {'<'}
                      </button>
                  </Col>

                  <Col sm={3}>
                      <label style={{fontWeight:'bold'}}>{props.label_ddRight}</label>
                      <select class="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                          style={{ width: 250 }}
                          id={props.name_ddRight}
                          multiple
                      >
                      </select>
                  </Col>
              </Row>
          </Form>
    </div>
  )
}

export default GenericMultiSelectCombo