import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import TmdbContext from '../../context/TmdbContext';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import noImage from '../../assets/images/noImage.png'
import UserContext from '../../context/User/UserContext';


const CardDetails = (props) => {
  const { getDetails } = useContext(TmdbContext);
  const [showId, setShowId] = useLocalStorage('id', '');
  const [screenType, setScreenType] = useLocalStorage('st', '');
  const [inWatchList, setInWatchList] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const { removeDataFromWatchlist, watchlist, } = useContext(UserContext);

  const navigate = useNavigate();
  const getId = async () => {

    await getDetails(showId, props.type);
    console.log(props.type)
    navigate('/detailspage/')
  }
  const mouseEnterHandler = () => {
    setShowMessage(true)
  }
  const mouseLeaveHandler = () => {
    setShowMessage(false)
  }
  const idHandler = async () => {
    await setShowId(props.id);
    await setScreenType(props.type === 'show' ? 'tv' : props.type)
    getId()
  }

  const checkIfInWatchlist = () => {
    if (watchlist !== undefined) {
      if (props.type === 'movie') {
        console.log(watchlist);
        if (watchlist.movies.includes(props.id)) {
          setInWatchList(true)
        }
      }
      else {
        if (watchlist.shows.includes(props.id)) {
          setInWatchList(true)
        }
      }
    }
  }
  useEffect(() => {
    checkIfInWatchlist()
  }, [])
  return (<>

    <Wrapper>
      <RemoveButton onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} onClick={() => { removeDataFromWatchlist(props.id, props.type) }} inWatchList={inWatchList}>X

      </RemoveButton>
      <WatchlistInfo showMessage={showMessage}>Remove from Watchlist</WatchlistInfo>
      <MainContainer onClick={idHandler} bg={props.bg} rating={props.rating} id='cardDetails'>

        <Container bg={props.bg} id={props.id} rating={props.rating} release={props.release} >
        </Container>
        <AllInfo bg={props.bg} id={props.id} rating={props.rating} release={props.release}>
          <Info bg={props.bg} id={props.id} rating={props.rating} release={props.release}>
            <Rating rating={props.rating}>
              <h1>{props.rating.toFixed(1)}</h1>
            </Rating>
            <h2>{props.release != null ? props.release.slice(0, 4) : ''}</h2>
          </Info>
          <h4>Title: <span>{props.title}</span></h4>
          {props.character != '' &&
            <h4>{props.character && 'As:'}   <span>{props.character}</span></h4>
          }
        </AllInfo>
      </MainContainer>
    </Wrapper>
  </>
  )
}

export default CardDetails
const Wrapper = styled.div`
position:relative ;
margin-top:10px;
width:320px;
height:145px;
`;


const MainContainer = styled.div.attrs(props => ({
  style: {
    display: (props.bg === null && props.rating === 0 ? 'none' : 'flex'),
    background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1)),url(https://www.themoviedb.org/t/p/original${props.bg})`,
  }
}))`

flex-direction:row;
align-items:center;
position:relative;

width:100%;
height:100%;
text-shadow:1px 1px 1px black;
border-radius:8px;
padding:2px;
color:white;
cursor:pointer;

h4{
  margin:5px 0;
  color:red
}

span{
  color:white;
}

&:hover{
  opacity:0.9;
}
`

const AllInfo = styled.div`
display:flex;
flex-direction:column;
justify-content:flex-start;
margin:0 5px;
`

const Info = styled.div.attrs(props => ({
  style: {
    display: (props.bg === null && props.rating === 0 ? 'none' : 'flex')
  }
}))`
   
    justify-content:flex-start;
    align-items:center;

    h2{
      margin-left:4px;
      text-align:center;
      font-size:18px;
    }

`



const Container = styled.div.attrs(props => ({
  style: {
    display: (props.bg === null && props.rating === 0 ? 'none' : 'flex'),
    backgroundImage: props.bg == null ? `url(${noImage})` : `url(https://www.themoviedb.org/t/p/original${props.bg})`
  }
}))`
  
  width: 100px;
  height: 140px;
  border-radius: 10px;
  margin-left: 10px;
  
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;

`

const Rating = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:${props => (props.rating >= 6 ? 'green' : 'red')};
    border-radius:50%;
    height:30px;
    width:30px;
    margin:4px;

    h1{
      color:white;
      text-align:center;
      font-size:12px;
    }  
    `;

const RemoveButton = styled.div`
position:absolute;
display:${props => props.inWatchList ? 'flex' : 'none'};
align-items:center;
justify-content:center;
right:10px;
top:20px;
width:20px;
height:20px;
border-radius:50% ;
border:1px solid #fff;
font-size: 13px;
z-index:50;
cursor:pointer;
color:#fff;
&:hover{
  color:#000;
  background-color:#fff ;
  border:1px solid #000;
}


`;

const WatchlistInfo = styled.span`
position:absolute;
display:${props => !props.showMessage && 'none'} ;
z-index:60 ;
top:45px;
right:-40px;
background-color:#fff ;
border:1px solid black;
border-radius: 7px;
font-weight:bold;
font-size:12px;
padding:3px;
`;