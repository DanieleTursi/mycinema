import React, { useContext, useEffect, useState } from 'react';
import TmdbContext from '../context/TmdbContext';
import useLocalStorage from '../hooks/useLocalStorage';
import styled from 'styled-components';



const DetailsPage = () => {
    const { details, detailsLoading, getDetails, rDate, credits, actorDetails, cast } = useContext(TmdbContext);
    const [showId, setShowId] = useLocalStorage('id', '');
    const [screenType, setScreenType] = useLocalStorage('st', '');


    useEffect(() => {
        startEffect()

    }, [])
    console.log(credits)
    if (!detailsLoading) {
        return (

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
                            <Title>{details.title || details.name}</Title>
                            <RelaseYear>({rDate})</RelaseYear>
                            <h3>Overview</h3>
                            <p>{details.overview}</p>
                            <DirectorWrapper>

                                {credits != null ? <div>
                                    <h3>Director</h3>
                                    <p>{credits}</p>
                                </div> : <></>}


                            </DirectorWrapper>


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

export default DetailsPage

const Wrapper = styled.div`
width:100%;
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
min-height:100%;
display:flex;
align-items:center;
justify-content:center;
`;

const Poster = styled.div`
width:300px;
height:500px;
border:1px solid white;
border-radius:7px;
background:url(https://www.themoviedb.org/t/p/original${props => props.bg});
background-size:cover ;
`;

const Details = styled.div`
width:60%;
height:80%;
margin-left:50px;
display:flex;
flex-direction:column;
flex-wrap:wrap;

h3{
    color:white;
    font-size:22px;
   
}

p{
    color:#fff;
    font-size:18px;
    margin:6px 0;
}
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
}
`;

