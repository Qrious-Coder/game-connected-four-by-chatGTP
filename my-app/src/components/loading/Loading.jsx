import React from 'react';
import styles from './styles.module.scss'

const Loading = () => (
  <div className={styles[`loading-container`] }>
    <div className={styles.loading}></div>
  </div>
);

export default Loading;
