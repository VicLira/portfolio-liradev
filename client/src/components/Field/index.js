import React from "react";

import './Field.css';

function Field({ inputType, inputName, placeholder, value, onChange }) {
    return (
        <div className="field-wrapper">
            <input
                type={inputType}
                className="field-input"
                id={`input_${inputName}`}
                name={`input_${inputName}`}
                placeholder={placeholder}
                value={value} 
                onChange={onChange} 
            />
        </div>
    )
}

export default Field;
