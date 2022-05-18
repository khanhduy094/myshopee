import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { path } from "../../constants/path";
import { useAuthenticated } from "../../hooks/useAuthenticated";
import { usePopup } from "../../hooks/usePopup";
import { logout } from "../../pages/Auth/auth.slice";
import PopupHover from "../PopupHover/PopupHover";
import * as S from "./navBar.style";

export default function NavBar() {
  const { activePopup, showPopup, hidePopup } = usePopup();
  const authenticated = useAuthenticated();
  const profile = useSelector((state) => state.auth.profile);
  const dispatch = useDispatch();

  const handleLogout = () => {
    
    dispatch(logout());
    console.log("asd");
  }

  return (
    <S.Navbar>
      <S.NavMenu>
        {authenticated && (
          <li>
            <S.User onMouseEnter={showPopup} onMouseLeave={hidePopup}>
              <S.UserImage src="" />
              <S.UserName>{profile.name || profile.email}</S.UserName>
              {activePopup && (
                <PopupHover active={activePopup}>
                  <S.UserLink to={path.user}>Tài khoản của tôi</S.UserLink>
                  <S.UserLink to={path.purchase}>Đơn mua</S.UserLink>
                  <S.UserButton onClick={handleLogout}>Đăng xuất</S.UserButton>
                </PopupHover>
              )}
            </S.User>
          </li>
        )}
        {!authenticated && (
          <Fragment>
            <li>
              <S.NavLink to={path.register}>Đăng ký</S.NavLink>
              <S.NavLink to={path.login}>Đăng nhập</S.NavLink>
            </li>
          </Fragment>
        )}
      </S.NavMenu>
    </S.Navbar>
  );
}
