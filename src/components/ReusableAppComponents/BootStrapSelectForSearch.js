import React from 'react'

function BootStrapSelectForSearch(props) {
  return (
    <div>
      <select class="form-select form-select-sm" 
              aria-label=".form-select-sm example" 
              style={{ width: 100 }} id={props.name}>
        <option value="equals">equals</option>
        <option value="contains">contains</option>
      </select>
    </div>
  )
}

export default BootStrapSelectForSearch