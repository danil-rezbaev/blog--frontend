import Container from "@mui/material/Container";
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import {Routes, Route} from 'react-router-dom'
import { SearchOnTag } from "./pages/SearchOnTag";
import { useDispatch } from "react-redux";
import {useEffect} from "react";
import { fetchAuthMe } from "./store/slices/auth";
import Stack from "@mui/material/Stack";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Routes>
            <Route index path='/' element={<Home/>}/>
            <Route path='/posts/:id/edit' element={<AddPost/>}/>
            <Route path='/posts/:id' element={<FullPost/>}/>
            <Route path='/add-post' element={<AddPost/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Registration/>}/>
            <Route path='/tags/:tagName' element={<SearchOnTag/>}/>
          </Routes>
        </Stack>
      </Container>
    </>
  );
}

export default App;
