import React from "react";

function Button({classes, buttonText}) {

    return (
        <button className={classes}>{buttonText}</button>
    )
}

export default Button;