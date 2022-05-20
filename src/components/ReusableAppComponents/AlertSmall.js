import React from 'react'
import {Button,
} from 'react-bootstrap';

function AlertSmall(props) {
  return (props.show) && (
    <div class={props.alertClassType} role="alert">
            {props.msgBody}
        <hr />
        <div>
            <Button onClick={props.toogleAlert} variant="outline-success">
                            Dismiss
            </Button>
        </div>
    </div>
  );    
}

export default AlertSmall