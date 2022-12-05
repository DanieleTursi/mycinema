import React from 'react'
import Main from '../components/Main/Main'
import styled from 'styled-components'

const Home = () => {
  return (
    <HomeWrapper>
      <Main />
    </HomeWrapper>
  )
}

export default Home


const HomeWrapper = styled.div`
max-width:100vw;

background:#999 lightgray; ;

`;