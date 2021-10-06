import React from "react";

const ColorBox = ({canvasBoxRef, colorBoxMouseDown, rgbCode, selector, mouseDownSelector}) => {

    return (
        <div id="color-box" className="color-box" ref={canvasBoxRef} onMouseDown={e => colorBoxMouseDown(e)} style={{background: `linear-gradient(180deg, rgba(255, 255, 255, 0)0%, rgba(0, 0, 0, 1)98%), linear-gradient(90deg, rgba(255, 255, 255, 1)0%, rgba(${rgbCode}, 1)70%)`}}>
                
            <div className="box-selector" ref={selector} onMouseDown={e => mouseDownSelector(e)}>
                <div className="inner-box-selector"></div>
            </div>

        </div>
    );

};

export default ColorBox;