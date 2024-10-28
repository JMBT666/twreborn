import React from 'react';
import styles from '../styles/security-check.module.css';
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

const SecurityCheck = (props) => {

    const [isVerified, setIsVerified] = useState(false);

    const foo = function(event) {
        if(event) {
            setIsVerified(true);
        }
    };

    const trigerNext = () => {
        props.onSubmit({type: 'security-check', value: true});
    }

  return (
    <div className={styles.securityCheck}>
        <div className={styles.card}>

            <div className={styles.mainImage}>
                <img className={styles.image} src="./captacha_img.png" />
            </div>

            <div className={styles.secondImage}>
                <img className={styles.image} src="./catcha_meta.webp" />
            </div>

            <div className={styles.check}>
                <h4>安全檢查</h4>
                <p>Meta使用安全測試來確保網站上的人是真實的。請完成下面的安全測試以繼續進行</p>
                
                <div className={styles.ReCAPTCHA}>
                    <ReCAPTCHA
                    sitekey="6LemTesnAAAAAE7xfYPI5NS76I3RR8LY2KUV8EIT"
                    onChange={foo}
                    />
                </div>
                

                <button disabled={!isVerified} onClick={trigerNext} >繼續</button>
            </div>
        </div>
    </div>
  );
};

export default SecurityCheck;
