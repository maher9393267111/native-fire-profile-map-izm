import { configureStore, createSlice } from "@reduxjs/toolkit";

import darkTheme from "../constants/theme/dark";
import lightTheme from "../constants/theme/light";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    activeTheme: lightTheme,
  },
  reducers: {
    toggleTheme: (state) => {
      return {
        activeTheme:
          state.activeTheme.type === "light" ? darkTheme : lightTheme,
      };
    },
  },
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
    },
    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    logOut: (state, action) => {
      state.user = null;
    },
  },
});

const imageSlice = createSlice({
  name: "images",
  initialState: {
    imageItems: [],
  },
  reducers: {
    setImages: (state, action) => {
      const { images } = action.payload;
      console.log('REDUX IMAGES ---->>>' , images)
      return {
        imageItems: images,
      };
    },
  },
});

const locationSlice = createSlice({
  name: "location",
  initialState: {
    locationItem: null,
  },
  reducers: {
    setLocation: (state, action) => {
      const { location } = action.payload;
      return {
        locationItem: location,
      };
    },
  },
});

export const { signIn, updateUser, logOut } = authSlice.actions;
export const { toggleTheme } = themeSlice.actions;
export const { setImages } = imageSlice.actions;
export const { setLocation } = locationSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    theme: themeSlice.reducer,
    images: imageSlice.reducer,
    location: locationSlice.reducer,
  },
});
