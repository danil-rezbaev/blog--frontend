import React from 'react';
import styles from './UserInfo.module.scss';

export const UserInfo = ({ avatarUrl, nickname, additionalText }) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl || '/noavatar.png'} alt={nickname} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{nickname}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
