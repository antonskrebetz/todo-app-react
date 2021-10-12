import React from "react";
import styled from "styled-components";

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  h1 {
    font-size: 26px;
    color: ${props => props.colored ? 'red' : 'black'};
    :hover {
      color: #555;
    }
  }

  h5 {
    font-size: 0.8 rem;
    color:gray;
  }
`

const AppHeader = ({liked, allPosts}) => {
  return (
    <Header>
      <h1>Anton Skrebetz</h1>
      <h5>{allPosts} notes, liked {liked}</h5>
    </Header>  
  )
}

export default AppHeader;