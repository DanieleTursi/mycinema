
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import './App.css';
import { TmdbProvider } from './context/TmdbContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import DetailsPage from './pages/DetailsPage';
import ActorDetails from './pages/ActorDetails';
import SearchResultPage from './components/SearchResultPage/SearchResultPage';
import SearchBoxContainer from './components/SearchBox/SearchBoxContainer';
import { SizeProvider } from './context/SizeContext';
import LoginPage from './pages/LoginPage';
import UserProvider from './context/User/UserContext';

function App() {


  return (
    <UserProvider>
      <SizeProvider>
        <TmdbProvider>
          <div className="App">
            <Router>
              <Navbar />
              <SearchBoxContainer />

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/detailspage/" element={<DetailsPage />} />
                <Route path="/actordetails/" element={<ActorDetails />} />
                <Route path="/searchresult/" element={<SearchResultPage />} />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </Router>
            <Footer />
          </div>
        </TmdbProvider>
      </SizeProvider>
    </UserProvider>
  );
}

export default App;

