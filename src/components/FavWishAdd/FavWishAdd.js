import React, { useState, useContext, useEffect } from 'react'
import { AiOutlineHeart, AiOutlineUnorderedList, AiOutlineEye } from 'react-icons/ai';
import styled from "styled-components"
import useLocalStorage from '../../hooks/useLocalStorage';
import UserContext from '../../context/User/UserContext';


const FavWishAdd = () => {
  const style = { fontSize: "20px", color: "white" };
  const styledP = { color: "white", fontSize: "12px", };
  const [favClicked, setFavClicked] = useState(false);
  const [addClicked, setAddClicked] = useState(false);
  const [watClicked, setWatClicked] = useState(false);

  const { updateWatchlist, updateFavourites, favourites, removeDataFromWatchlist, removeDataFromFavourites, watchlist, user } = useContext(UserContext);
  const [movieId] = useLocalStorage('id', '');
  const [showOrMovie] = useLocalStorage('st', '');

  const checkIfInWatchlist = () => {
    if (watchlist !== undefined) {
      if (showOrMovie === 'movie') {

        if (watchlist.movies.includes(movieId)) {
          setWatClicked(true)
        }
      }
      else {
        if (watchlist.shows.includes(movieId)) {
          setWatClicked(true)
        }
      }
    }
  }
  const checkIfInFavourites = () => {
    if (favourites !== undefined) {
      if (showOrMovie === 'movie') {

        if (favourites.movies.includes(movieId)) {
          setFavClicked(true)
        }
      }
      else {
        if (favourites.shows.includes(movieId)) {
          setFavClicked(true)
        }
      }
    }
  }
  useEffect(() => {
    checkIfInWatchlist();
    checkIfInFavourites();
  }, [watchlist, favourites])

  const handleFav = () => {
    if (favClicked) {
      setFavClicked(false);
      removeDataFromFavourites(movieId, showOrMovie)
    }
    else {
      setFavClicked(true);
      updateFavourites(movieId, showOrMovie)
    }


  };

  const handleAdd = () => {
    addClicked === true
      ? setAddClicked(false)
      : setAddClicked(true);
  };

  const handleWat = () => {
    if (watClicked === true) {
      setWatClicked(false);
      removeDataFromWatchlist(movieId, showOrMovie)
    }
    else {
      setWatClicked(true);
      updateWatchlist(movieId, showOrMovie)
    }

  };
  if (user) {
    return (
      <MainBar>
        <ButtonContainer>
          <FavButton favClicked={favClicked} onClick={handleFav} ><AiOutlineHeart style={style} /></FavButton>
          <p style={styledP}>to favourite</p>
        </ButtonContainer>
        <ButtonContainer>
          <AddButton addClicked={addClicked} onClick={handleAdd} ><AiOutlineUnorderedList style={style} /></AddButton>
          <p style={styledP}>to a list</p>
        </ButtonContainer>
        <ButtonContainer>
          <WatButton watClicked={watClicked} onClick={handleWat}><AiOutlineEye style={style} /></WatButton>
          <p style={styledP}>to watchlist</p>
        </ButtonContainer>
      </MainBar>
    )
  }

}

export default FavWishAdd

const MainBar = styled.div`
  width:300px;
  display:flex;
  justify-content:center;
  align-items:center;
  p{
  font-size:12px;
  color:white;
}
  @media screen and (max-width: 768px){
    width:200px;
  }
`


const FavButton = styled.button`
width: 40px;
height: 40px;
border-radius: 50%;
background:${props => (props.favClicked === true ? 'red' : 'black')};
margin: 0 10px;
border: 1px solid #fff;
color: black;
cursor: pointer;
`

const AddButton = styled.button`
width: 40px;
height: 40px;
border-radius: 50%;
background:${props => (props.addClicked === true ? 'green' : 'black')};
margin: 0 10px;
border: 1px solid #fff;
color: black;
cursor: pointer;
`

const WatButton = styled.button`
width: 40px;
height: 40px;
border-radius: 50%;
background:${props => (props.watClicked === true ? 'green' : 'black')};
margin: 0 10px;
border: 1px solid #fff;
color: black;
cursor: pointer;
`

const ButtonContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

p{
  font-size: 12px;
  color: white;
}

`
