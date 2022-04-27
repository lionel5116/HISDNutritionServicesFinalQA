import React,{useState} from 'react'
import {Button,
   } from 'react-bootstrap';
function AlertDismissible(props) {
    //const [show, setShow] = useState(true);
  
    return (props.show) && (
        <div class={props.msgClass} role="alert">
            <h4 class="alert-heading">Information !</h4>
            <p>{props.msgBody}</p>
            <hr />
            <p class="mb-0">{props.msgBody2}</p>
            <div className="d-flex justify-content-end">
                <Button onClick={props.toogleAlert} variant="outline-success">
                    Dismiss
                </Button>
            </div>
        </div>
    );
  }
  
  export default AlertDismissible