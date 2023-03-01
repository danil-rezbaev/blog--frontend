import Container from "@mui/material/Container";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Home />
        {/*<Fullgit remote add origin https://github.com/danil-rezbaev/blog--frontend.gitPost />*/}
        {/*<AddPost />*/}
        {/*<Login />*/}
        {/*<Registration />*/}
      </Container>
    </>
  );
}

export default App;
