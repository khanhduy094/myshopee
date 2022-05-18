import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { unauthorize } from "../../pages/Auth/auth.slice";
import { path } from "../../constants/path";
import {useAuthenticated} from "../../hooks/useAuthenticated";
import {getCartPurchase} from "../../pages/Cart/cart.slice";

export default function Authorization() {
  const dispatch = useDispatch();
  const history = useHistory();
  const status = useSelector((state) => state.app.status);
  const authenticated = useAuthenticated();

  useEffect(() => {
    if (status === 401) {
      dispatch(unauthorize());
      history.push(path.login);
    }
  }, [status, history, dispatch]);


  useEffect(() => {
    if(authenticated){
      dispatch(getCartPurchase())
    }
  },[dispatch, authenticated])

  return null;
}
