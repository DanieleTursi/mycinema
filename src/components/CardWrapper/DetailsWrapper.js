import { useContext } from 'react';
import TmdbContext from "../../context/TmdbContext";
import styled from "styled-components"
import CardDetails from './CardDetails';

const DetailsWrapper = (props) => {
  const { loading } = useContext(TmdbContext);

  if (!loading) {
    return (
      <Container>
        <Title side={props.side} type={props.type} >
          {props.name}
        </Title>
        {props.movies.map((movie, idx) => (
          <CardDetails page={props.page} key={idx} bg={movie.poster_path} id={movie.id} type={props.type} rating={movie.vote_average} character={movie.character} release={movie.release_date || movie.first_air_date} title={movie.name || movie.title} />
        ))}
      </Container>
    )
  }
  else {
    return <h1>Loading</h1>
  }
}

export default DetailsWrapper

const Container = styled.div`
width:45%;
display:flex;
flex-direction:row;
flex-wrap:wrap;
justify-content:space-evenly;
margin:0 15px;
align-items:flex-start;
`;

const Title = styled.h3`
width:80%;
margin:0;
text-align:${props => (props.side === 'left' ? 'left' : 'right')};
padding:5px 10%;
border-bottom:1px solid #000;
font-family: 'PT Sans Narrow', sans-serif;

&:before {
    color: red;
    font-size:24px;
    content:"${(props) => props.side === 'left' || props.side === 'other' ? 'SHOWS ' : ''}";
  }

&:after {
    color: red;
    font-size:24px;
    content:"${(props) => props.side === 'right' || props.side === 'center' ? ' MOVIES' : ''}";
  }

@media screen and (max-width: 768px){
    text-align:center ;
}
`;
