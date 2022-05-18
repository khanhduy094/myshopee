import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../api/auth.api";
import userApi from "../../api/user.api";
import myLocalStorage from "../../constants/myLocalStorage";
import { payloadCreator } from "../../utils/helper";

export const register = createAsyncThunk(
  "auth/register",
  // async (data, thunkAPI) => {
  //   try {
  //     const res = await authApi.register(data);
  //     return res;
  //   } catch (error) {
  //     return thunkAPI.rejectWithValue(error)
  //   }
  // },
  payloadCreator(authApi.register)
);

export const login = createAsyncThunk(
  "auth/login",
  payloadCreator(authApi.login)
);
export const logout = createAsyncThunk(
  "auth/logout",
  payloadCreator(authApi.logout)
);

export const updateMe = createAsyncThunk(
  "user/updateMe",
  payloadCreator(userApi.updateMe)
);




const handleAuthFulfilled = (state, action) => {
  const { user, access_token } = action.payload.data;
  state.profile = user;
  localStorage.setItem(myLocalStorage.user, JSON.stringify(state.profile));
  localStorage.setItem(myLocalStorage.accessToken, access_token);
};

const handleUnauth = (state, action) => {
  state.profile = {};
  localStorage.removeItem(myLocalStorage.user);
  localStorage.removeItem(myLocalStorage.accessToken);
};

const auth = createSlice({
  name: "auth",
  initialState: {
    profile: JSON.parse(localStorage.getItem(myLocalStorage.user)) || {},
  },
  reducers: {
    unauthorize:  handleUnauth
  },
  extraReducers: {
    [register.fulfilled]: handleAuthFulfilled,
    [login.fulfilled]: handleAuthFulfilled,
    [logout.fulfilled]:  handleUnauth,
    [updateMe.fulfilled]: (state, action) => {
      state.profile = action.payload.data;
      localStorage.setItem(myLocalStorage.user, JSON.stringify(state.profile))
    }
  },
});

const authReducer = auth.reducer;
export default authReducer;
export const unauthorize = auth.actions.unauthorize;