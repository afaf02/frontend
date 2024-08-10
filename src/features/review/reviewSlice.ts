import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Review } from "../../types/review";
import { api } from "../../config/axios";

export interface IPState {
  reviews: Review[];
  isLoading: boolean;
  error: string;
}

const initialState: IPState = {
  reviews: [],
  isLoading: false,
  error: "",
};

export const getReviewsThunk = createAsyncThunk(
  "review/get-all",
  async (_, { rejectWithValue }) => {
    try {
      const { data: review } = await api.get(`/reviews`);
      return review;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);

export const createReviewThunk = createAsyncThunk(
  "review/create",
  async (body: Review) => {
    const payload = await api.post(`/reviews`, body);
    return payload;
  }
);

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviewsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviewsThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(
        getReviewsThunk.fulfilled,
        (state, action: PayloadAction<Review[]>) => {
          state.reviews = action.payload;
          state.isLoading = false;
        }
      );
  },
});

export const { setReviews } = reviewSlice.actions;

export default reviewSlice.reducer;
