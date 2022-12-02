import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import TmdbContext from '../../context/TmdbContext';
import useLocalStorage from '../../hooks/useLocalStorage';


const MovieTrailer = () => {
    const [showId] = useLocalStorage('id', '');
    const [screenType] = useLocalStorage('st', '');
    const { videosLoading, getVideos, videos } = useContext(TmdbContext)



    useEffect(() => {
        getVideos(showId, screenType)
    }, [])

    if (!videosLoading) {
        if (videos.length > 0) return (
            <MainWrapper>

                <YoutubeWrapper>

                    {videos.map((video) => (
                        video.type === 'Trailer' && video.site === 'YouTube' &&
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
width:100vw;
overflow:hidden;


`;

const YouFrame = styled.iframe`
width:100vw;
height:300px;
position:absolute ;

`;
