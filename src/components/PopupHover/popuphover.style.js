import styled, { keyframes } from "styled-components";

// popup animation
export const PopupEnterAnimation = keyframes`
   0%{
       transform: scale(0);
       opacity: 0,
   } 
   to {
    transform: scale(1);
       opacity: 1,
   }
`;

//popup style

export const Drawer = styled.div`
  top: 100%;
  right: 0;
  position: absolute;
  will-change: transform;
  animation: ${PopupEnterAnimation} 0.2s ease-in cubic-bezier(0.4, 0, 0.6, 1);
  opacity: 1;
  z-index: 400;
  border: 1px solid rgba(0, 0, 0, 0.09);
  :before {
    content: "";
    position: absolute;
    top: -10px;
    left: 0;
    height: 10px;
    opacity: 0;
    width: 100%;
  }
`;

// hình tam giác của popup
export const PropupArrow = styled.div`
  border-bottom: 10px solid rgb(255, 255, 255);
  border-left: 14px solid transparent;
  border-right: 14px solid transparent;
  top: -10px;
  position: absolute;
  right: 6px;
  width: 0;
  height: 0;
`;
export const PopupContent = styled.div`
  box-shadow: 0 1px 3.125rem 0 rgb(0 0 0 /20%);
  border-radius: 0.125rem;
  overflow: hidden;
  background-color: #fff;
`;
