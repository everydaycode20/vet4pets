import React, { useState, useEffect } from "react";

import Sound from "../assets/notification_audio.mp3";

const useAudio = () => {

    const [audio] = useState(new Audio(Sound));

    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        
        audio.volume = 0.15;

        playing && audio.play();
        
    }, [playing]);

    useEffect(() => {
        
        audio.addEventListener("ended", () => setPlaying(false));

        return () => audio.removeEventListener("ended", () => setPlaying(false));

    }, []);

    return [playing, toggle, audio];

};

export default useAudio;