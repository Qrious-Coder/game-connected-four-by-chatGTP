import React from 'react';
import styles from "../../pages/landing/styles.module.scss";
import AuthBtnGroup from "./AuthBtnGroup";

const NavBar = ({username}) => {
  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <a href="/" className={styles.navbarLogo}>玩儿ChatGTP</a>
          <ul className={styles.navbarNav}>
            <li className={styles.navItem}><a href="/" className={styles.navLink}>Home</a></li>
            <li className={styles.navItem}><a href="/about" className={styles.navLink}>About</a></li>
          </ul>
        </div>
        <div className={styles.navbarRight}>
          <div className={styles.buttonGroup}>
            <AuthBtnGroup username={ username } />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;