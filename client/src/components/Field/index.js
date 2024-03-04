import React from "react";

import './Field.css';

function Field({ inputType, inputName, placeholder, value, onChange, isTextarea }) {
    const InputComponent = isTextarea ? 'textarea' : 'input';

    return (
        <div className="field-wrapper">
            <InputComponent
                type={inputType}
                className="field-input"
                id={`input_${inputName}`}
                name={`input_${inputName}`}
                placeholder={placeholder}
                value={value} 
                onChange={onChange} 
            />
        </div>
    );
}

export default Field;

