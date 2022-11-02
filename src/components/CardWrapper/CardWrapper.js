import styled from "styled-components"
import HorizontalScroll from 'react-horizontal-scrolling'
import Card from "./Card"

const CardWrapper = (props) => {



    return (
        <Wrap>

            <Title side={props.side} >
                {props.name}
            </Title>
            <Container>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </Container>

        </Wrap>
    )
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
padding:0 10%;
border-bottom:1px solid #000;
@media screen and (max-width: 768px){
    text-align:center ;
}
`;

const Container = styled(HorizontalScroll)`
width: 90%;
margin-top:20px;
`;



