import styled from "styled-components"
import CardWrapper from "../CardWrapper/CardWrapper";

const Main = () => {
  return (
    <MainWrapper>
      <CardWrapperHolder>
        <CardWrapper side='left' name='Most Popular Shows' />
        <CardWrapper side='right' name='Most Popular Movies' />
        <CardWrapper side='left' name='Just Relased Shows' />
        <CardWrapper side='right' name='Just Relased Movies' />
      </CardWrapperHolder>

    </MainWrapper>
  )
}

export default Main


const MainWrapper = styled.div`
width:100%;
height:100%;
display:flex;
align-items:center;
justify-content:center;
`;

const CardWrapperHolder = styled.div`
width:95%;
height:90%;
display:flex;
flex-wrap:wrap;
justify-content:space-between;
`;