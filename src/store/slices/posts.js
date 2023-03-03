import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchNewPosts = createAsyncThunk('posts/fetchNewPosts', async () => {
  const {data} = await axios.get('/posts')
  return data
})

export const fetchPopularPosts = createAsyncThunk('posts/fetchNewPosts', async () => {
  const {data} = await axios.get('/posts/popular')
  return data
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const {data} = await axios.get('/posts/tags')
  return data
})

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
  await axios.delete(`/posts/${id}`)
})


const initialState = {
  posts: {
    items: [],
    status: 'loading'
  },
  tags: {
    items: [],
    status: 'loading'
  }
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
  },
  extraReducers: {
    // получение новых статей
    [fetchNewPosts.pending]: (state) => {
      state.posts.items = []
      state.posts.status = 'loading'
    },
    [fetchNewPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload
      state.posts.status = 'loaded'
    },
    [fetchNewPosts.rejected]: (state) => {
      state.posts.items = []
      state.posts.status = 'error'
    },
    // получение популярных статей
    [fetchPopularPosts.pending]: (state) => {
      state.posts.items = []
      state.posts.status = 'loading'
    },
    [fetchPopularPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload
      state.posts.status = 'loaded'
    },
    [fetchPopularPosts.rejected]: (state) => {
      state.posts.items = []
      state.posts.status = 'error'
    },
    // получение тегов
    [fetchTags.pending]: (state) => {
      state.tags.items = []
      state.tags.status = 'loading'
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload
      state.tags.status = 'loaded'
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = []
      state.tags.status = 'error'
    },
    //удаление статьи
    [fetchRemovePost.fulfilled]: (state, action) => {
      state.posts.items = state.posts.items.filter((item) => item._id !== action.meta.arg)
      // state.posts.status = 'loading'
    },
    // [fetchRemovePost.fulfilled]: (state, action) => {
    //   state.tags.items = action.payload
    //   state.tags.status = 'loaded'
    // },
    // [fetchRemovePost.rejected]: (state) => {
    //   state.tags.items = []
    //   state.tags.status = 'error'
    // }
  }
})

export const postsReducer = postsSlice.reducer
