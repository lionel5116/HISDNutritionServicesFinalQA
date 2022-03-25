import React from 'react'
import {useState,useEffect} from 'react';
import studentInfoApi from '../../api/studentInfoApi';

function GenericMultipleSelect(props) {

  /*
  useEffect(() => {
    fetchSearchDDListData();
  },[]);
  */
  
     /* 
     async function fetchSearchDDListData() {        
        let _DD_LIST_DATA = [];
        var myAPI = new studentInfoApi;
        _DD_LIST_DATA = await myAPI.fetchSearchDDListData(props.itemType)
       
        var _DDSSelect = document.getElementById(props.name); 
  
      
       
        for(const key in _DD_LIST_DATA) {     
          _DDSSelect.options[_DDSSelect.options.length] = new Option(_DD_LIST_DATA[key]);
        }
     
    }
    */
  
     

    return (
      <div>
      
       <select class="form-select form-select-sm" 
              aria-label=".form-select-sm example" 
              style={{ width: 250 }} id={props.name}
              multiple>
        
      </select>
      </div>
  )
}

export default GenericMultipleSelect