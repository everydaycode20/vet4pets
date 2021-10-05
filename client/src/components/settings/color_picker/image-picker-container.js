import React, { useState, useRef, useCallback, useEffect} from "react";
import "./styles/styles.css";

import ColorCodes from "./color-codes";
import ColorSlider from "./color-slider";
import ColorBox from "./color-box";

import useHsvToRgb from "./utils/hsvToRgb";
import useRgbToHex from "./utils/rgbToHex";

export default function ImagePicker({ colorCode, setColor }) {
    
    const canvasBoxRef = useRef(null);

    const canvasBarRef = useRef(null);

    const selector = useRef(null);

    const [fixedColorsBox, setFixedColorsBox] = useState({h: 360, s: 100, v: 100});

    const [hsv, setHsv] = useState({h: 360, s: 100, v: 100});

    const rgbCode = useHsvToRgb(fixedColorsBox.h, fixedColorsBox.s, fixedColorsBox.v);

    const rgbColors = useHsvToRgb(hsv.h, hsv.s, hsv.v);

    const hexCode = useRgbToHex(rgbColors);

    const refSelectorBar = useRef(null);

    let posSelector = {x: -10, y: -10};

    const mouseDown = useCallback( (e) => {

        const rectBar = canvasBarRef.current.getBoundingClientRect();
        
        refSelectorBar.current.style.top = `${(e.clientY - rectBar.top) - 10}px`;

        document.addEventListener("mousemove", mouseMove );
        document.addEventListener("mouseup", mouseUp);

    },[],);
    
    useEffect(() => {

        if (setColor) {
            setColor(hexCode);
        }

    }, [hexCode]);

    function mouseMove(e) {
        
        const rectBar = canvasBarRef.current.getBoundingClientRect();

        const selectorPos = e.clientY - rectBar.top;
        
        const hueBar = selectorPos * 1.5;
        
        if (hueBar <= 360 && hueBar >= 0) {
            setFixedColorsBox(prev => ({...prev, h: hsv.h - hueBar}));
            setHsv(prev => ({...prev, h: hsv.h - hueBar}));
        }

        if (Math.ceil( e.clientY - rectBar.top ) <= 240 && Math.ceil( e.clientY - rectBar.top ) >= 0) {
            refSelectorBar.current.style.top = `${(e.clientY - rectBar.top) - 10}px`;
        }
        
    }

    function mouseUp() {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
    }

    let mousePos = {x: 0, y: 0};
    
    const colorBoxMouseDown = e => {
        
        const rect = canvasBoxRef.current.getBoundingClientRect();

        const boxRect = canvasBoxRef.current.getBoundingClientRect();

        selector.current.style.left = `${( e.clientX - boxRect.left ) - 10}px`;
        selector.current.style.top = `${( e.clientY - boxRect.top ) - 10}px`;

        posSelector.x = e.clientX - rect.left;
        posSelector.y = e.clientY - rect.top;

        const mousePositionInBoxY = e.clientY - boxRect.top;
        const mousePositionInBoxX = e.clientX - rect.left;

        const valueBox = mousePositionInBoxY * (100 / 240);

        const saturationBox = mousePositionInBoxX * (100 / 240);

        setHsv(prev => ({...prev, s: Math.ceil(100 - (100 - saturationBox)), v: Math.ceil(100 - valueBox)}));

        document.addEventListener("mousemove", mouseMoveSelector);
        document.addEventListener("mouseup", mouseUpSelector);

    };
    
    const mouseDownSelector = (e) => {
        
        const rect = e.target.getBoundingClientRect();

        posSelector.x = e.clientX - rect.left;
        posSelector.y = e.clientY - rect.top;
        
        document.addEventListener("mousemove", mouseMoveSelector);
        document.addEventListener("mouseup", mouseUpSelector);
    }

    const mouseMoveSelector = (e) => {
        
        const boxRect = canvasBoxRef.current.getBoundingClientRect();
        
        const rect = canvasBoxRef.current.getBoundingClientRect();

        const mousePositionInBoxY = e.clientY - boxRect.top;
        const mousePositionInBoxX = e.clientX - rect.left;
        
        const valueBox = mousePositionInBoxY * (100 / 240);

        const saturationBox = mousePositionInBoxX * (100 / 240);
        
        if((e.clientY > mousePos.y || e.clientY < mousePos.y) && mousePositionInBoxY <= 240 && mousePositionInBoxY >= 0){//mouse moves up or down
            setHsv(prev => ({...prev, v: Math.ceil(100 - valueBox)}));
        }

        if ((e.clientX > mousePos.x || e.clientX < mousePos.x) && mousePositionInBoxX <= 240 && mousePositionInBoxX >= 0) {//mouse moves right or left
            setHsv(prev => ({...prev, s: Math.ceil(  100 - ( 100 - saturationBox ) ) } ) );
        }

        if (Math.ceil( e.clientX - boxRect.left ) >= 240) {
            selector.current.style.top = `${( e.clientY - boxRect.top ) - 10}px`;
        }
        else if(Math.ceil( e.clientX - boxRect.left ) <= 0){
            selector.current.style.top = `${( e.clientY - boxRect.top ) - 10}px`;
        }
        else if(Math.ceil( e.clientY - boxRect.top ) >= 240){
            selector.current.style.left = `${( e.clientX - boxRect.x ) - 10}px`;
        }
        else if(Math.ceil( e.clientY - boxRect.top ) <= 0){
            selector.current.style.left = `${( e.clientX - boxRect.x ) - 10}px`;
        }
        else{
            selector.current.style.left = `${( e.clientX - boxRect.x ) - 10}px`;
            selector.current.style.top = `${( e.clientY - boxRect.top ) - 10}px`;
        }


        if(Math.ceil( e.clientY - boxRect.top ) <= 0 && Math.ceil( e.clientX - boxRect.left ) <= 0){
            selector.current.style.left = `${-10}px`;
            selector.current.style.top = `${-10}px`;
        }
        else if (Math.ceil( e.clientY - boxRect.top ) >= 240 && Math.ceil( e.clientX - boxRect.left ) <= 0) {
            selector.current.style.left = `${-10}px`;
            selector.current.style.top = `${228}px`;
        }
        else if (Math.ceil( e.clientY - boxRect.top ) <= 0 && Math.ceil( e.clientX - boxRect.left ) >= 240) {
            selector.current.style.left = `${228}px`;
            selector.current.style.top = `${-10}px`;
        }
        else if(Math.ceil( e.clientY - boxRect.top ) >= 240 && Math.ceil( e.clientX - boxRect.left ) >= 240){
            selector.current.style.left = `${228}px`;
            selector.current.style.top = `${228}px`;
        }
        
        mousePos.x = e.clientX;
        mousePos.y = e.clientY;
        
    }

    const mouseUpSelector = () => {
        
        document.removeEventListener("mousemove", mouseMoveSelector);
        document.removeEventListener("mousemove", mouseUpSelector);
        
    }

    return (
        <section className="main-picker-container">

            <div className="image-picker-container">
                <ColorBox canvasBoxRef={canvasBoxRef} colorBoxMouseDown={colorBoxMouseDown} rgbCode={rgbCode} selector={selector} mouseDownSelector={mouseDownSelector}/>

                <ColorSlider canvasBarRef={canvasBarRef} refSelectorBar={refSelectorBar} mouseDown={mouseDown}/>
            </div>
            
            {colorCode && <ColorCodes h={hsv.h} s={hsv.s} v={hsv.v} />}
            
        </section>
    );
}