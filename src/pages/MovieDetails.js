import React, { useContext, useEffect } from 'react';
import TmdbContext from '../context/TmdbContext';
import useLocalStorage from '../hooks/useLocalStorage';
import styled from 'styled-components';

const MovieDetails = () => {
    const { details, detailsLoading, getDetails } = useContext(TmdbContext);
    const [showId, setShowId] = useLocalStorage('id', '');
    const [screenType, setScreenType] = useLocalStorage('st', '');
    console.log(details.backdrop_path);
    useEffect(() => {
        getDetails(showId, screenType)

    }, [])
    if (!detailsLoading) {
        return (
            // <div>{details.title}</div>
            <Wrapper>
                <HeaderDetails >
                    <BackgroundImage bg={details.backdrop_path} />
                    <DetailsWrapper>
                        <Poster bg={details.poster_path} />
                        <Details>
                            <UserScore>
                                <h3>70</h3>
                                <span>%</span>
                            </UserScore>
                            <Title>{details.title}</Title>
                            <RelaseYear>({details.release_date.slice(0, 4)})</RelaseYear>
                        </Details>
                    </DetailsWrapper>

                </HeaderDetails>
            </Wrapper>
        )
    }
    else {
        <h1>...Loading</h1>
    }
}

export default MovieDetails


const Wrapper = styled.div`
width:100%;
display:flex;
flex-direction:column ;

`;

const HeaderDetails = styled.div`
width:100%;
height:600px;
margin:20px 0;
position:relative;

align-items:center;
justify-content:center;

`;

const BackgroundImage = styled.div`
width:100%;
height:100%;
background:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(https://www.themoviedb.org/t/p/original${props => props.bg});
background-size:cover ;
filter:blur(3px);
position:absolute;
z-index:-1;
`;
const DetailsWrapper = styled.div`
width:100%;
height:100%;
display:flex;
align-items:center;
justify-content:center;
`;
const Poster = styled.div`
width:300px;
height:80%;
border:1px solid white;
border-radius:7px;

background:url(https://www.themoviedb.org/t/p/original${props => props.bg});
background-size:cover ;
`;
const Details = styled.div`
width:60%;
height:80%;
border:1px solid white;
margin-left:50px;

`;
const Title = styled.span`
color:#fff;
font-size:40px;
font-weight:bold;
`;
const RelaseYear = styled.span`
color:#999;
font-size:20px;

`;
const UserScore = styled.div`
height:70px;
width:70px;
border:3px solid red;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center ;
h3{
    color:#fff;
    font-size:25px;
}
span{
    color:#fff;
    font-size:10px;
    margin:0;
    padding:0;
}
`;