import React from 'react'
import {useState,useEffect} from 'react';

function GenericDDSelect(props) {
  
    function createSelectItems(props) {
        var _ADMINSelect = document.getElementById(props.name); 
        
        for(const key in props.items) {
            _ADMINSelect.options[_ADMINSelect.options.length] = new Option(props.items[key]);
         }  
        
      }
  
      useEffect(() => {
        createSelectItems(props);
      },[]);

    return (
      <div>
      
       <select class="form-select form-select-sm" 
              aria-label=".form-select-sm example" 
              style={{ width: 250 }} id={props.name}
              onChange={props.handleOnChange}
              >
        
      </select>
      </div>
  )
}

export default GenericDDSelect