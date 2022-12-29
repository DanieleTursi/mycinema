import React, { useContext, useEffect } from 'react'
import styled from 'styled-components';
import DetailsWrapper from '../components/CardWrapper/DetailsWrapper';
import TmdbContext from '../context/TmdbContext';
import UserContext from '../context/User/UserContext';


const UserPage = ({ name, surname, email }) => {
  const { searchMovies, movies, searchPeople, searchLoading, getPopular } = useContext(TmdbContext);
  const { user, updWatchlist, watchlist } = useContext(UserContext);


  useEffect(() => {
    getPopular()
    console.log(user);
    if (!user) {
      window.location.replace('/')
    }
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

      <button onClick={updWatchlist}>Test</button>
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

