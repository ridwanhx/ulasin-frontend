import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import MovieList from "./pages/movie/MovieList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/movies" element={ <MovieList/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
