import { Link } from 'react-router-dom';

const { default: styled } = require('styled-components');

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  background-color: #ee4d2d;
  border-radius: 2px;
  border: 0;
  padding: 1px 6px;
  transition: all 0.2s ease;
  color: #fff;
  &:hover {
    background-color: #f05d40;
  }
`;


export const ButtonLink = styled(Link)` 
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  background-color: #ee4d2d;
  border-radius: 2px;
  border: 0;
  padding: 1px 6px;
  transition: all 0.2s ease;
  color: #fff;
  &:hover {
    background-color: #f05d40;
  }
` 