/**
 * 
 * @param {String} name token name
 * 
 * @returns {String} token string
 * 
 */

const getCookie = name => {

    let cookieValue = "";

    if (document.cookie && document.cookie !== "") {

        const cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {
            
            const cookie = cookies[i].trim();

            if (cookie.substring(0, name.length + 1) === (`${name}=`)) {
                cookieValue = cookie.substring(name.length + 1);
                break;
            }
            
        }

    }
    return cookieValue;
};

export default getCookie;