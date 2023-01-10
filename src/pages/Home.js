import React, { useContext } from 'react'
import Main from '../components/Main/Main'
import styled from 'styled-components'
import UserContext from '../context/User/UserContext'


const Home = () => {

  const { closeSidebar } = useContext(UserContext)
  return (
    <HomeWrapper onClick={closeSidebar}>
      <Main />
    </HomeWrapper>
  )
}

export default Home


const HomeWrapper = styled.div`
max-width:100vw;

background:#999 lightgray; ;

`;