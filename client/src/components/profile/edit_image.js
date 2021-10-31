import React, { useState, useRef, useContext } from "react";

import { AuthContext } from "../../utils/useAuth";

import DefaultProfilePhoto from "../../assets/profile_filled_grey.svg";

import getCookie from "../../utils/getCookie";

import styles from "../../styles/profile/edit_image.module.scss";

const EditImage = ( { user } ) => {
    
    const { auth } = useContext(AuthContext);

    const inputRef = useRef(null);

    const [error, setError] = useState({status: false, message: ""});

    const [image, setImage] = useState({image: DefaultProfilePhoto, status: !user.image || false});

    const [loading, setLoading] = useState(false);

    function openInput() {
        inputRef.current.click();
    }

    const handleFile = e => {

        if (!e.target.files[0].name.match(/.(jpg|jpeg|png)$/i)) {
            setError(prev => ({...prev, status: true, message: "upload a png, jpg or jpeg image"}));
        }
        if (e.target.files[0].size > 1_000_000) {
            setError(prev => ({...prev, status: true, message: "upload an image smaller than 1 MB"}));
        }
        else{

            setLoading(true);

            setError(prev => ({...prev, status: false, message: ""}));
            const form = new FormData();

            form.append("file", e.target.files[0]);

            uploadFile(form);
        }

    }

    const uploadFile = (form) => {

        const cookie = getCookie("csrfToken");

        fetch("/image", {
            method: "POST",
            credentials: "include",
            body: form,
            headers: {
                "CSRF-TOKEN": cookie
            },
        }).then(res => res.json()).then(data => {

            if (data.status) {

                setImage(prev => ({...prev, status: true, image: data.image}));

                setLoading(false);
    
                auth.setUser(prev => ({...prev, image: data.image}));

            }
            else{
                setLoading(false);
                setError(prev => ({...prev, status: true, message: "upload a png, jpg or jpeg image"}));
            }

        }).catch(err => console.log(err));

    };

    return (
        <div className={styles.container}>
            <h3>Change image</h3>
            
            <div className={styles.image}>

                {image.status ? 
                    <img src={image.image} alt="profile" /> : 
                    <img src={user.image} alt="profile" />
                }

            </div>
            
            {loading && <div className={styles.loader_container}>
                <div className={styles.loader}></div>
                <span>uploading image</span>
            </div>}

            <div>
                <button className={styles.btn} type="button" onClick={() => openInput()}>Upload new image</button>

                <input style={{display:'none'}} type="file" name="image" id="image" ref={inputRef} accept="image/png, image/jpeg, image/jpg" onChange={e => handleFile(e)} />

            </div>
            {error && <span className={styles.error}>{error.message}</span>}
        </div> 
    );

};

export default EditImage;