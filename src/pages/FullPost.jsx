import React, { useCallback, useEffect, useState } from "react";
import {useParams} from "react-router-dom";

import { Post } from "../components";
import { Index } from "../components";
import { CommentsBlock } from "../components";
import axios from "../axios";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
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
        <Index user={data.user} onSend={onSendComment} />
      </CommentsBlock>
    </>
  );
};
