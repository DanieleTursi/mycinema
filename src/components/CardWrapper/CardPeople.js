import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import TmdbContext from '../../context/TmdbContext';
import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import noImage from '../../assets/images/noImage.png'
const CardPeople = (props) => {
  const { getActorDetails, details, detailsLoading } = useContext(TmdbContext);
  const [actorId, setActorId] = useLocalStorage('actorId', '');
  const navigate = useNavigate();

  const getId = async () => {
    await getActorDetails(actorId);
  }

  const idHandler = async () => {
    await setActorId(props.id);
    await getId()
    navigate('/actordetails/')
  }



  return (
    <>
      <ContainerPeople onClick={idHandler} bg={props.bg} id={props.id} >
      </ContainerPeople>
      <Info>
        <h2>{props.name != null ? props.name.toUpperCase().slice(0, 23) : 'N/N'}</h2>
        {props.character &&
          <>
            <span>as</span>
            <Name>{props.character}</Name>
          </>
        }
      </Info>
    </>
  )


}

export default CardPeople

const ContainerPeople = styled.div`
  display:flex;
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
  width:180px;
}
`

const Info = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;

    h2{
      margin:10px 0 0 4px;
      text-align:center;
      font-size:14px;
    }
    
    span{
      font-size:8px ;
      margin-top:10px;
    }
`

const Name= styled.h6`
margin-top:10px;
`

