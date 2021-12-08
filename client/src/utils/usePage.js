/**
 * 
 * set current page in session storage so that when the user reloads the page, stays at the same location
 * 
 */

import { useEffect } from "react";

export default function usePage( page ) {

    useEffect(() => {
        sessionStorage.setItem("page", `/${page}`);
    }, []);
    
};