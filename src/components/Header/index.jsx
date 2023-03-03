import React from 'react';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from 'react-redux'

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link, useNavigate } from "react-router-dom";
import { logout, selectIsAuth } from "../../store/slices/auth";

export const Header = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
  const navigate = useNavigate()

  const onClickLogout = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
    navigate('/login')
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>Typper</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
