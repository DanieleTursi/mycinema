import React, { useContext,useState } from 'react';
import TmdbContext from "../../context/TmdbContext";
import SizeContext from "../../context/SizeContext";
import styled from "styled-components";
import Card from "./Card";
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const CardWrapper = (props) => {
    const { loading } = useContext(TmdbContext);
    const { isSmall, cardItems } = useContext(SizeContext);
    const [isHovering,setIsHovering]= useState(false)
    const style = { color: "white", margin: "4px", fontSize: "20px" }
    const contentWrapper = React.useRef(null);

    const handleMouseOver = () => {
      setIsHovering(true);
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };


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
                    <Scrolling onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                        { isHovering == true && contentWrapper.current.clientWidth < contentWrapper.current.scrollWidth && <button onClick={() => sideScroll(contentWrapper.current, 1, 1, -300)}><BiLeftArrow style={style} /></button>}
                        <Container ref={contentWrapper}>

                            {props.movies.map((movie, idx) => (
                                <Box key={idx}>
                                    <Card page={props.page} bg={movie.poster_path} id={movie.id} type={props.type} rating={movie.vote_average} character={movie.character} release={movie.release_date || movie.first_air_date} />
                                </Box>
                            ))}

                        </Container>
                        { isHovering == true && contentWrapper.current.clientWidth < contentWrapper.current.scrollWidth && <button onClick={() => sideScroll(contentWrapper.current, 1, 1, 300)}><BiRightArrow style={style} /></button>}
                    </Scrolling >
                </Wrap >
            )
        }
        else {
            return (<>
                <Title side={props.side} type={props.type} >
                    {props.name}
                </Title>

                <Slick {...settings} ref={contentWrapper}>

                    {props.movies.map((movie, idx) => (
                        <Card page={props.page} key={idx} bg={movie.poster_path} id={movie.id} type={props.type} rating={movie.vote_average} character={movie.character} release={movie.release_date || movie.first_air_date} />
                    ))}

                </Slick>

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
margin:80px 30px;
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
padding:5px 100px ;
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
    z-index:1;
    border:none;
    width:40px;
    height:40px;
    background:rgba(0, 0, 0 , 0.8);
    border-radius:50%;
    margin: 0 -20px;
    cursor:pointer;
}
`

const Container = styled.div`
  min-width:95%;
  padding-top:10px;
  overflow: auto;
  white-space: nowrap;
  text-align: center;
  line-height:1;       /* make bottom padding same as top padding by removing line-height */
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