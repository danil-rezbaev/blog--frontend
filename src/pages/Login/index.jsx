import React  from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import styles from "./Login.module.scss";
import {useForm} from "react-hook-form";
import { fetchAuth } from "../../store/slices/auth";

export const Login = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.auth.data)

  const {register, handleSubmit,
    formState: {errors, isValid}
  } = useForm({
    defaultValues: {
      nickname: '',
      password: ''
    }, mode: 'onChange'})

  const onSubmit = async (value) => {
    const data = await dispatch(fetchAuth(value))

    if(!data.payload) {
      alert('Не удалось авторизоваться')
    }

    if('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  if(isAuth) {
    return navigate('/')
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="nickname"
          error={errors.nickname}
          helperText={errors.nickname?.message}
          {...register('nickname', {required: "Укажите почту"})}
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
  );
};
