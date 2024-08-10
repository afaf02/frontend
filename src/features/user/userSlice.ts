import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user";
import { getUsers, updateBrokerStatus } from "../../services/user";

export interface UserState {
  users: User[];
  approvedBrokers: User[];
  unApprovedBrokers: User[];
  isLoading: boolean;
  error: string;
  approvingId: string | null;
}

const initialState: UserState = {
  users: [],
  approvedBrokers: [],
  unApprovedBrokers: [],
  isLoading: false,
  error: "",
  approvingId: null,
};

export const getUsersThunk = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("user/get-all", async (_, { rejectWithValue }) => {
  try {
    const users = await getUsers();
    return users;
  } catch (error) {
    return rejectWithValue("Failed to fetch users");
  }
});

export const approveBrokerThunk = createAsyncThunk<
  User,
  { id: string; status: string },
  { rejectValue: string }
>(
  "user/approve-broker",
  async ({ id, status }, { rejectWithValue, dispatch }) => {
    try {
      const updatedUser = await updateBrokerStatus(id, status);
      dispatch(getUsersThunk());
      return updatedUser;
    } catch (error) {
      return rejectWithValue("Failed to approve broker");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIPs: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getUsersThunk.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(getUsersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setIPs } = userSlice.actions;

export default userSlice.reducer;
