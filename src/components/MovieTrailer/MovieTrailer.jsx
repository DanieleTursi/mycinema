import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import TmdbContext from '../../context/TmdbContext';
import useLocalStorage from '../../hooks/useLocalStorage';


const MovieTrailer = () => {
    const [showId] = useLocalStorage('id', '');
    const [screenType] = useLocalStorage('st', '');
    const { videosLoading, getVideos, videos } = useContext(TmdbContext)
    const [videoType, setVideoType] = useState('Trailer');
    const [active, setActive] = useState(false);


    let types = [...new Set(videos.map((video) => video.type))];

    const buttonHandler = (type) => {
        setVideoType(type)
        setActive(!active);

    }

    useEffect(() => {
        getVideos(showId, screenType);




    }, [])







    if (!videosLoading) {
        if (videos.length > 0) return (
            <MainWrapper>
                <ButtonsWrapper>
                    {types.length > 0 && types.map((type, idx) => (

                        <Button type={type} videoType={videoType} onClick={() => { buttonHandler(type) }} key={idx}>{type}</Button>


                    ))}
                </ButtonsWrapper>
                <YoutubeWrapper>

                    {videos.map((video) => (
                        video.type === videoType &&
                        <YouFrame key={video.id} src={`https://www.youtube-nocookie.com/embed/${video.key}`} title="YouTube video player" frameBorder="0" allow="fullscreen"></YouFrame>

                    ))}

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
`;
const YoutubeWrapper = styled.div`
display:flex;

justify-content:center ;
background:#fff ;
width:100%;
overflow:hidden;


`;

const YouFrame = styled.iframe`
width:450px;
height:300px;
margin:0 20px;
/* position:absolute ; */

`;

const ButtonsWrapper = styled.div`
width:100%;
height:50px;
display:flex;
align-items:center;
justify-content:center;
background-color:#fff ;

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
  width:80px;
&:active{
    background-color:#000 ;
    border:1px solid red;
    color:#fff;
}
`;