import React, { useContext, useRef } from 'react';
import TmdbContext from "../../context/TmdbContext";
import SizeContext from "../../context/SizeContext";
import styled from "styled-components"
import HorizontalScroll from 'react-horizontal-scrolling'
import Card from "./Card"
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const CardWrapper = (props) => {
    const { loading } = useContext(TmdbContext);
    const { isSmall, cardItems } = useContext(SizeContext);
    const style = { color: "black", margin: "4px", fontSize: "20px" }
    const contentWrapper = React.useRef(null);


    const sideScroll = (
        element: HTMLDivElement,
        speed: number,
        distance: number,
        step: number
    ) => {
        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            element.scrollLeft += step;
            scrollAmount += Math.abs(step);
            if (scrollAmount >= distance) {
                clearInterval(slideTimer);
            }
        }, speed);
    };

    const settings = {
        className: "center",
        infinite: false,
        centerPadding: "60px",
        slidesToShow: cardItems,
        slidesToScroll: 1,
        swipeToSlide: true,
        arrows: false,

    };


    if (!loading) {
        if (!isSmall) {
            return (
                <Wrap side={props.side} id='cardWrapper'>
                    <Title side={props.side} type={props.type} >
                        {props.name}
                    </Title>
                    <Scrolling>
                        {props.movies.length > 0 && <button onClick={() => sideScroll(contentWrapper.current, 25, 100, -10)}><BiLeftArrow style={style} /></button>}
                        <Container ref={contentWrapper} >

                            {props.movies.map((movie, idx) => (
                                <Box key={idx}>
                                    <Card page={props.page} bg={movie.poster_path} id={movie.id} type={props.type} rating={movie.vote_average} character={movie.character} release={movie.release_date || movie.first_air_date} />
                                </Box>
                            ))}

                        </Container>
                        {props.movies.length > 0 && <button onClick={() => sideScroll(contentWrapper.current, 25, 100, 10)}><BiRightArrow style={style} /></button>}
                    </Scrolling>
                </Wrap>
            )
        }
        else {
            return (<>
                <Title side={props.side} type={props.type} >
                    {props.name}
                </Title>
                <Scrolling>
                    {props.movies.length > 5 && <button onClick={() => sideScroll(contentWrapper.current, 25, 100, -10)}><BiLeftArrow style={style} /></button>}
                    <Slick {...settings} ref={contentWrapper}>

                        {props.movies.map((movie, idx) => (
                            <Card page={props.page} key={idx} bg={movie.poster_path} id={movie.id} type={props.type} rating={movie.vote_average} character={movie.character} release={movie.release_date || movie.first_air_date} />
                        ))}

                    </Slick>
                    {props.movies.length > 5 && <button onClick={() => sideScroll(contentWrapper.current, 25, 100, 10)}><BiRightArrow style={style} /></button>}
                </Scrolling>
            </>)

        }
    }
    else {
        return <h1>Loading</h1>
    }
}

export default CardWrapper


const Wrap = styled.div`
width:${props => (props.side === 'center' || props.side === 'other' ? '90%' : '45%')};
height:300px;
margin:80px 0;
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
padding:5px 120px;
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
    width:180px;
    margin-bottom:20px;
}

`;

const Scrolling = styled.div`
display:flex;
width: 95%;
align-items:center;

button{
    background:transparent;
    border-radius:8px;
    margin: 0 10px;
}
`

const Container = styled.div`
  min-width:95%;
  margin-top:10px;
  overflow: auto;
  white-space: nowrap;
  text-align: center;
  line-height:0;       /* make bottom padding same as top padding by removing line-height */
  vertical-align:middle;
`;

const Box = styled.div`
    display: inline-block;
    padding: 0.5vh;
  `

const Slick = styled(Slider)`
width:100%;
height:350px;
overflow:hidden;
`;
