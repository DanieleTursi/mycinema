import React,{ useContext, useEffect } from 'react';
import TmdbContext from "../../context/TmdbContext";
import SizeContext from "../../context/SizeContext";
import styled from "styled-components"
import HorizontalScroll from 'react-horizontal-scrolling'
import CardPeople from "./CardPeople"
import {  BiRightArrow, BiLeftArrow} from 'react-icons/bi';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const CardWrapperPeople = (props) => {
    const { detailsLoading } = useContext(TmdbContext);
    const { isSmall, cardItems, handleResize } = useContext(SizeContext);
    const style = { color: "black", margin: "5px",fontSize: "20px"}
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
        slidesToScroll: 2,
        swipeToSlide: true,
    };

    useEffect(() => {
        handleResize();
    }, [])

    if (!detailsLoading) {
        if (!isSmall) {
            return (
                <WrapPeople side={props.side} >

                    <Title side={props.side} type={props.type} actors={props.actors} >
                        {props.name}
                    </Title>
                    <Scrolling>
                    {props.people.length > 0 && <button onClick={() => sideScroll(contentWrapper.current, 25, 100, -10)}><BiLeftArrow style={style}/></button> }
                    <Container ref={contentWrapper}>
                        {props.people && props.people.map((person, idx) => (
                             <Box>
                            <CardPeople key={idx} bio={person.biograpy} bg={person.profile_path} id={person.id} type={props.type} name={person.name} character={person.character} />
                            </Box>
                        ))}
                    </Container>
                    { props.people.length > 0 && <button onClick={() => sideScroll(contentWrapper.current, 25, 100, 10)}><BiRightArrow style={style}/></button> }
                    </Scrolling>
                </WrapPeople>
            )
        } else {
            return (<SlickWrapper>
                <TitleWrapper>
                    <Title side={props.side} type={props.type} actors={props.actors} >
                        {props.name}
                    </Title>
                </TitleWrapper>

                <Slick {...settings}>

                    {props.people && props.people.map((person, idx) => (

                        <CardPeople key={idx} bio={person.biograpy} bg={person.profile_path} id={person.id} type={props.type} name={person.name} character={person.character} />

                    ))}

                </Slick>
            </SlickWrapper>
            )
        }
    }
    else {
        return <h1>Loading</h1>
    }
}

export default CardWrapperPeople


const WrapPeople = styled.div`
width:${props => (props.side === 'center' || props.side === 'other' ? '90%' : '45%')};
height:280px;
margin:80px 0;
display:flex ;
justify-content:center ;
align-items:center;
flex-direction:column ;

@media screen and (max-width: 768px){
    width:100%;
    
}
`;

const TitleWrapper = styled.div`
width:100%;
display:flex;
justify-content:center;
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
    content:"${(props) => props.side === 'right' || props.side === 'center' ? props.actors === 'ACTORS' ? 'CAST' : 'PEOPLE' : ''}";
  }

@media screen and (max-width: 768px){
    text-align:center ;
    width:85%;
    
    padding:0;
    margin:40px 0 0;
}
`;

const Scrolling= styled.div`
display:flex;
width: 95%;
align-items:center;

button{
    z-index:1;
    background:lightgray;
    border-radius:8px;
    margin: 0 -20px;
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

const SlickWrapper = styled.div`
display:flex;
width:100%;
flex-direction:column
`;
const Slick = styled(Slider)`
margin-top:50px;
height:350px;
overflow:hidden;
display:flex;
`;
