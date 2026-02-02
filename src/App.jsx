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

// Admin
import Dashboard from "./pages/admin/Dashboard";

// Helper untuk mengatur tampilan Navbar
const Layout = ({ children }) => {
  const location = useLocation();

  // inisialisasi daftar path yang tidak menampilkan navbar
  const hideNavbarPaths = ["/login", "/admin/login", "/admin/dashboard"];
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

          {/* User */}
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/login" element={<Login />} />

          {/* Admin */}
          <Route path="/admin/login" element={ <Login isAdmin/> } />
          <Route path="/admin/dashboard" element={ <Dashboard/> } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
