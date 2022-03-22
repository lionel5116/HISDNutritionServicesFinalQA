import React, {useState,useEffect} from 'react';
import studentInfoApi from '../../api/studentInfoApi';

function SchoolListDropDown() {

const [dropDownSchoolListingData, setdropDownSchoolListingData] = useState([])

useEffect(() => {
    fetchSchoolListingData();
  },[]);

async function fetchSchoolListingData() {        
      let _SCHOOL_LISTING_DATA = [];
      var myAPI = new studentInfoApi;
      _SCHOOL_LISTING_DATA = await myAPI.fetchSchoolListings()
     
      var _DDSchoolListingSelect = document.getElementById('ddSchoolListings'); 

      const _dropDownValues = _SCHOOL_LISTING_DATA.map((response) => ({
        "EducationOrgNaturalKey" : response.EducationOrgNaturalKey,
        "label" : response.NameOfInstitution
      }))
      
      setdropDownSchoolListingData(_dropDownValues)

      for(const key in _SCHOOL_LISTING_DATA) {     
         _DDSchoolListingSelect.options[_DDSchoolListingSelect.options.length] = new Option(_SCHOOL_LISTING_DATA[key].NameOfInstitution);
      }
   
  }

  return (
    <div>
      <select class="form-select form-select-sm" 
              aria-label=".form-select-sm example" 
              style={{ width: 300 }} id='ddSchoolListings'>
        
      </select>
    </div>
  )
}

export default SchoolListDropDown