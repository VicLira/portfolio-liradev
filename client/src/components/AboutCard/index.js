import React from "react";

import LoadImg from "../LoadImg";
import "./AboutCard.css";

function AboutCard({classes, imgTitle, imgURL, studyTitle, studyDate}) {

    return (
        <div className="about-card-wrapper">
            <LoadImg classes={classes} imgTitle={imgTitle} imgURL={imgURL}/>
            <div className="column">
                <p className="primary-text">{studyTitle}</p>
                <p className="secondary-text">{studyDate}</p>
            </div>
        </div>
    )
}

export default AboutCard;