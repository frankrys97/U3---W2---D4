import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./Components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./Components/Profile";
import Settings from "./Components/Settings";
import MyTvShows from "./Components/MyTvShows";
import MovieDetails from "./Components/MovieDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/tvshows" element={<MyTvShows />} />
          <Route path="/movie-details/:movieId" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
