import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import TmdbContext from '../../context/TmdbContext';
import SizeContext from '../../context/SizeContext';
import useLocalStorage from '../../hooks/useLocalStorage';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';




const MovieTrailer = () => {
    const [showId] = useLocalStorage('id', '');
    const [screenType] = useLocalStorage('st', '');
    const { videosLoading, getVideos, videos } = useContext(TmdbContext)
    const { isSmall, trailersCount } = useContext(SizeContext);
    const [videoType, setVideoType] = useState('Trailer');
    const [active, setActive] = useState(false);
    const [count, setCount] = useState(0);


    useEffect(() => {


    }, [trailersCount])

    let settings = {
        dots: true,
        infinite: count > 3,
        speed: 500,
        slidesToShow: trailersCount,
        slidesToScroll: 1,
        autoplay: false,

    };

    const checkVideoCount = (type) => {
        const inCount = videos.filter((obj) => obj.type === type).length;

        setCount(inCount)

    }
    let types = [...new Set(videos.map((video) => video.type))];

    const buttonHandler = (type) => {
        setVideoType(type)
        setActive(!active);
        checkVideoCount(type);

    }

    useEffect(() => {
        getVideos(showId, screenType);

        checkVideoCount(videoType);
        checkIfTrailerAvailable();

    }, [])


    const checkIfTrailerAvailable = async () => {

        const available = await videos.filter((obj) => obj.type === 'Trailer').length;
        const newType = await videos.filter((obj) => obj.type != '');

        if (available === 0) {
            setVideoType(newType[0]?.type)
        }
    }




    if (!videosLoading) {
        if (videos.length > 0) return (
            <MainWrapper>
                <ButtonsWrapper>
                    {types.length > 0 && types.map((type, idx) => (

                        <Button type={type} videoType={videoType} onClick={() => { buttonHandler(type) }} key={idx}>{type}</Button>


                    ))}
                </ButtonsWrapper>
                <YoutubeWrapper>
                    <Carousel {...settings} id='Carousel'>


                        {videos.map((video, idx) => (
                            video.type === videoType &&
                            <Wrap key={idx}>
                                <YouFrame src={`https://www.youtube-nocookie.com/embed/${video.key}`} title="YouTube video player" frameBorder="0" allow="fullscreen"></YouFrame>

                            </Wrap>

                        ))}


                    </Carousel>






                </YoutubeWrapper>

            </MainWrapper>
        )
    } else {
        <h1>...Loading</h1>
    }
}

export default MovieTrailer


const MainWrapper = styled.div`

height:300px;
background-color:#000 ;
position:relative;
margin-bottom:50px;

@media screen and (max-width: 768px){

min-height:300px;
width:100%;
margin-bottom:100px ;
}
`;


const ButtonsWrapper = styled.div`
width:100%;
min-height:50px;
display:flex;
align-items:center;
justify-content:center;
background-color:#fff ;


@media screen and (max-width: 768px){
    flex-wrap:wrap;
}
`;
const Button = styled.button`
color:${props => props.type === props.videoType ? 'powderblue' : '#000'};
background-color:${props => props.type === props.videoType ? '#000' : '#fff'};
border:1px solid #000;
width:150px;
height:25px;
border-radius: 8px;
font-family: 'Kaushan Script', cursive;
margin:20px;
cursor:pointer;




&:hover{
  background:#222;
  color:powderblue;
}

@media screen and (max-width: 768px){
  min-width:80px;
  margin:5px;
&:active{
    background-color:#000 ;
    border:1px solid red;
    color:#fff;
}
`;
const Carousel = styled(Slider)`
margin-top:20px;
margin-bottom:40px;
width:100%;
padding:0 5%;
height:100%;
overflow:hidden;
.slick-slide > div {
  margin: 0 20px;
}
.slick-list {
  margin: 0 -20px;
}
& > button {
 
    height:100%;
    width: 0;
    
    z-index:1;
   
}
ul{
    
    left:0;
}
ul li button {
    &:before{
        font-size: 20px;
        color: rgb(150, 158, 171);
    }
}
li.slick-active button:before {
    color:#000;
}
.slick-list {
    overflow:initial;
}
.slick-prev {
    left: 5px;
}
.slick-next {
    right: 25px;
}

@media screen and (max-width: 1100px){
margin:0;
padding:0;
width:100vw;


    li.slick-active button:before {
    color:#fff;
}
}
`;

const Wrap = styled.div`
border-radius: 4px;
cursor: pointer;
position: relative;
margin:0 20px;
width:100%;

a{
    border-radius: 4px;
    box-shadow: rgb(0 0 0 /69%) 0px 26px 30px -10px, rgb(0 0 0  / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    display: block;
    position: relative;
    padding: 4px;
    img {
        width:100%;
        height:100%;
    }
    &:hover {
        padding: 0;
        border: 4px solid rgba(249, 249, 249, 0.8);
        transition-duration: 300ms;
    }
}
@media screen and (max-width: 1100px){

width:100vw;
margin:0;
}
`;
const YoutubeWrapper = styled.div`
display:flex;
margin:0 10px 20px;
justify-content:center ;
background:#fff ;
width:100%;
overflow-x:hidden;
min-height:300px;

@media screen and (max-width: 1100px){
width:100%;
margin:0;
text-align:center;
background-color:#000 ;
padding:10px 0 0;
}
`;

const YouFrame = styled.iframe`
width:500px;
height:250px;
margin:0 20px;



@media screen and (max-width: 1100px){
width:90%;
margin:0;

}
`;