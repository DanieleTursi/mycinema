import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import TmdbContext from '../../context/TmdbContext';
import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
const Card = (props) => {

  const { getDetails, details, detailsLoading } = useContext(TmdbContext);

  const [showId, setShowId] = useLocalStorage('id', '');
  const [screenType, setScreenType] = useLocalStorage('st', '');

  const navigate = useNavigate();
  const getId = () => {
    console.log(props.id)

    getDetails(showId, props.type);

    if (props.type === 'tv') {
      navigate('/showdetails');
    } else {
      navigate('/moviedetails/')
    }

  }

  const idHandler = async () => {
    await setShowId(props.id);
    await setScreenType(props.type)
    getId()
  }

  return (
    <>
      <Container onClick={idHandler} bg={props.bg} id={props.id} >
     
      </Container>
      <Info>
      <Rating>
        <h1 rating={props.rating}>{props.rating}</h1>
      </Rating>
        <h2>{props.release.slice(0,4)}</h2>
      </Info>
     
    </>
  )
}

export default Card


const Container = styled.div`
  display:flex;
  width: 200px;
  height: 280px;
  border-radius: 10px;
  margin-left: 10px;
  background-image:url(https://www.themoviedb.org/t/p/original${props => props.bg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;

  &:hover{
    opacity:0.8;
  }

`

const Info = styled.div`
    display:flex;
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