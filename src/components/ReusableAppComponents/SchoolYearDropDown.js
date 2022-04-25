import React, {useState,useEffect} from 'react';
import studentInfoApi from '../../api/studentInfoApi';

function SchoolYearDropDown(props) {

    useEffect(() => {
        fetchSchoolYears();
    },[]);
  

  async function fetchSchoolYears() {         
    let _SCHOOL_YEAR_DATA = [];
    var myAPI = new studentInfoApi;
    _SCHOOL_YEAR_DATA = await myAPI.fetchSchoolYears()
   
    var _DDSchoolYearSelect = document.getElementById('ddSchoolYears'); 

    _DDSchoolYearSelect.options[_DDSchoolYearSelect.options.length] = new Option('--Select--');
    for(const key in _SCHOOL_YEAR_DATA) {     
        _DDSchoolYearSelect.options[_DDSchoolYearSelect.options.length] = new Option(_SCHOOL_YEAR_DATA[key]);
    }
 
   }

 return (
    <div>
    <select class="form-select form-select-sm" 
            aria-label=".form-select-sm example" 
            style={{ width: 300 }} id={props.name}>
      
    </select>
  </div>
  )
}

export default SchoolYearDropDown