import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import {useDispatch, useSelector} from 'react-redux'

import { Post } from '../components';
import { TagsBlock } from '../components';
import { fetchNewPosts, fetchPopularPosts, fetchTags } from "../store/slices/posts";
import { Link } from "react-router-dom";

export const Home = () => {
  const [typePosts, setTypePosts] = useState('new')
  const dispatch = useDispatch()
  const {posts, tags} = useSelector(state => state.posts)
  const userData = useSelector(state => state.auth.data)

  const isPostLoading = posts.status === 'loading'
  const isTagsLoading = tags.status === 'loading'

  useEffect(() => {
    dispatch(fetchTags())
  }, [])

  useEffect(() => {
    if(typePosts === 'new') {
      dispatch(fetchNewPosts())
    } else if (typePosts === 'popular') {
      dispatch(fetchPopularPosts())
    }
  }, [typePosts])

  const [activeTab, setActiveTab] = useState(0)

  const tabOnClick = (index, type) => {
    setActiveTab(index)
    setTypePosts(type)
  }

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={activeTab}>
        <Tab label="Новые" onClick={() => tabOnClick(0, 'new')} />
        <Tab label="Популярные" onClick={() => tabOnClick(1, 'popular')} />
      </Tabs>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid md={8} xs={12} item>
          {isPostLoading
            ? [...Array(5)].map((_,index) => <Post key={index} isLoading={true}/> )
            :  (posts.items)?.map((obj) => (
              <Link to={`/posts/${obj._id}`}>
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
              </Link>
            ))
            }
        </Grid>
        <Grid md={4} xs={12} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          {/*<CommentsBlock*/}
          {/*  items={[*/}
          {/*    {*/}
          {/*      user: {*/}
          {/*        nickname: 'Вася Пупкин',*/}
          {/*        avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',*/}
          {/*      },*/}
          {/*      text: 'Это тестовый комментарий',*/}
          {/*    },*/}
          {/*    {*/}
          {/*      user: {*/}
          {/*        nickname: 'Иван Иванов',*/}
          {/*        avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',*/}
          {/*      },*/}
          {/*      text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',*/}
          {/*    },*/}
          {/*  ]}*/}
          {/*  isLoading={false}*/}
          {/*/>*/}
        </Grid>
      </Grid>
    </>
  );
};
