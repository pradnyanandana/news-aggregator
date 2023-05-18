import { configureStore, createSlice } from "@reduxjs/toolkit";
import { categories } from "../data/categories";

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

const newsInitial = {};
categories.map((category) => (newsInitial[category.slug] = []));

const newsSlice = createSlice({
  name: "news",
  initialState: newsInitial,
  reducers: {
    saveNews: (state, action) => {
      const { category, news } = action.payload;
      state[category] = news;
    },
    removeNews: (state) => {
      categories.map((category) => {
        state[category.slug] = [];
      });
    },
  },
});

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    search: '',
    news: [],
    sources: [],
    categories: [],
    startDate: new Date(),
    endDate: new Date(),
  },
  reducers: {
    saveQuery: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    removeFilterNews: (state) => {
      state.news = [];
    },
  },
});

export const { saveUser, removeUser } = userSlice.actions;

export const { saveToken, removeToken } = tokenSlice.actions;

export const { saveNews, removeNews } = newsSlice.actions;

export const { saveQuery, removeFilterNews } = filterSlice.actions;

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    token: tokenSlice.reducer,
    news: newsSlice.reducer,
    filter: filterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
