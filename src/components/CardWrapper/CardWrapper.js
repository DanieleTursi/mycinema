import { useContext, useEffect, useState } from 'react';
import TmdbContext from "../../context/TmdbContext";
import styled from "styled-components"
import HorizontalScroll from 'react-horizontal-scrolling'
import Card from "./Card"

const CardWrapper = (props) => {
    const { loading } = useContext(TmdbContext);


    if (!loading) {
         
        return (
            <Wrap>

                <Title side={props.side} >
                    {props.name}
                </Title>
                <Container>
                    {props.movies.map((movie, idx) => (

                        <Card key={idx} bg={movie.poster_path} id={movie.id} type={props.type} />
                    ))}
                </Container>

            </Wrap>
        )
    }
    else {
        return <h1>Loading</h1>
    }
}

export default CardWrapper


const Wrap = styled.div`
width:45%;
height:300px;
margin:50px 0;
display:flex ;
justify-content:center ;
align-items:center;
flex-direction:column ;

@media screen and (max-width: 768px){
    width:100%;
    margin:20px 0;
}
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
    content:"${(props) => props.side === 'left' ?'SHOWS ' :''}";
  }

&:after {
    color: red;
    font-size:24px;
    content:"${(props) => props.side === 'right' ?' MOVIES ' :''}";
  }

@media screen and (max-width: 768px){
    text-align:center ;
}
`;

const Container = styled(HorizontalScroll)`
width: 90%;
margin-top:20px;
`;



