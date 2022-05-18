import appReducer from "../app.slice";
import cartReducer from "../pages/Cart/cart.slice";

const { default: authReducer } = require("../pages/Auth/auth.slice");

export const rootReducer = {
  auth: authReducer,
  app: appReducer,
  cart: cartReducer
}