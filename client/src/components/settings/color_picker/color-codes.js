import React, { useEffect } from "react";
import useRgbToHex from "./utils/rgbToHex";
import useHsvToRgb from "./utils/hsvToRgb";

const ColorCodes = ({h, s, v}) => {
    
    const rgbCode = useHsvToRgb(h, s, v);
    
    const hexCode = useRgbToHex(rgbCode);

    return (
        <div className="colors-container">
            <div className="color-code-container">
                <div>
                    <span style={{fontWeight: "500"}}>RGB </span>
                    {rgbCode && <span>{rgbCode[0]}, {rgbCode[1]}, {rgbCode[2]}</span>}
                </div>
                <div>
                    <span style={{fontWeight: "500"}}>HEX </span>
                    {hexCode && <span>{hexCode}</span>}
                </div>
            </div>
            <div className="box" style={{backgroundColor: `rgb(${rgbCode})`}}></div>
        </div>
    );

};

export default ColorCodes;