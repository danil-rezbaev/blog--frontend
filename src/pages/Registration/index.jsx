import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

import styles from './Registration.module.scss';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchRegister } from "../../store/slices/auth";

export const Registration = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.auth.data)

  const {register, handleSubmit,
    formState: {errors, isValid}
  } = useForm({
    defaultValues: {
      email: '',
      username: '',
      password: ''
    }, mode: 'onChange'})

  const onSubmit = async (value) => {
    const data = await dispatch(fetchRegister(value))

    console.log({data})

    if(!data.payload) {
      alert('Не удалось зарегистрироваться')
    }

    if('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  if(isAuth) {
    return navigate('/')
  }

  return (
    <Grid container md={12}>
      <Paper classes={{ root: styles.root }}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Создание аккаунта
        </Typography>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={styles.field}
            label="Email"
            error={errors.email}
            helperText={errors.email?.message}
            {...register('email', {required: "Укажите полную почту"})}
            fullWidth
          />
          <TextField
            className={styles.field}
            label="username"
            error={errors.username}
            helperText={errors.username?.message}
            {...register('username', {required: "Укажите имя пользователя"})}
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
            Зарегистрироваться
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};
