import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import './App.css';
import { TmdbProvider } from './context/TmdbContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import DetailsPage from './pages/DetailsPage';
import SearchBox from './components/SearchBox/SearchBox';
import SearchResultPage from './components/SearchResultPage/SearchResultPage';


function App() {
  return (
    <TmdbProvider>
      <div className="App">
        <Router>
          <Navbar />


          <SearchBox />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/detailspage/" element={<DetailsPage />} />
            <Route path="/searchresult/" element={<SearchResultPage />} />
          </Routes>
        </Router>
        <Footer />
      </div>
    </TmdbProvider>
  );
}

export default App;
