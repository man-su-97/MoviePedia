import { Container } from "@mui/system";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LabelBottomNavigation from "./components/Footer/MainNav";
import "./components/Header/Header";
import Header from "./components/Header/Header";
import Trending from "./Pages/Trending/Trending";
import Series from "./Pages/Series/Series";
import Movies from "./Pages/Movies/Movies";
import Search from "./Pages/Search/Search";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <Container>
          <Routes>
            <Route path="/" element={<Trending />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Container>
      </div>
      <LabelBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
