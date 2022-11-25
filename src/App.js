import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import './App.css';
import { TmdbProvider } from './context/TmdbContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ShowDetails from './pages/ShowDetails';
import MovieDetails from './pages/MovieDetails';
import SearchBox from './components/SearchBox/SearchBox';
import SearchResultPage from './components/SearchResultPage/SearchResultPage';


function App() {
  return (
    <TmdbProvider>
      <div className="App">
        <Navbar />

        <Router>
          <SearchBox />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/showdetails" element={<ShowDetails />} />
            <Route path="/moviedetails/" element={<MovieDetails />} />
            <Route path="/searchresult/" element={<SearchResultPage />} />
          </Routes>
        </Router>
        <Footer />
      </div>
    </TmdbProvider>
  );
}

export default App;
