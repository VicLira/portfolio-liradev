import React from "react"

function LoadImg({classes, imgTitle, imgURL}) {
    return <img
        className={classes}
        src={imgURL}
        alt={`Imagem ${imgTitle}`}
    />
}

export default LoadImg