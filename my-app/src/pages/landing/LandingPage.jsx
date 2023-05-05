import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import Game from '../../components/game/Game'
import { getUserInfo } from "../../api/api";
import NavBar from "../../components/nav/NavBar";
import Loading from "../../components/loading/Loading";
import { isLoggedIn } from "../../utils/tokenTools";
import CountDown from "../../components/timer/CountDown";

const LandingPage = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true)
  const hasLogin = isLoggedIn()

  useEffect(() => {
    getUserInfo()
      .then((data) => setUsername(data.username))
      .catch((err) => console.log(err))
    if (hasLogin) {
      setLoading(false)
    } else {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
  }, [hasLogin]);

  return (
    <div className={styles.container}>
      { loading ? (
        <Loading />
      ) : (
        <>
          {/*<h1>Event will start on: 2023/05/07 12:01:00</h1>*/}
          {/*<CountDown eventDate={'2023/05/07 12:01:00' } />*/}
          <NavBar username={username} />
          <Game username={username} />
        </>
      )}
    </div>
  );
};

export default LandingPage;
