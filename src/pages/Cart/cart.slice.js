import { logout } from "../Auth/auth.slice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: purchaseApi } = require("../../api/purchase.api");
const { payloadCreator } = require("../../utils/helper");

export const getCartPurchase = createAsyncThunk(
  "cart/getCartPurchase",
  payloadCreator(purchaseApi.getCartPurchase)
);
export const updateCartPurchase = createAsyncThunk(
  "cart/updateCartPurchase",
  payloadCreator(purchaseApi.updateCartPurchase)
);
export const deletePurchase = createAsyncThunk(
  "cart/deletePurchase",
  payloadCreator(purchaseApi.deletePurchase)
);
export const buyPurchase = createAsyncThunk(
  "cart/buyPurchase",
  payloadCreator(purchaseApi.buyPurchase)
);

const cart = createSlice({
  name: "cart",
  initialState: {
    purchase: [],
  },
  extraReducers: {
      [getCartPurchase.fulfilled] : (state, action) => {
          state.purchase = action.payload.data;
      },
      [logout.fulfilled] : (state, action) => {
          state.purchase = []
      }
  },
});


const cartReducer = cart.reducer;
export default cartReducer;