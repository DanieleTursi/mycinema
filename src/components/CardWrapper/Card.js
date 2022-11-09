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
    <Container onClick={idHandler} bg={props.bg} id={props.id} ></Container>

  )
}

export default Card


const Container = styled.div`

  width: 200px;
  height: 280px;
  border-radius: 10px;
  margin-left: 10px;
  background-image:url(https://www.themoviedb.org/t/p/original${props => props.bg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;

`;