import React from "react";
import "../styles/FormField.css"

const FormField = ({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
}) => {
  return (
    <div className="bcn-formField">
    <label className="bcn-label">{labelName}</label>
        <input
          required
          value={value}
          onChange={handleChange}
          step={0.2}
          type={inputType}
          placeholder={placeholder}
          className="bcn-input"
          />
      </div>
  );
};

export default FormField;
