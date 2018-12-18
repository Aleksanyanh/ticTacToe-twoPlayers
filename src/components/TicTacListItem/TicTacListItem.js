import React from 'react';
import styled from 'styled-components';

const BoxCSS = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
  z-index: 90;
  
  &.activeDrawRed {
    background: crimson;
  }
  
  &:hover {
    background: rgba(0,0,0, 0.2);
  }
`;

const TicTacListItem = (props) => {
console.log(props.activeDrawWinner);
  return (
      <BoxCSS className={props.activeDrawWinner ? 'activeDrawRed' : ''} onClick={props.playerClick}>
        {props.children}
      </BoxCSS>
  );
};

export default TicTacListItem;