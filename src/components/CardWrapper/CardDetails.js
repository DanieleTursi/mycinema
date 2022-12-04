import React, { useContext } from 'react'
import styled from 'styled-components'
import TmdbContext from '../../context/TmdbContext';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import noImage from '../../assets/images/noImage.png'

const CardDetails = (props) => {
  const { getDetails } = useContext(TmdbContext);
  const [showId, setShowId] = useLocalStorage('id', '');
  const [screenType, setScreenType] = useLocalStorage('st', '');
  const navigate = useNavigate();
  const getId = async () => {

    await getDetails(showId, props.type);
    navigate('/detailspage/')
  }

  const idHandler = async () => {
    await setShowId(props.id);
    await setScreenType(props.type)
    getId()
  }
  return (
    <>
      <MainContainer onClick={idHandler} bg={props.bg} rating={props.rating}>
        <Container bg={props.bg} id={props.id} rating={props.rating} release={props.release}>
        </Container>

        <AllInfo bg={props.bg} id={props.id} rating={props.rating} release={props.release}>
          <Info bg={props.bg} id={props.id} rating={props.rating} release={props.release}>
            <Rating rating={props.rating}>
              <h1>{props.rating.toFixed(1)}</h1>
            </Rating>
            <h2>{props.release != null ? props.release.slice(0, 4) : ''}</h2>
          </Info>
          {props.title | props.original_name != '' &&
            <h4>Title: {props.title || props.original_name}</h4>
          }
          {props.character != '' &&
            <h4>As: {props.character}</h4>
          }
        </AllInfo>
      </MainContainer>
    </>
  )
}

export default CardDetails

const MainContainer = styled.div`
display:${props => (props.bg === null && props.rating === 0 ? 'none' : 'flex')};
flex-direction:row;
align-items:center;
background:linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1)),url(https://www.themoviedb.org/t/p/original${props => props.bg});
margin-top:10px;
width:280px;
height:145px;
text-shadow:1px 1px 1px black;
border-radius:8px;
padding:2px;
color:white;
cursor:pointer;

h4{
  margin:0;,
}

&:hover{
  opacity:0.8;
}
`

const AllInfo = styled.div`
display:flex;
flex-direction:column;
justify-content:flex-start;
margin:0 5px;
`

const Info = styled.div`
    display:${props => (props.bg === null && props.rating === 0 ? 'none' : 'flex')};
    justify-content:flex-start;
    align-items:center;

    h2{
      margin-left:4px;
      text-align:center;
      font-size:18px;
    }

`

const Container = styled.div`
  display:${props => (props.bg === null && props.rating === 0 ? 'none' : 'flex')};
  width: 100px;
  height: 140px;
  border-radius: 10px;
  margin-left: 10px;
  background-image:${props => props.bg == null ? `url(${noImage})` : `url(https://www.themoviedb.org/t/p/original${props.bg})`};
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

