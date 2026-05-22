import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ApplicantState {
  sortBy: string;
  sortOrder: "asc" | "desc";
  search: string;
  selectedApplicant: any | null;
  page: number;
  limit: number;
}

const initialState: ApplicantState = {
  sortBy: "createdAt",
  sortOrder: "desc",
  search: "",
  selectedApplicant: null,
  page: 1,
  limit: 10,
};

const applicantSlice = createSlice({
  name: "applicant",
  initialState,
  reducers: {
    // ✅ Set table sorting parameters
    setSort(
      state,
      action: PayloadAction<{ sortBy: string; sortOrder: "asc" | "desc" }>,
    ) {
      const { sortBy, sortOrder } = action.payload;
      state.sortBy = sortBy;
      state.sortOrder = sortOrder;
    },

    // ✅ Set current candidate search term/query
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1; // Reset to page 1 during an active text filter
    },

    // ✅ Track a specific row record for deletion dialogues/modals
    setSelectedApplicant(state, action: PayloadAction<any | null>) {
      state.selectedApplicant = action.payload;
    },

    // ✅ Dynamic pagination controllers
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },

    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
      state.page = 1; // Reset window index if display threshold shifts
    },

    // ✅ Reset all state variables to baseline operational parameters
    resetFilters(state) {
      state.sortBy = "createdAt";
      state.sortOrder = "desc";
      state.search = "";
      state.page = 1;
      state.limit = 10;
      state.selectedApplicant = null;
    },
  },
});

export const {
  setSort,
  setSearch,
  setSelectedApplicant,
  setPage,
  setLimit,
  resetFilters,
} = applicantSlice.actions;

export default applicantSlice.reducer;
