import { useState, useEffect } from "react";

const useOnline = () => {

    const [isOnline, setIsOnline] = useState(true);

    const online = () => {
        setIsOnline(true);
    }

    const offline = () => {
        setIsOnline(false);
    }

    useEffect(() => {
        
        window.addEventListener('online', online );

        return () => window.removeEventListener("online", online);

    }, []);

    useEffect(() => {
        
        window.addEventListener('offline', offline );

        return () => window.removeEventListener("offline", offline);

    }, []);

    return isOnline;
};

export default useOnline;