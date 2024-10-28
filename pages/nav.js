import styles from '../styles/nav.module.css';


const Nav = () => {
    return (
        <div className={styles.nav}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <img src="meta.svg"/>
                    <span>Support Inbox</span>
                </div>
                <div className={styles.right}>
                    <img src="search-13-64.a9254a55959a7da573f4.ico" />
                </div>
            </div>
        </div>
    );
  };
  
export default Nav;