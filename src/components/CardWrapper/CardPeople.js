import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import TmdbContext from '../../context/TmdbContext';
import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
const CardPeople = (props) => {

  const { getDetails, details, detailsLoading } = useContext(TmdbContext);

  const [showId, setShowId] = useLocalStorage('id', '');
  const [screenType, setScreenType] = useLocalStorage('st', '');

  const navigate = useNavigate();
  const getId = () => {
    console.log(props.id)
    getDetails(showId, props.type);
    navigate('/detailspage/')
  }

  const idHandler = async () => {
    await setShowId(props.id);
    await setScreenType(props.type)
    getId()
  }

  return (
    <>
      <ContainerPeople onClick={idHandler} bg={props.bg} id={props.id} >
      </ContainerPeople>
      <Info>
        <h2>{props.name != null ? props.name.toUpperCase().slice(0,23) : 'N/N'}</h2>
      </Info>
    </>
  )
}

export default CardPeople


const ContainerPeople = styled.div`
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
      font-size:12px;
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