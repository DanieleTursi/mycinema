import React, { useContext } from 'react'
import styled from 'styled-components'
import TmdbContext from '../../context/TmdbContext';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import noImage from '../../assets/images/noImage.png'

const Card = (props) => {
  const { getDetails,getProvider } = useContext(TmdbContext);
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
    console.log(showId)
    getId()
  }

  return (
    <>
      <Container onClick={idHandler} bg={props.bg} id={props.id} rating={props.rating} release={props.release} >
      </Container>
      {props.page === 'detailsPage' && <Character>
        <span>as</span>
        <h6>{props.character ? props.character : 'N/N'}</h6>
      </Character>}
      <Info bg={props.bg} id={props.id} rating={props.rating} release={props.release}>
        <Rating rating={props.rating}>
          <h1>{props.rating}</h1>
        </Rating>
        <h2>{props.release != null ? props.release.slice(0, 4) : ''}</h2>
      </Info>
    </>
  )
}

export default Card

const Container = styled.div`
  display:${props => (props.bg === null && props.rating === 0 ? 'none' : 'flex')};
  width: 180px;
  height: 250px;
  border-radius: 10px;
  margin-left: 10px;
  background-image:${props => props.bg == null ? `url(${noImage})` : `url(https://www.themoviedb.org/t/p/original${props.bg})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;

  &:hover{
    opacity:0.8;
  }
  
  @media (max-width: 768px){
  width:160px;
}
`

const Info = styled.div`
    display:${props => (props.bg === null && props.rating === 0 ? 'none' : 'flex')};
    justify-content:center;
    align-items:center;

    h2{
      margin-left:4px;
      text-align:center;
      font-size:18px;
    }
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

const Character = styled.div`
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
    h6{
      margin:0;
    }
    span{
      font-size:8px ;
    }
    `;