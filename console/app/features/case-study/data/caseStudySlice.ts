// app/features/case-study/data/caseStudySlice.ts

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CaseStudyState {
  sortBy: string;
  sortOrder: string;
  search: string;
  filter: string;
  selectedCaseStudy: any | null;
}

const initialState: CaseStudyState = {
  sortBy: "createdAt",
  sortOrder: "desc",
  search: "",
  filter: "all",
  selectedCaseStudy: null,
};

const caseStudySlice = createSlice({
  name: "caseStudy",
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
    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
    setSelectedCaseStudy(state, action: PayloadAction<any | null>) {
      state.selectedCaseStudy = action.payload;
    },
    resetFilters(state) {
      state.sortBy = "createdAt";
      state.sortOrder = "desc";
      state.search = "";
      state.filter = "all";
      state.selectedCaseStudy = null;
    },
  },
});

export const {
  setSort,
  setSearch,
  setFilter,
  setSelectedCaseStudy,
  resetFilters,
} = caseStudySlice.actions;

export default caseStudySlice.reducer;
