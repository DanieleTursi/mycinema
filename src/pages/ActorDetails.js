import React, { useContext, useEffect, useState } from 'react';
import TmdbContext from '../context/TmdbContext';
import useLocalStorage from '../hooks/useLocalStorage';
import styled from 'styled-components';
import DetailsWrapper from '../components/CardWrapper/DetailsWrapper';

const ActorDetails = () => {
    const { actorDetails, actorLoading, getActorDetails, getActorCredits, actorMovieCredits, actorTvCredits, creditsLoading } = useContext(TmdbContext);
    const [actorId, setActorId] = useLocalStorage('actorId', '');
    const [details, setDetails] = useState(false)
    const [value, setValue] = useState('Newest');
    const [movies, setMovies] = useState([]);
    const [tv, setTv] = useState([]);

    const startEffect = async () => {
        await getActorCredits(actorId);
        await getActorDetails(actorId);
        // console.log(actorTvCredits);
    }

    const handleChange = (value) => {
        console.log(value)
        if (value === 'Newest') {
           actorMovieCredits.sort(({release_date: b}, {release_date: a}) => a.localeCompare(b))
           actorTvCredits.sort(({first_air_date:b}, {first_air_date: a}) => a.localeCompare(b))
        } else if (value === 'Oldest'){
           actorMovieCredits.sort(({release_date: a}, {release_date: b}) => a.localeCompare(b))
           actorTvCredits.sort(({first_air_date: a}, {first_air_date: b}) => a.localeCompare(b))
        }  else {
            actorMovieCredits.sort(({vote_average: b}, {vote_average: a}) => a-b)
            actorTvCredits.sort(({vote_average: b}, {vote_average: a}) => a-b)
        }
      };

    useEffect(() => {
        startEffect();
        if (actorMovieCredits.length >= actorTvCredits.length) {
            setDetails(true)
        }
    }, [])


    if (!creditsLoading && !actorLoading) {
        return (
            <Wrapper>
                <HeaderDetails >
                    <ActorBackground />
                    <DetWrapper>
                        <Poster bg={actorDetails.profile_path} />
                        <Details>
                            <Title>{actorDetails.name}</Title>
                            <DoB>born: {actorDetails.birthday}</DoB>
                            {actorDetails.deathday != null && <DoB>died: {actorDetails.deathday}</DoB>}
                            <span>place of birth: {actorDetails.place_of_birth}</span>
                            <h3>Bio</h3>
                            <p>{actorDetails.biography}</p>
                        </Details>
                    </DetWrapper>

                </HeaderDetails>
                <ButtonsWrapper>
                    <Button focus={!details} onClick={() => { setDetails(false) }}>Shows</Button>
                    <Button focus={details} onClick={() => { setDetails(true) }}>Movies</Button>
                </ButtonsWrapper>
                <SortValues>
                <label htmlFor="orderby">Order by</label>
                  <select onChange={(event) => {setValue(event.target.value); handleChange(value)}} name="orderby" id="orderby">
                        <option value="Newest">Newest</option>
                        <option value="Oldest">Oldest</option>
                        <option value="Rating">Highest Rating</option>
                  </select>
                  </SortValues>
                <CardWrapperHolder>
                    {details === false
                        ? <DetailsWrapper side='left' name='|| Roles ' movies={actorTvCredits} type='tv' page='detailsPage' />
                        : <DetailsWrapper side='right' name='Roles || ' movies={actorMovieCredits} type='movie' page='detailsPage' />
                    }
                </CardWrapperHolder>
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
`;

const ActorBackground = styled.div`
width:100%;
height:100%;
background:linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5));
filter:blur(3px);
position:absolute;
z-index:-1;
`;

const DetWrapper = styled.div`
width:100%;
min-height:100%;
display:flex;
align-items:center;
justify-content:center;
`;

const SortValues= styled.div`
width:400px;
margin:20px;

label{
    margin-right:10px;
}
`

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

const CardWrapperHolder = styled.div`
display:flex;
flex-direction:row;
width:100%;
// align-items:center;
justify-content:space-between;
`;

const Button = styled.button`

color:${props => (props.focus ? 'powderblue' : '#000')};
background-color:${props => (props.focus ? '#000' : '#fff')};
border:1px solid black;
width:150px;
height:25px;
border-radius: 8px;
font-family: 'Kaushan Script', cursive;
margin:10px;
cursor:pointer;

&:hover{
  background:lightgray;
}
&:active{
    background-color:#000 ;
    border:1px solid red;
    color:#fff;
}
@media screen and (max-width: 768px){
  width:80px;

`;