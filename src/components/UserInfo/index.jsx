import React from 'react';
import styles from './UserInfo.module.scss';

export const UserInfo = ({ avatarUrl, username, additionalText }) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl || '/noavatar.png'} alt={username} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{username}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
