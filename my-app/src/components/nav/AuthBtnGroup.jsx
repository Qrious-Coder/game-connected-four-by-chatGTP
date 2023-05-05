import React from 'react';
import styles from "../../pages/landing/styles.module.scss";
import {Link, useNavigate} from "react-router-dom";

const AuthBtnGroup = ({username}) => {
  const navigate = useNavigate()
  const handleLogin = () => {
    navigate('/login');
  }

  const handleRegister = () => {
    navigate('/register')
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <>
      { !username ?
        <>
        <span className={styles.navbarText}>
          Hello, my Guest!
        </span>
          <button className={styles.btn} >
            <Link to='/login' className={styles.navLink} onClick={ handleLogin }>
              Login
            </Link>
          </button>
          <button className={styles.btn} >
            <Link to='/register' className={styles.navLink} onClick={ handleRegister }>
              Register
            </Link>
          </button>
        </>
        :<>
          <span className={styles.navbarText}>
            Welcome, {username}!
          </span>
          <button className={styles.btn} onClick={ handleLogout }>
            <Link to='/login' className={styles.navLink}>
              Logout
            </Link>
          </button>
        </>}
    </>
  )
};

export default AuthBtnGroup;