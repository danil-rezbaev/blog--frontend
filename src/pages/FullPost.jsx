import React, { useCallback, useEffect, useState } from "react";
import {useParams} from "react-router-dom";

import { Post } from "../components";
import { Index } from "../components";
import { CommentsBlock } from "../components";
import axios from "../axios";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Alert, AlertTitle } from "@mui/material";

export const FullPost = () => {
  const auth = useSelector(state => state.auth.data)

  const [data, setData] = useState(null)
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    axios.get(`posts/${id}`)
      .then(value => {
        setData(value.data)
        setIsLoading(false)

        if(value.data.comments) {
          setComments(value.data.comments)
        }
      })
      .catch(console.warn)
  }, [])

  const onSendComment = useCallback(async (value) => {
    try {
      const {text} = value
      const formatData = {user: data?.user, text}

      const response = await axios.patch(`/posts/${id}/comment`, formatData)

      if(response.data) {
        setComments(value => [...value, formatData])
      }
    } catch (err) {
      alert(`Не удалось отправить комментарий ${err}`)
    }
  }, [data])

  if(isLoading) {
    return <Post isLoading={isLoading} isFullPost/>
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl}
        user={data.user}
        createdAt={new Date(data.createdAt).toDateString()}
        viewsCount={data.viewsCount}
        commentsCount={comments.length}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown>{data.text}</ReactMarkdown>
      </Post>
      <CommentsBlock
        items={comments}
        isLoading={false}
      >
        { auth
          ? <Index user={auth} onSend={onSendComment} />
          : (
            <Alert severity="warning">
              <AlertTitle>Предупреждение</AlertTitle>
              Для того чтобы оставлять комментарии пожалуйста <Link to="/login">авторизуйтесь</Link>
            </Alert>
          )
        }
      </CommentsBlock>
    </>
  );
};
