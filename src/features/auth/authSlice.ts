import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { adminLogin, studentLogin, studentRegister } from "../../services/auth";
import { Admin, User } from "../../types/user";

export interface AuthState {
  userType: string;
  admin: Admin;
  user: User;
  isLoading: boolean;
  isWaitingForOtp: boolean;
  error: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiry: number;
  refreshTokenExpiry: number;
}

const initialState: AuthState = {
  userType: "",
  admin: {} as Admin,
  user: {} as User,
  isLoading: true,
  isWaitingForOtp: false,
  error: "",
  accessToken: "",
  refreshToken: "",
  accessTokenExpiry: 0,
  refreshTokenExpiry: 0,
};

export const adminLoginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const result = await adminLogin(email, password);
    return result;
  }
);

export const studentsLoginThunk = createAsyncThunk(
  "auth/login-student",
  async ({ email, password }: { email: string; password: string }) => {
    const result = await studentLogin(email, password);
    return result;
  }
);

export const studentsRegisterThunk = createAsyncThunk(
  "auth/login-admin",
  async (user: User) => {
    const result = await studentRegister(user);
    return result;
  }
);

// export const verifyOtpThunk = createAsyncThunk<
//   JWT,
//   string,
//   { state: RootState }
// >("auth/verify", async (otp: string, thunkAPI) => {
//   const state = thunkAPI.getState();

//   // Check if user exists in the state and has a CNIC
//   const cnicNumber = state.auth.user?.cnicNumber;
//   console.log(cnicNumber, otp);
//   if (!cnicNumber) {
//     throw new Error("CNIC is not available for verification");
//   }

//   // Call the verify function with the CNIC and OTP
//   const { result } = await verify(cnicNumber, otp);
//   return result;
// });

// export const registerThunk = createAsyncThunk(
//   "auth/register",
//   async (user: User) => {
//     const modifiedUser: User = {
//       ...user,
//       workEmail: user.email,
//       workPassword: user.password,
//     };
//     const result = await register(modifiedUser);
//     return result;
//   }
// );

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Admin>) => {
      state.admin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // admin login
      .addCase(adminLoginThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminLoginThunk.rejected, (state) => {
        state.error = "Error while Logging In";
        state.isLoading = false;
      })
      .addCase(adminLoginThunk.fulfilled, (state, { payload }) => {
        state.admin = payload.admin;
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.accessTokenExpiry = payload.accessTokenExpiry;
        state.refreshTokenExpiry = payload.refreshTokenExpiry;
        state.isLoading = false;
      })
      // student login
      .addCase(studentsLoginThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(studentsLoginThunk.rejected, (state) => {
        state.error = "Error while Logging In";
        state.isLoading = false;
      })
      .addCase(studentsLoginThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.accessTokenExpiry = payload.accessTokenExpiry;
        state.refreshTokenExpiry = payload.refreshTokenExpiry;
        state.isLoading = false;
      });
    // // register
    // .addCase(registerThunk.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(registerThunk.rejected, (state) => {
    //   state.error = "Error while registering user";
    //   state.isLoading = false;
    // })
    // .addCase(registerThunk.fulfilled, (state) => {
    //   state.isLoading = false;
    // })
    // // verify
    // .addCase(verifyOtpThunk.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(verifyOtpThunk.rejected, (state) => {
    //   state.error = "Error while verifying user";
    //   state.isLoading = false;
    // })
    // .addCase(
    //   verifyOtpThunk.fulfilled,
    //   (state, action: PayloadAction<JWT>) => {
    //     state.user = {
    //       ...state.user,
    //       jwt: action.payload,
    //     } as User;
    //     state.isWaitingForOtp = false;
    //     state.isLoading = false;
    //   }
    // );
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = authSlice.actions;

export default authSlice.reducer;
