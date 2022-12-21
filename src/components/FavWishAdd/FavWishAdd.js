import React, {useState} from 'react'
import {  AiOutlineHeart, AiOutlineUnorderedList,AiOutlineEye} from 'react-icons/ai';
import styled from "styled-components"


const FavWishAdd = () => {
    const style = { fontSize: "20px",color:"white"};
    const styledButton = { color: "white",fontSize: "12px", };
    const [favClicked,setFavClicked]= useState (false);
    const [addClicked,setAddClicked]= useState (false);
    const [watClicked,setWatClicked]= useState (false);
  
    const handleFav = () => {
        favClicked 
            ? setFavClicked(false)
              
            : setFavClicked(true)
            ;
    };

    const handleAdd = () => {
        addClicked 
            ? setAddClicked(false)
            : setAddClicked(true);
    };

    const handleWat = () => {
        watClicked 
            ? setWatClicked(false)
            : setWatClicked(true);
    };

return(
    <MainBar>
       <ButtonContainer>
        <FavButton favClicked={favClicked} onClick={handleFav}><AiOutlineHeart style={style}/></FavButton>
        <p style={styledButton}>to favourite</p>
       </ButtonContainer>
       <ButtonContainer>
        <AddButton  addClicked={addClicked} onClick={handleAdd}><AiOutlineUnorderedList style={style}/></AddButton>
        <p style={styledButton}>to a list</p>
       </ButtonContainer>
       <ButtonContainer>
        <WatButton watClicked={watClicked} onClick={handleWat}><AiOutlineEye style={style}/></WatButton>
        <p style={styledButton}>to watchlist</p>
       </ButtonContainer>
     </MainBar>
  )
}

export default FavWishAdd

const MainBar=styled.div`
  width:300px;
  display:flex;
  justify-content:center;
  align-items:center;

  @media screen and (max-width: 768px){
    width:200px;
  }
`

const ButtonContainer= styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`

const FavButton=styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background:${props => (props.favClicked === true ? 'red' : 'black')};
  margin:0 10px;
  border:1px solid #fff;
  color:black;
  cursor:pointer;

  @media screen and (max-width: 768px){
    margin:0 10px;
  }
`

const AddButton=styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background:${props => (props.addClicked === true ? 'green' : 'black')};
  margin:0 10px;
  border:1px solid #fff;
  color:black;
  cursor:pointer;


  @media screen and (max-width: 768px){
    margin:0 10px;
  }
`

const WatButton=styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background:${props => (props.watClicked === true ? 'green' : 'black')};
  margin:0 10px;
  border:1px solid #fff;
  color:black;
  cursor:pointer;


  @media screen and (max-width: 768px){
    margin:0 10px;
  }
`


