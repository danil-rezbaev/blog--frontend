import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { Link, useNavigate, useParams } from "react-router-dom";

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../store/slices/auth";
import axios from "../../axios";

export const AddPost = () => {
  const {id} = useParams()

  useEffect(() => {
    if(id) {
      axios.get(`posts/${id}`).then(({data}) => {
        setTitle(data.title)
        setText(data.text)
        setImageUrl(data.imageUrl)
        setTags(data.tags)
      })
    }
  }, [])

  const isEditing = Boolean(id)

  const [title, setTitle] = React.useState('');
  const [text, setText] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');

  const inputFileRef = React.useRef(null)

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData()
      formData.append('image', event.target.files[0])

      const {data} = await axios.post('/upload', formData)
      setImageUrl(data.url)
    } catch (err) {
      console.warn(err)
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('')
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  const isAuth = useSelector(selectIsAuth)
  const navigate = useNavigate()

  if(!window.localStorage.getItem('token') && !isAuth) {
    return navigate('/')
  }

  const onsubmit = async () => {
    try {
      const fields = {
        title,
        text,
        tags,
        imageUrl
      }

      const {data} = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields)

      const _id = isEditing ? id : data._id

      return navigate(`/posts/${_id}`)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input type="file" ref={inputFileRef} onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={styles.image} src={`http://localhost:4444/${imageUrl}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        value={tags}
        onChange={e => setTags(e.target.value)}
        fullWidth />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onsubmit} size="large" variant="contained">
          {isEditing
            ? "Сохранить"
            : "Опубликовать"
          }
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};
