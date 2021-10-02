import React, { useState, useEffect, useContext } from "react";

import Sound from "../assets/notification_audio.mp3";

import { SettingsContext } from "./providers";

const useAudio = () => {

    const [audio] = useState(new Audio(Sound));

    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    const { notificationsSettings } = useContext(SettingsContext);
    
    useEffect(() => {
        
        if (notificationsSettings.sound === false) {
            audio.volume = 0;
        }
        else if (notificationsSettings.volume === 0 && notificationsSettings.sound === true) {
            audio.volume = 0.15;
        }
        else if(notificationsSettings.volume === 1 && notificationsSettings.sound === true){
            audio.volume = 0.5;
        }
        else if(notificationsSettings.volume === 2 && notificationsSettings.sound === true){
            audio.volume = 0.8;
        }
        

        playing && audio.play();
        
    }, [playing]);

    useEffect(() => {
        
        audio.addEventListener("ended", () => setPlaying(false));

        return () => audio.removeEventListener("ended", () => setPlaying(false));

    }, []);

    return [playing, toggle, audio];

};

export default useAudio;