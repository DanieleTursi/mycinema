import React, { useContext, useEffect, useState } from 'react';
import TmdbContext from '../context/TmdbContext';
import useLocalStorage from '../hooks/useLocalStorage';
import styled from 'styled-components';
import CardWrapperPeople from '../components/CardWrapper/CardWrapperPeople';
import MovieTrailer from '../components/MovieTrailer/MovieTrailer';
import SizeContext from '../context/SizeContext';
import ReactShowMoreText from 'react-show-more-text';
import FavWishAdd from '../components/FavWishAdd/FavWishAdd';



const DetailsPage = () => {
    const { details, detailsLoading, providerLoading, getDetails, getProvider, rDate, credits, cast, movieProvider, tvProvider } = useContext(TmdbContext);
    const { handleResize, isSmall } = useContext(SizeContext);
    const [showId] = useLocalStorage('id', '');
    const [screenType] = useLocalStorage('st', '');
   

    const startEffect = async () => {
        await getDetails(showId, screenType);
        await getProvider(showId);
        console.log(movieProvider,tvProvider)
        handleResize();
    }
  
    useEffect(() => {
        startEffect()
    }, [])

    if (!detailsLoading && !providerLoading) {
        return (
            <Wrapper>
                <HeaderDetails>
                    <BackgroundImage bg={details.backdrop_path} />
                    <DetailsWrapper>
                        <Poster bg={details.poster_path} />
                        <Details>
                            <UserScoreContainer>
                                <UserScore rating={details.vote_average}>
                                    <h3>{details.vote_average && details.vote_average.toFixed(1)}</h3>
                                </UserScore>
                                <h4>{details.vote_count} votes</h4>
                                <FavWishAdd/>
                            </UserScoreContainer>
                            <Title>{details.title || details.name}</Title>
                            <RelaseYear>({rDate})</RelaseYear>
                            <h3>Overview:</h3>
                            <ReactShowMoreText lines={3}>
                            <h4>{details.overview}</h4>
                            </ReactShowMoreText>
                            <DirectorWrapper>
                                {credits != null ? <div>
                                    <h3>Director</h3>
                                    <h4>{credits}</h4>
                                </div> : <></>}
                            </DirectorWrapper>
                            <p>Genre: <span>  {details.genres === undefined || details.genres.length === 0 ? 'No Data' : details.genres[0].name} </span></p>
                            {details.number_of_seasons > 0
                                ? <><p>Seasons: <span>{details.number_of_seasons}</span></p>
                                    <p>Episodes: <span>{details.number_of_episodes}</span></p></>
                                : <></>}
                            
                            {/* { movieProvider.US.buy.length > 0
                               ? <Providers  >
                          <p>Watch:</p>
                            {movieProvider.US.buy.map((provider, idx) => (
                                <ProviderBox bg={provider.logo_path} idx={idx}>
                                </ProviderBox>
                            ))}
                            </Providers>
                            :<></>
                            } */}
                           
                        </Details>
                    </DetailsWrapper>
                </HeaderDetails>
                <MovieTrailer />
                <CardHolder>
                    <CardWrapperPeople side='center' actors='ACTORS' people={cast} type='person' />
                </CardHolder>
            </Wrapper>
        )
    }
    else {
        <h1>...Loading</h1>
    }
}

export default DetailsPage

const Wrapper = styled.div`
max-width:100%;
min-height:600px;
display:flex;
flex-direction:column ;
font-family: 'PT Sans Narrow', sans-serif;
`;

const HeaderDetails = styled.div`
width:100%;
min-height:700px;
margin:20px 0;
position:relative;
display:flex;
align-items:center;
justify-content:center;

@media screen and (max-width: 768px){
    padding:30px 0;
  }
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
min-height:100%;
display:flex;
align-items:center;
justify-content:center;

@media screen and (max-width: 768px){
    flex-direction:column;
    padding:0 5%;
    
}
`;

const Poster = styled.div`
width:300px;
height:500px;
border:1px solid white;
border-radius:7px;
background:url(https://www.themoviedb.org/t/p/original${props => props.bg});
background-size:cover ;
margin:10px 0;
`;

const ProviderBox= styled.div `
width:50px;
height:50px;
border-radius:8px;
margin:0 10px;
background:url(https://www.themoviedb.org/t/p/original${props => props.bg});
background-size:cover ;
color:white;
`

const Details = styled.div`
width:60%;
height:80%;
margin-left:50px;
display:flex;
flex-direction:column;
flex-wrap:wrap;
h3{
    color:red;
    font-size:22px;
    margin:4px 0 2px 0;
}

h4,span{
    color:white;
    font-size:18px;
    margin:2px 0 12px 0;
}

p{
    color:red;
    font-size:18px;
    margin:6px 0;
}

@media screen and (max-width: 768px){
    width:100%;
    padding:0 10px;
    margin:0;
}

`;

const RelaseYear = styled.span`
color:#999;
font-size:20px;
`;

const UserScoreContainer = styled.div`
display:flex;
flex-direction:row;
align-items:center;
h4{
    color:#fff;
    font-size:18px;
}`

const UserScore = styled.div`
height:70px;
width:70px;
border:3px solid ${props => props.rating >= 6 ? 'green' : 'red'};
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
margin-right:10px;
h3{
    color:#fff;
    font-size:30px;
}
`;

const Title = styled.h1`
color:#fff;
font-size:30px;
font-weight:bold;
text-transform:uppercase;
margin:10px 0;
`;

const DirectorWrapper = styled.div`
display:flex;
width:100%;
min-height:100px;
div{
    display:flex;
    flex-direction:column;
    justify-content:center;

    h3{
        margin:0;
        color:red;
    }

    h4{
        color:white;
        font-size:18px;
    }
}
`;
 
const Providers = styled.div`
display: flex;
justify-content:flex-start;
align-items:center;
`


const CardHolder = styled.div`
width:100%;
display:flex;
align-items:center;
justify-content:center;
`;