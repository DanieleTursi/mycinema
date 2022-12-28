import React, { useContext, useEffect} from 'react'
import styled from 'styled-components';
import DetailsWrapper from '../components/CardWrapper/DetailsWrapper';
import TmdbContext from '../context/TmdbContext';


const UserPage = ({name,surname,email}) => {
    const { searchMovies, movies, searchPeople, searchLoading, getPopular } = useContext(TmdbContext);
    

  useEffect(() => {
    getPopular()
   
  }, [])
    
    return (
        <UserPageContainer>
           <Details>
            <h4>User Details:</h4>
             <h3>Name: <span>{name}</span></h3>
             <h3>Surname: <span>{surname}</span></h3>
             <h3>Email: <span>{email}</span></h3>
           </Details>
           <DetailsWrapper side='right'  name='Wishlist || ' movies={movies} type='movie' page='detailsPage' />


        </UserPageContainer>
    )
}

export default UserPage

const UserPageContainer=styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`

const Details=styled.div`
  width:500px;
  display:flex;
  flex-direction:column;
  margin: 10px 100px;

  h4{
    text-align:center;
    font-size:22px;
    border-bottom: 1px solid black;
    font-family: 'Kaushan Script', cursive;
  }

  h3{
    margin:5px 20px;
    color:red;
    font-size:18px;
    font-family: 'PT Sans Narrow', sans-serif;
  }

  span{
    color:black;
  }

  
  
`

