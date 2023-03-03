import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux'

import { Post } from '../components';
import { TagsBlock } from '../components';
import { useParams } from "react-router-dom";
import axios from "../axios";
import { fetchTags } from "../store/slices/posts";

export const SearchOnTag = () => {
  const { tagName } = useParams()
  const {tags} = useSelector(state => state.posts)
  const [data, setData] = useState([])
  const userData = useSelector(state => state.auth.data)

  const dispatch = useDispatch()
  const isTagsLoading = tags.status === 'loading'

  useEffect(() => {
    dispatch(fetchTags())
  }, [])

  useEffect(() => {
    axios.get(`tags/${tagName}`)
      .then(value => {
        console.log(value)
        setData(value.data)
      })
      .catch(console.warn)
  }, [tagName])

  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {!data.length
            ? [...Array(5)].map((_,index) => <Post key={index} isLoading={true}/> )
            :  data?.map((obj) => (
                <Post
                  id={obj._id}
                  title={obj.title}
                  imageUrl={obj.imageUrl}
                  user={obj.user}
                  createdAt={new Date(obj.createdAt).toDateString()}
                  viewsCount={obj.viewsCount}
                  commentsCount={obj.comments?.length}
                  tags={obj.tags}
                  isEditable={userData?._id === obj.user._id}
                />
            ))
            }
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
