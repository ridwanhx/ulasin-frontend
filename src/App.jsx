import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import MovieList from "./pages/movie/MovieList";
import MovieDetail from "./pages/movie/MovieDetail";
import Navbar from "./components/util/Navbar";

// Helper untuk mengatur tampilan Navbar
const Layout = ({ children }) => {
  const location = useLocation();

  // inisialisasi daftar path yang tidak menampilkan navbar
  const hideNavbarPaths = ["/login"];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {showNavbar && <Navbar />}
      {children}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
