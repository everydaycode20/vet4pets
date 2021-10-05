import {useState, useEffect} from "react";

/**
 * 
 * takes a RGB value and returns its HEX
 * 
 * @param {Array} rgbCodes 
 * @returns {String} hexValue
 */

const useRgbToHex = (rgbCodes) => {
    
    const [hexValue, setHexValue] = useState(null);

    useEffect(() => {

        if (rgbCodes) {
            setHexValue(`#${rgbValueToHex(rgbCodes[0])}${rgbValueToHex(rgbCodes[1])}${rgbValueToHex(rgbCodes[2])}`);
        }

    }, [rgbCodes]);

    return hexValue;
};

//https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

const rgbValueToHex = (value) => {
    const hex = value.toString(16);

    return hex.length === 1 ? `0${hex}` : hex;
};

export default useRgbToHex;