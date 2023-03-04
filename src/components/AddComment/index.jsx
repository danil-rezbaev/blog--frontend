import React from "react";
import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

export const Index = (props) => {
  const {
    user,
    onSend
  } = props

  const {register, handleSubmit,
    formState: {errors}
  } = useForm({
    defaultValues: {
      text: '',
    }, mode: 'onChange'})

  const onSubmit = (value) => {
    onSend(value)
  }

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={user.imageUrl}
        />
        <div className={styles.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Написать комментарий"
              variant="outlined"
              maxRows={10}
              error={errors.text}
              helperText={errors.text?.message}
              {...register('text', {required: "Укажите комментарий"})}
              multiline
              fullWidth
            />
            <Button type="submit" variant="contained">Отправить</Button>
          </form>
        </div>
      </div>
    </>
  );
};
