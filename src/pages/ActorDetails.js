import React, { useContext, useEffect, useState } from 'react';
import TmdbContext from '../context/TmdbContext';
import useLocalStorage from '../hooks/useLocalStorage';
import styled from 'styled-components';
import DetailsWrapper from '../components/CardWrapper/DetailsWrapper';
import ReactShowMoreText from 'react-show-more-text';

const ActorDetails = () => {
    const { actorDetails, actorLoading, getActorDetails, getActorCredits, actorMovieCredits, actorTvCredits, creditsLoading } = useContext(TmdbContext);
    const [actorId, setActorId] = useLocalStorage('actorId', '');
    const [details, setDetails] = useState(false)
    const [value, setValue] = useState('');

    const startEffect = async () => {
        await getActorCredits(actorId);
        await getActorDetails(actorId);

    }

    const handleChange = (value) => {
        if (value === 'Newest') {
            actorMovieCredits.sort(({ release_date: b }, { release_date: a }) => a.localeCompare(b))
            actorTvCredits.sort(({ first_air_date: b }, { first_air_date: a }) => a.localeCompare(b))
        } else if (value === 'Oldest') {
            actorMovieCredits.sort(({ release_date: a }, { release_date: b }) => a.localeCompare(b))
            actorTvCredits.sort(({ first_air_date: a }, { first_air_date: b }) => a.localeCompare(b))
        } else {
            actorMovieCredits.sort(({ vote_average: b }, { vote_average: a }) => a - b)
            actorTvCredits.sort(({ vote_average: b }, { vote_average: a }) => a - b)
        }

        return actorMovieCredits, actorTvCredits
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
                            {actorDetails.birthday != null && <DoB>Date of Birth: <span>{actorDetails.birthday.split("-").reverse().join("-")}</span></DoB>}
                            {actorDetails.deathday != null && <DoB>Died: <span>{actorDetails.deathday}</span></DoB>}
                            <DoB>Place of Birth: <span>{actorDetails.place_of_birth}</span></DoB>
                            <h3>Bio:</h3>
                            <ReactShowMoreText lines={4}>
                                <p>{actorDetails.biography}</p>
                            </ReactShowMoreText>
                        </Details>
                    </DetWrapper>

                </HeaderDetails>
                <ButtonsWrapper>
                    <Button focus={!details} onClick={(e) => { setDetails(false) }}>Shows</Button>
                    <Button focus={details} onClick={() => { setDetails(true) }}>Movies</Button>
                    <SortValues>
                        <label htmlFor="orderby">Order by</label>
                        <select onChange={(e) => {
                            setValue(e.target.value);
                            handleChange(e.target.value);
                            console.log(value)
                        }} name="orderby" id="orderby">
                            <option value="Select">Select</option>
                            <option value="Newest">Newest</option>
                            <option value="Oldest">Oldest</option>
                            <option value="Rating">Best Rating</option>
                        </select>
                    </SortValues>
                </ButtonsWrapper>
                <CardWrapperHolder>
                    {details === false
                        ? <DetailsWrapper side='left' value={value} name='|| Roles ' movies={actorTvCredits} type='tv' page='detailsPage' />
                        : <DetailsWrapper side='right' value={value} name='Roles || ' movies={actorMovieCredits} type='movie' page='detailsPage' />
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

@media screen and (max-width: 768px){
    padding:30px 0;
  }
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

@media screen and (max-width: 768px){
    flex-direction:column;
    padding:5px 0;  
`;

const SortValues = styled.div`
display: flex;
flex-direction:row;
justify-content:center;
align-items:center;
width:150px;
height:25px;
margin:20px;
border:1px solid black;
border-radius:8px;
font-family: 'Kaushan Script', cursive;
font-size:13px;

label{
    margin-right:5px;
}

select{
    border:none;
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
    color:#000;
}

@media screen and (max-width: 768px){
   align-self:flex-start;
`;

const Title = styled.span`
color:#fff;
font-size:40px;
font-weight:bold;
`;

const DoB = styled.span`
color:#fff;
font-size:18px;
margin-top:5px;

span{
    color:#000;
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

const CardWrapperHolder = styled.div`
display:flex;
flex-direction:row;
width:100%;
// align-items:center;
justify-content:center;
`;

const Button = styled.button`
color:${props => (props.focus ? 'powderblue' : '#000')};
background-color:${props => (props.focus ? '#000' : '#fff')};
border:1px solid black;
width:150px;
height:28px;
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