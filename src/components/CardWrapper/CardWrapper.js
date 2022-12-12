import { useContext } from 'react';
import TmdbContext from "../../context/TmdbContext";
import SizeContext from "../../context/SizeContext";
import styled from "styled-components"
import HorizontalScroll from 'react-horizontal-scrolling'
import Card from "./Card"
import {  BiRightArrow, BiLeftArrow} from 'react-icons/bi';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const CardWrapper = (props) => {
    const { loading } = useContext(TmdbContext);
    const { isSmall, cardItems } = useContext(SizeContext);
    const style = { color: "black", margin: "5px",fontSize: "30px"}


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
                    {props.movies.length > 5 && <BiLeftArrow style={style}/>}
                    <Container >
                        {props.movies.map((movie, idx) => (
                            <Card page={props.page} key={idx} bg={movie.poster_path} id={movie.id} type={props.type} rating={movie.vote_average} character={movie.character} release={movie.release_date || movie.first_air_date} />
                        ))} 
                    </Container>
                   { props.movies.length > 5 && <BiRightArrow style={style}/>}
                    </Scrolling>
                </Wrap>
            )
        }
        else {
            return (<>
                <Title side={props.side} type={props.type} >
                    {props.name}
                </Title>

                <Slick {...settings}>

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
padding:5px 80px;
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

const Scrolling= styled.div`
display:flex;
width: 95%;
align-items:center;
`

const Container = styled(HorizontalScroll)`
width: 90%;
margin-top:20px;
`;



const Slick = styled(Slider)`
width:100%;
height:350px;
overflow:hidden;




`;
