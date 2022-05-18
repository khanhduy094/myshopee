import React from "react";
import { useRouteMatch } from "react-router-dom";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";
import { path } from "../../constants/path";
import Password from "./Password/Password";
import Profile from "./Profile/Profile";
import Purchase from "./Purchase/Purchase";
import * as S from "./user.style";

export default function User() {

  const match = useRouteMatch();

  return (
    <div>
      <S.Container className="container">
        <S.SideBar>
          <S.Brief>
            <S.BriefAvatar to={path.profile}>
              <img src="" alt="" />
            </S.BriefAvatar>
            <S.BriefRight>
              <S.UserName>duy03</S.UserName>
              <S.Edit to={path.profile}>
                <svg
                  width={12}
                  height={12}
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: 4 }}
                >
                  <path
                    d="M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48"
                    fill="#9B9B9B"
                    fillRule="evenodd"
                  />
                </svg>
                Sửa hồ sơ
              </S.Edit>
            </S.BriefRight>
          </S.Brief>
          <S.SideBarMenu>
            <S.MenuEntry to={path.profile}>
              <S.MenuIcon>
                <img src="https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4" alt="avartaruiser"/>
              </S.MenuIcon>
              Tài khoản của tôi
            </S.MenuEntry>
            <S.MenuEntry to={path.password}>
              <S.MenuIcon>
                <img src="https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4" alt="avartaruiser"/>
              </S.MenuIcon>
              Đổi mật khẩu
            </S.MenuEntry>
            <S.MenuEntry to={path.purchase}>
              <S.MenuIcon>
                <img src="https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078" alt="donmua"/>
              </S.MenuIcon>
              Đơn mua
            </S.MenuEntry>
          </S.SideBarMenu>
        </S.SideBar>
        <S.Main>
          <Switch>
            <Route path={path.user} exact>
              <Redirect to={`${match.path}/profile`}/>
            </Route>
            <Route path={`${match.path}/profile`}>
              <Profile />
            </Route>
            <Route path={`${match.path}/purchase`}>
              <Purchase />
            </Route>
            <Route path={`${match.path}/password`}>
              <Password />
            </Route>
          </Switch>
        </S.Main>
      </S.Container>
    </div>
  );
}
