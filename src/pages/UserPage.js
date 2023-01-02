import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import DetailsWrapper from '../components/CardWrapper/DetailsWrapper';
import TmdbContext from '../context/TmdbContext';
import UserContext from '../context/User/UserContext';


const UserPage = ({ name, surname, email }) => {
  const { searchMovies, movies, searchPeople, searchLoading, getPopular, getDetails } = useContext(TmdbContext);
  const { user, updWatchlist, watchlist } = useContext(UserContext);
  const [moviesWl, setMoviesWl] = useState([]);
  const [showsWl, setShowsWl] = useState([]);
  const watchlistMovieFunction = () => {
    const moviesWl = [];
    watchlist.movies.forEach(movie => {
      getDetails(movie, 'movie').then((x) => moviesWl.push(x));
    })
    return moviesWl
  }
  const watchlistTvFunction = () => {
    const showsWl = [];
    watchlist.shows.forEach(show => {
      getDetails(show, 'tv').then((x) => showsWl.push(x));
      console.log(show);
    })
    console.log(showsWl);
    return showsWl
  }

  useEffect(() => {
    getPopular()
    console.log(user);
    if (!user) {
      window.location.replace('/')
    }
    const mwl = watchlistMovieFunction();
    const swl = watchlistTvFunction();
    setMoviesWl(mwl)
    setShowsWl(swl)
    console.log(mwl, swl);
    console.log(movies);
  }, [user])

  return (
    <UserPageContainer>
      <Details>
        <h4>User Details:</h4>
        <h3>Name: <span>{user?.name || user?.displayName}</span></h3>
        <h3>Surname: <span></span></h3>
        <h3>Email: <span>{user?.email}</span></h3>
        <div>
          {user && watchlist.movies.map((movie, idx) => (
            <span key={idx}>{movie}</span>
          ))}
        </div>
        <div>
          {user && watchlist.shows.map((movie, idx) => (
            <span key={idx}>{movie}</span>
          ))}
        </div>
      </Details>

      {/* <button onClick={updWatchlist}>Test</button> */}
      {moviesWl.map((movie, idx) => (
        <h1 key={idx}>{movie[0].title}</h1>
      ))}
      {showsWl.map((movie, idx) => (
        <h1 key={idx}>{movie[0].name}</h1>
      ))}
      <DetailsWrapper side='right' name='Wishlist || ' movies={movies} type='movie' page='detailsPage' />


    </UserPageContainer>
  )
}

export default UserPage

const UserPageContainer = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`

const Details = styled.div`
  width:500px;
  display:flex;
  flex-direction:column;
  margin: 10px 100px;

  h4{
    text-align:center;
    font-size:22px;
    border-bottom: 1px solid black;
    font-family: 'Kaushan Script', cursive;
  }

  h3{
    margin:5px 20px;
    color:red;
    font-size:18px;
    font-family: 'PT Sans Narrow', sans-serif;
  }

  span{
    color:black;
  }

  
  
`

