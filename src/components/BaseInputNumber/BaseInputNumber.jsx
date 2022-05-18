import React from 'react'
import PropTypes from "prop-types";

export default function BaseInputNumber({onChange, onBlur,value, ...props}) {

 const handleChange = (e) => {
    let val = e.target.value;
    if((/^\d+$/.test(val) || val === "") && onChange ){
        onChange(val)
    }
 }

 const handleBlur = (e) => {
   let val = e.target.value;
   onBlur && onBlur(val);
 }

  return (
    <input {...props} type="text" onBlur={handleBlur} onChange={handleChange} value={value}/>
  )
}



BaseInputNumber.propTypes = {
    onChange : PropTypes.func,
    onBlur : PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
}

