import { useState, useEffect } from 'react';

/**
 * 
 * @param {*} io from Socket.io
 * 
 * @returns 
 * 
 */

const useSocket = (io) => {

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        
        const newSocket = io("http://localhost:8080");

        setSocket(newSocket);

        return () => newSocket.close();

    }, [setSocket]);

    return socket;

};

export default useSocket;