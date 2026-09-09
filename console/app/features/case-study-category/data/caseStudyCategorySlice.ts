// app/features/case-study-category/data/caseStudyCategorySlice.ts

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CaseStudyCategoryState {
  sortBy: string;
  sortOrder: string;
  search: string;
  selectedCategory: any | null;
}

const initialState: CaseStudyCategoryState = {
  sortBy: "order",
  sortOrder: "asc",
  search: "",
  selectedCategory: null,
};

const caseStudyCategorySlice = createSlice({
  name: "caseStudyCategory",
  initialState,
  reducers: {
    setSort(
      state,
      action: PayloadAction<{ sortBy: string; sortOrder: string }>,
    ) {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<any | null>) {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setSort, setSearch, setSelectedCategory } =
  caseStudyCategorySlice.actions;

export default caseStudyCategorySlice.reducer;
