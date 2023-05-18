import { configureStore, createSlice } from "@reduxjs/toolkit";

const tokenKey = "token-innews";
const tokenString = localStorage.getItem(tokenKey);
const userToken = JSON.parse(tokenString);

const userKey = "user-innews";
const userString = localStorage.getItem(userKey);
const user = JSON.parse(userString) || {};

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    value: userToken,
  },
  reducers: {
    saveToken: (state, action) => {
      localStorage.setItem(tokenKey, JSON.stringify(action.payload));
      state.value = action.payload;
    },
    removeToken: (state) => {
      localStorage.removeItem(tokenKey);
      state.value = undefined;
    },
  },
});

const userSlice = createSlice({
  name: "token",
  initialState: {
    value: user,
  },
  reducers: {
    saveUser: (state, action) => {
      localStorage.setItem(userKey, JSON.stringify(action.payload));
      state.value = action.payload;
    },
    removeUser: (state) => {
      localStorage.removeItem(userKey);
      state.value = {};
    },
  },
});

const newsSlice = createSlice({
    name: "token",
    initialState: {
    },
    reducers: {
    },
  });

export const { saveUser, removeUser } = userSlice.actions;

export const { saveToken, removeToken } = tokenSlice.actions;

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    token: tokenSlice.reducer,
    news: newsSlice.reducer
  },
});
