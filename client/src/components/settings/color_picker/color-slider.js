import React,{memo} from "react";

const ColorSlider = memo(({canvasBarRef, refSelectorBar, mouseDown}) => {
    
    return (
        <div className="color-bar-container">
            <div className="color-bar" ref={canvasBarRef} onMouseDown={e => mouseDown(e)}>

                <div className="selector-bar" ref={refSelectorBar}>
                    <div className="inner-box-selector"></div>
                </div>

            </div>
            
        </div>
    );

});

export default ColorSlider;