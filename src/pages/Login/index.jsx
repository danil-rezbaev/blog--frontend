import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import styles from "./Login.module.scss";
import {useForm} from "react-hook-form";
import { fetchAuth } from "../../store/slices/auth";
import { Alert, Snackbar } from "@mui/material";

export const Login = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.auth.data)

  const [alertVisible, setAlertVisible] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertVisible(false)
  };

  const {register, handleSubmit,
    formState: {errors, isValid}
  } = useForm({
    defaultValues: {
      username: '',
      password: ''
    }, mode: 'onChange'})

  const onSubmit = async (value) => {
    const data = await dispatch(fetchAuth(value))

    if(!data.payload) {
      setAlertVisible(true)
      return
    }

    if('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  if(isAuth) {
    return navigate('/')
  }

  return (
    <>
      <Grid container md={12}>
        <Paper classes={{ root: styles.root }}>
          <Typography classes={{ root: styles.title }} variant="h5">
            Вход в аккаунт
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              className={styles.field}
              label="username"
              error={errors.username}
              helperText={errors.username?.message}
              {...register('username', {required: "Укажите username"})}
              fullWidth
            />
            <TextField
              className={styles.field}
              label="Пароль"
              error={errors.password}
              helperText={errors.password?.message}
              {...register('password', {required: "Укажите пароль"})}
              fullWidth
            />
            <Button
              type="submit"
              size="large"
              variant="contained"
              disabled={!isValid}
              fullWidth
            >
              Войти
            </Button>
          </form>
        </Paper>
      </Grid>
      <Snackbar open={alertVisible} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error">
          Проверьте правильность введенных данных
        </Alert>
      </Snackbar>
    </>
  );
};
