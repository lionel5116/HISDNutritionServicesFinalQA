import React from 'react'
import {useState,useEffect} from 'react';
import studentInfoApi from '../../api/studentInfoApi';

function GenericMultipleSelect(props) {
    return (
      <div>
       <select class="form-select form-select-sm" 
              aria-label=".form-select-sm example" 
              style={{ width: 250 }} 
              id={props.name}
              multiple
              
              >
        
      </select>
      </div>
  )
}

export default GenericMultipleSelect