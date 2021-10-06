import {useState, useEffect} from "react";

/**
 * 
 * takes a hsv value and returns its RGB
 * 
 * @param {Number} h 
 * @param {Number} s 
 * @param {Number} v 
 * @returns {Array} rgb
 */

const useHsvToRgb = (h, s, v) => {

    const [rgb, setRgbValue] = useState(null);

    useEffect(() => {
        setRgbValue(hsvValueToRgb((h/360), (s/100), (v/100)));

    }, [h, s, v]);

    return rgb;
};

//https://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c

const hsvValueToRgb = (h, s , v) => {
    
    let r, g, b;

    let i = Math.floor(h * 6);
    let f = h * 6 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);

    // eslint-disable-next-line default-case
    switch (i % 6) {
        case 0: 
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2: 
            r = p;
            g = v;
            b = t;
            break;
        case 3: 
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5: 
            r = v;
            g = p;
            b = q;
            break;
    }

    return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
};

export default useHsvToRgb;