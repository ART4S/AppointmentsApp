import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
};

const loginSlice = createSlice({
  name: "login",

  initialState,

  reducers: {},
});

export const loginReducer = loginSlice.reducer;

export default loginSlice;
