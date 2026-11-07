// app/features/faq/data/faqSlice.ts

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FaqState {
  pageKey: string;
  search: string;
}

const initialState: FaqState = {
  pageKey: "all",
  search: "",
};

const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    setPageKey(state, action: PayloadAction<string>) {
      state.pageKey = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

export const { setPageKey, setSearch } = faqSlice.actions;

export default faqSlice.reducer;
