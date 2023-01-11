import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import DetailsWrapper from '../components/CardWrapper/DetailsWrapper';
import UserDetails from '../components/UserPageComponents/UserDetails';
import TmdbContext from '../context/TmdbContext';
import UserContext from '../context/User/UserContext';

const UserPage = () => {
  const { getPopular, getDetails } = useContext(TmdbContext);
  const { user, watchlist, favourites } = useContext(UserContext);
  const [moviesWl, setMoviesWl] = useState([]);
  const [showsWl, setShowsWl] = useState([]);
  const [moviesFl, setMoviesFl] = useState([]);
  const [showsFl, setShowsFl] = useState([]);
  const [buttonClicked, setButtonClicked] = useState('Watchlist')
  const [movieOrTv, setMovieOrTv] = useState('movie')

  // select movies or tv visible in watchlist
  const movieOrTvHandler = (input) => {
    setMovieOrTv(input)
  }
  // Updatse witch button was clicked
  const buttonClickHandler = (input) => {
    setButtonClicked(input);
  }
  // get favourites for movies and tv
  const favouritesMovieFunction = () => {
    const moviesFl = [];
    favourites.movies.forEach(movie => {
      getDetails(movie, 'movie').then((x) => { moviesFl.push(x[0]) });

    })

    return moviesFl
  }
  const favouritesTvFunction = () => {
    const showsFl = [];
    favourites.shows.forEach(show => {
      getDetails(show, 'tv').then((x) => showsFl.push(x[0]));

    })

    return showsFl
  }

  // get the watchlist for movies and tv
  const watchlistMovieFunction = () => {
    const moviesWl = [];
    watchlist.movies.forEach(movie => {
      getDetails(movie, 'movie').then((x) => { moviesWl.push(x[0]) });

    })

    return moviesWl
  }
  const watchlistTvFunction = () => {
    const showsWl = [];
    watchlist.shows.forEach(show => {
      getDetails(show, 'tv').then((x) => showsWl.push(x[0]));

    })

    return showsWl
  }

  useEffect(() => {
    getPopular()

    if (!user) {
      window.location.replace('/')
    }
    const mwl = watchlistMovieFunction();
    const swl = watchlistTvFunction();
    const mfl = favouritesMovieFunction();
    const sfl = favouritesTvFunction();
    setMoviesWl(mwl)
    setShowsWl(swl)
    setMoviesFl(mfl);
    setShowsFl(sfl);

  }, [user, watchlist, favourites])

  return (
    <UserPageContainer>
      <UserPageNavigation>

        <UserNavButton focused={buttonClicked === 'Watchlist' && true} onClick={() => { buttonClickHandler('Watchlist') }}>
          Watchlist
        </UserNavButton>
        <UserNavButton focused={buttonClicked === 'Lists' && true} onClick={() => { buttonClickHandler('Lists') }}>
          Lists
        </UserNavButton>
        <UserNavButton focused={buttonClicked === 'Favourites' && true} onClick={() => { buttonClickHandler('Favourites') }}>
          Favourites
        </UserNavButton>
        <UserNavButton focused={buttonClicked === 'Account' && true} onClick={() => { buttonClickHandler('Account') }}>
          Account Details
        </UserNavButton>
      </UserPageNavigation>

      <UserListsWrapper show={buttonClicked === 'Account' ? 'show' : 'noShow'}>
        <UserDetails user={user} />
      </UserListsWrapper>
      <UserListsWrapper show={buttonClicked === 'Watchlist' ? 'show' : 'noShow'}>
        <ListSelector show={movieOrTv}>
          <ListButton onClick={() => { movieOrTvHandler('movie') }}
            show={movieOrTv === 'movie' ? true : false}>
            MOVIES({moviesWl.length})</ListButton>
          <ListButton onClick={() => { movieOrTvHandler('tv') }}
            show={movieOrTv === 'tv' ? true : false}>
            TV({showsWl.length})</ListButton>
        </ListSelector>
        <WatchListWrapper show={movieOrTv === 'movie' ? true : false}>
          <DetailsWrapper movies={moviesWl} type='movie' page='detailsPage' where='watchlist' />
        </WatchListWrapper>
        <WatchListWrapper show={movieOrTv === 'tv' ? true : false}>
          <DetailsWrapper movies={showsWl} type='show' page='detailsPage' where='watchlist' />
        </WatchListWrapper>


      </UserListsWrapper>
      <UserListsWrapper show={buttonClicked === 'Lists' ? 'show' : 'noShow'}>
        Lists
      </UserListsWrapper>
      <UserListsWrapper show={buttonClicked === 'Favourites' ? 'show' : 'noShow'}>
        <ListSelector show={movieOrTv}>
          <ListButton onClick={() => { movieOrTvHandler('movie') }}
            show={movieOrTv === 'movie' ? true : false}>
            MOVIES({moviesFl.length})</ListButton>
          <ListButton onClick={() => { movieOrTvHandler('tv') }}
            show={movieOrTv === 'tv' ? true : false}>
            TV({showsFl.length})</ListButton>
        </ListSelector>
        <WatchListWrapper show={movieOrTv === 'movie' ? true : false}>
          <DetailsWrapper movies={moviesFl} type='movie' page='detailsPage' where='favourites' />
        </WatchListWrapper>
        <WatchListWrapper show={movieOrTv === 'tv' ? true : false}>
          <DetailsWrapper movies={showsFl} type='show' page='detailsPage' where='favourites' />
        </WatchListWrapper>


      </UserListsWrapper>
    </UserPageContainer>
  )
}

export default UserPage

const UserPageContainer = styled.div`
  display:flex;
  
  justify-content:center;
  align-items:flex-start;
`
const UserPageNavigation = styled.div`
width:150px;
height:400px;
margin:20px 0 20px 50px;
`;

const UserNavButton = styled.div`
display:flex;
justify-content:center ;
align-items: center;
height:50px;
border:1px solid #000;
background-color:${props => props.focused ? '#333' : '#000'} ;
color:#fff;
border-radius:7px;
margin:2px 0;
font-family: 'Gochi Hand', cursive;
text-shadow:${props => props.focused ? '2px 2px 2px red' : '2px 2px 2px gray'} ;
cursor:pointer;
&:hover{
  background-color:#333 ;
}
`;

const UserListsWrapper = styled.div`
height:100%;
width:80%;
display:${props => props.show != 'show' && 'none'};
`;

const ListSelector = styled.div`
width:100%;
height:30px;
margin-left:20px;
margin-top:20px;

`;
const ListButton = styled.button`
cursor:pointer;
  border:none;
  background-color:transparent ;
  color:${props => props.show && 'red'};
  
  font-size:14px;
  
`;
const WatchListWrapper = styled.div`
display:${props => !props.show && 'none'}
`;