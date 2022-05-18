import React from "react";
import * as S from "./checkbox.style";
import PropTypes from "prop-types";
export default function Checkbox({ onChange, checked, ...props }) {

  const handleChange = (e) => {
      const value = e.target.checked;
      onChange && onChange(value);
  }  


  return (
    <S.Checkbox>
      <S.CheckboxInput
        type="checkbox"
        onChange={handleChange}
        checked={checked}
        {...props}
      />
      <S.CheckboxBox />
    </S.Checkbox>
  );
}


Checkbox.propTypes = {
    onChange: PropTypes.func,
    checked: PropTypes.bool,
}