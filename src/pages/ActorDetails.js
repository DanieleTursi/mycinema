import React, { useContext, useEffect, useState } from 'react';
import TmdbContext from '../context/TmdbContext';
import useLocalStorage from '../hooks/useLocalStorage';
import styled from 'styled-components';


const ActorDetails = () => {

    const { actorDetails, actorLoading, getActorDetails } = useContext(TmdbContext);
    const [actorId, setActorId] = useLocalStorage('actorId', '');


    const startEffect = async () => {
        await getActorDetails(actorId)
    }

    useEffect(() => {
        startEffect()

    }, [])


    if (!actorLoading) {
        return (
            <Wrapper>
                <HeaderDetails >
                    <ActorBackground />
                    <DetailsWrapper>
                        <Poster bg={actorDetails.profile_path} />
                        <Details>

                            <Title>{actorDetails.name}</Title>
                            <DoB>born: {actorDetails.birthday}</DoB>
                            {actorDetails.deathday != null && <DoB>died: {actorDetails.deathday}</DoB>}

                            <h3>Bio</h3>
                            <p>{actorDetails.biography}</p>



                        </Details>
                    </DetailsWrapper>

                </HeaderDetails>
            </Wrapper>


        )
    }
    else {
        <h1>Loading...</h1>
    }
}

export default ActorDetails


const Wrapper = styled.div`
width:100%;
min-height:600px;
display:flex;
flex-direction:column ;
`;

const HeaderDetails = styled.div`
width:100%;
min-height:700px;
margin:20px 0;
position:relative;
display:flex;
align-items:center;
justify-content:center;
`;


const ActorBackground = styled.div`
width:100%;
height:100%;
background:linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5));
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
}
p{
    color:#fff;
}
`;
const Title = styled.span`
color:#fff;
font-size:40px;
font-weight:bold;
`;

const DoB = styled.span`
color:#999;
font-size:20px;
`;
