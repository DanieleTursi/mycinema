import React, { useContext } from 'react'
import styled, { css } from 'styled-components';
import UserContext from '../../context/User/UserContext';
import { NavLink } from 'react-router-dom'


const Sidebar = (props) => {

    const { handleLogout, closeSidebar } = useContext(UserContext);

    const handleClick = () => {
        handleLogout();
        closeSidebar();
    }

    return (
        <SidebarWrapper open={props.open}>
            <PageLink onClick={closeSidebar} to='user'>My Page</PageLink>
            <Button onClick={handleClick}>logout</Button>
        </SidebarWrapper>
    )
}

export default Sidebar


const SidebarWrapper = styled.div`
width:100px;
background-color:#000 ;
min-height:50px;
position:absolute;
border-radius:4px;
right:0;
padding:5px 0;
top:${props => props.open ? '65px' : '-60px'};
z-index:50;

`;

const ButtonStyle = css`
width:100%;
height:24px;
display:flex;
align-items:center;
justify-content:center;
color:#fff;
cursor:pointer;
font-size:18px ;
font-weight:bold;
text-transform:uppercase;
font-family: 'Gochi Hand', cursive;
`

const Button = styled.div`
${ButtonStyle}
`;

const PageLink = styled(NavLink)`
${ButtonStyle}
text-decoration:none;
`;