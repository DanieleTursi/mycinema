import { useContext,useState} from 'react';
import TmdbContext from "../../context/TmdbContext";
import styled from "styled-components"
import CardDetails from './CardDetails';

const DetailsWrapper = (props) => {
  const { loading } = useContext(TmdbContext);
  const [show,setShow]=useState(15)
  const [ text,setText]=useState('SHOW ALL')


  if (!loading) {
    return (
    <MainContainer>
      <Container>
        <Title side={props.side} type={props.type} >
          {props.name} 
        </Title>
        {props.movies.slice(0, show).map((movie, idx) => (
          <CardDetails page={props.page} key={idx} bg={movie.poster_path} id={movie.id} type={props.type} rating={movie.vote_average} character={movie.character} release={movie.release_date || movie.first_air_date} title={movie.name || movie.title} />
        ))}
      </Container>
      {props.movies.length >15 &&
        <Button onClick={()=>{
        if(show===15){setShow(props.length); setText('SHOW LESS')}
        else {setShow(15); setText('SHOW ALL')}} }>{text}</Button>}
     </MainContainer>
    )
  }
  else {
    return <h1>Loading</h1>
  }
}

export default DetailsWrapper

const MainContainer= styled.div`
  width:95%;
  display:flex;
  flex-direction:column;
`

const Container = styled.div`
width:95%;
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

const Button=styled.button`
color:black;
background:white;
border:1px solid black;
width:150px;
height:25px;
border-radius: 8px;
font-family: 'Kaushan Script', cursive;
margin:50px;
cursor:pointer;
align-self:center;

&:hover{
  background:lightgray;
}

@media screen and (max-width: 768px){
  width:80px;
`
