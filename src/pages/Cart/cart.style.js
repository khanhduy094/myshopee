import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../assets/styles/ultis";

export const Header = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 0 1px 1px 0 rgb(0 0 0 / 5%);
  overflow: hiddne;
  border-radius: 3px;
  height: 5.5.rem;
  font-size: 1.4rem;
  background: #fff;
  text-transform: capitalize;
  margin-bottom: 12px;
  color: #888;
  padding: 0 20px;
`;
export const HeaderCheckbox = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px 0 20px;
  min-width: 58px;
`;
export const HeaderName = styled.div`
  width: 45%;
  color: rgba(0, 0, 0, 0.8);
`;
export const HeaderUnitPrice = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const HeaderQuantity = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const HeaderTotalPrice = styled.div`
  width: 11%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const HeaderAction = styled.div`
  width: 12%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Section = styled.div`
  padding: 20px;
  box-shadow: 0 1px 1px 0 rgb(0 0 0 / 5%);
  border-radius: 3px;
  background: #fff;
  margin-bottom: 2.5rem;
`;
export const CartItem = styled.div`
  margin-bottom: 2.2rem;
  padding: 2rem 0;
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 2px;
`;
export const CartItemCheckbox = styled(HeaderCheckbox)``;
export const CartItemOverView = styled(HeaderName)`
  display: flex;
`;
export const CartItemOverViewImg = styled(Link)`
  width: 8rem;
  height: 8rem;
  flex-shrink: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`;
export const CartOverViewNameWrapper = styled.div`
  overflow: hidden;
  flex-grow: 1;
  padding: 0.5rem 2rem 0 1rem;
`;
export const OverViewName = styled(Link)`
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 0.3125rem;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: --webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;
export const CartItemUnitPrice = styled(HeaderUnitPrice)`
    span:first-child{
        color: rgba(0, 0, 0, 0.54);
        text-decoration: line-through;
        margin-right: 1rem;
    }
`;
export const CartItemQuantity = styled(HeaderQuantity)`

`;
export const CartItemTotalPrice = styled(HeaderTotalPrice)`
    span{
        text-align: right;
        color: #ee4d2d;
    }
`;
export const CartItemAction = styled(HeaderAction)``;
export const ActionButton = styled.button`
    cursor: pointer;
    background: none;
    border: none;
    transition: color 0.1s ease;
    :hover{
        color: #ee4d2d;
    }
`;
export const Footer = styled.div`
    padding: 1rem 0;
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 3px;
    font-size: 1.6rem;
    position: sticky;
    bottom: 0;
    z-index: 2;
    :before{
        background: linear-gradient(transparent, rgba(0,0,0,0.06)) ;
        content: "";
        position: absolute;
        top: -1rem;
        left: 0;
        height: 1rem;
        width: 100%;
    }
`;
export const FooterCheckbox = styled(HeaderCheckbox)``;
export const FooterButton = styled.button`
    cursor: pointer;
    background: none;
    border: none;
    margin: 0 1rem;
`;
export const FooterSpaceBetween = styled.div`
    flex-grow: 1;
`;
export const FooterPrice = styled.div`
    margin-left: 1rem;
`;
export const FooterPriceTop = styled.div`
    display: flex;
    align-items: center ;
    margin-bottom: 0.5rem ;
    div{
        :first-child{
            color: #222;
        }
        :last-child{
            font-size: 2.4rem;
            margin-left: 5px;
            color: #ee4d2d;
        }
    }
`;
export const FooterPriceBot = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    div{
        :first-child{
            font-size: 1.4rem;
        }
        :last-child{
            padding-left: 2.4rem;
            color: #ee4d2d;
        }
    }
`;
export const FooterCheckout = styled(Button)`
    text-transform: capitalize;
    height: 4rem;
    font-size: 1.4rem;
    width: 21rem;
    font-weight: 300;
    margin: 0 2rem;
`;
