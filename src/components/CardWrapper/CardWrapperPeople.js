import { useContext } from 'react';
import TmdbContext from "../../context/TmdbContext";
import SizeContext from "../../context/SizeContext";
import styled from "styled-components"
import HorizontalScroll from 'react-horizontal-scrolling'
import CardPeople from "./CardPeople"

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const CardWrapperPeople = (props) => {
    const { detailsLoading } = useContext(TmdbContext);
    const { isSmall } = useContext(SizeContext);
    console.log(isSmall);

    const settings = {
        className: "center",
        infinite: false,
        centerPadding: "60px",
        slidesToShow: 2,
        slidesToScroll: 1,
        swipeToSlide: true,

    };



    if (!detailsLoading) {
        if (!isSmall) {
            return (
                <WrapPeople side={props.side}>

                    <Title side={props.side} type={props.type} >
                        {props.name}
                    </Title>
                    <Container>
                        {props.people && props.people.map((person, idx) => (

                            <CardPeople key={idx} bio={person.biograpy} bg={person.profile_path} id={person.id} type={props.type} name={person.name} character={person.character} />
                        ))}
                    </Container>

                </WrapPeople>
            )
        } else {
            return (
                <Slick {...settings}>

                    {props.people && props.people.map((person, idx) => (

                        <CardPeople key={idx} bio={person.biograpy} bg={person.profile_path} id={person.id} type={props.type} name={person.name} character={person.character} />

                    ))}

                </Slick>)
        }
    }
    else {
        return <h1>Loading</h1>
    }
}

export default CardWrapperPeople


const WrapPeople = styled.div`
width:${props => (props.side === 'center' || props.side === 'other' ? '90%' : '45%')};
height:300px;
margin:80px 0;
display:flex ;
justify-content:center ;
align-items:center;
flex-direction:column ;

@media screen and (max-width: 768px){
    width:100%;
    
}
`;


const Title = styled.h3`
width:80%;
margin:0;
text-align:${props => (props.side === 'left' ? 'left' : 'right')};
padding:5px 90px;
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
    content:"${(props) => props.side === 'right' || props.side === 'center' ? ' PEOPLE' : ''}";
  }

@media screen and (max-width: 768px){
    text-align:center ;
}
`;

const Container = styled(HorizontalScroll)`
width: 90%;
margin-top:20px;
`;


const Slick = styled(Slider)`
margin-top:100px;
height:350px;

/* display:flex; */

`;
