import React from "react";
import { Route, Switch } from "react-router-dom";
import { path } from "./constants/path";
import AuthenticateGuard from "./guards/AuthenticateGuard";
import UnauthenticatedGuard from "./guards/UnauthenticatedGuard";
import CartLayout from "./Layouts/CartLayout/CartLayout";
import MainLayout from "./Layouts/MainLayout/MainLayout";
import RegisterLayout from "./Layouts/RegisterLayout/RegisterLayout";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import User from "./pages/User/User";

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route path={path.home} exact>
          <MainLayout>
            <Home />
          </MainLayout>
        </Route>
        <Route path={path.productDetail} exact>
          <MainLayout>
            <ProductDetail />
          </MainLayout>
        </Route>
        <Route path={path.login}>
          <UnauthenticatedGuard>
            <RegisterLayout title="Đăng nhập">
              <Login />
            </RegisterLayout>
          </UnauthenticatedGuard>
        </Route>
        <Route path={path.register}>
          <UnauthenticatedGuard>
            <RegisterLayout title="Đăng ký">
              <Register />
            </RegisterLayout>
          </UnauthenticatedGuard>
        </Route>
        <Route path={path.user}>
          <AuthenticateGuard>
            <MainLayout>
              <User />
            </MainLayout>
          </AuthenticateGuard>
        </Route>
        <Route path={path.cart}>
          <AuthenticateGuard>
            <CartLayout>
              <Cart />
            </CartLayout>
          </AuthenticateGuard>
        </Route>
        <Route path={path.notFound}>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}
