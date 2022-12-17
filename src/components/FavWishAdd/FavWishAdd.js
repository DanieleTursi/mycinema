import React, {useState} from 'react'
import {  AiOutlineHeart, AiOutlineUnorderedList,AiOutlineEye} from 'react-icons/ai';
import styled from "styled-components"


const FavWishAdd = () => {
    const style = { color: "black", margin: "5px",fontSize: "20px"};
    const [favClicked,setFavClicked]= useState (false);
    const [addClicked,setAddClicked]= useState (false);
    const [watClicked,setWatClicked]= useState (false);
  
    const handleFav = () => {
        favClicked === true
            ? setFavClicked(false)
            : setFavClicked(true);
    };

    const handleAdd = () => {
        addClicked === true
            ? setAddClicked(false)
            : setAddClicked(true);
    };

    const handleWat = () => {
        watClicked === true
            ? setWatClicked(false)
            : setWatClicked(true);
    };

return(
    <MainBar>
        <FavButton favClicked={favClicked} onClick={handleFav}><AiOutlineHeart style={style}/></FavButton>
        <AddButton  addClicked={addClicked} onClick={handleAdd}><AiOutlineUnorderedList style={style}/></AddButton>
        <WatButton watClicked={watClicked} onClick={handleWat}><AiOutlineEye style={style}/></WatButton>
    </MainBar>
  )
}

export default FavWishAdd

const MainBar=styled.div`
  width:400px;
  display:flex;
  justify-content:center;
  align-items:center;

  @media screen and (max-width: 768px){
    width:200px;
  }
`

const FavButton=styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background:${props => (props.favClicked === true ? 'green' : 'lightgray')};
  margin:0 20px;
  border:1px solid #000;
  color:black;

  @media screen and (max-width: 768px){
    margin:0 10px;
  }
`

const AddButton=styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background:${props => (props.addClicked === true ? 'green' : 'lightgray')};
  margin:0 20px;
  border:1px solid #000;
  color:black;


  @media screen and (max-width: 768px){
    margin:0 10px;
  }
`

const WatButton=styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background:${props => (props.watClicked === true ? 'green' : 'lightgray')};
  margin:0 20px;
  border:1px solid #000;
  color:black;


  @media screen and (max-width: 768px){
    margin:0 10px;
  }
`


