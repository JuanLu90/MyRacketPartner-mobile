import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
// import { toastAction } from "./alertSlice";
import AuthService from "services/auth.service";

const initialState = {
  isLoggedIn: false,
  token: null,
  user: { id: "", name: "", username: "", email: "" },
};

export const loginAction = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      const token = await AuthService.login(user);
      AsyncStorage.setItem("token", token);
      return { token };
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.status,
        message: error.message,
      });
    }
  },
);

export const registerAction = createAsyncThunk(
  "auth/register",
  async ({ user, tournamentUrl }, thunkAPI) => {
    try {
      const response = await AuthService.register({ user, tournamentUrl });
      return response;
    } catch (error) {
      const parseError = JSON.parse(error.message);

      return thunkAPI.rejectWithValue({
        errorCode: parseError.errorCode,
        type: parseError.type,
        message: parseError.message,
      });
    }
  },
);

export const authGoogleAction = createAsyncThunk(
  "auth/authGoogle",
  async (tokenGoogle, thunkAPI) => {
    try {
      const response = await AuthService.authGoogle({ token: tokenGoogle });
      AsyncStorage.setItem("token", response.token);
      return { token: response.token };
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.status,
        message: error.message,
      });
    }
  },
);

export const changePasswordAction = createAsyncThunk(
  "auth/changePassword",
  async (data, thunkAPI) => {
    try {
      const response = await AuthService.changePassword(data);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.status,
        message: error.message,
      });
    }
  },
);

export const forgotPasswordAction = createAsyncThunk(
  "auth/forgotPassword",
  async (data, thunkAPI) => {
    try {
      const response = await AuthService.forgotPassword(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.status,
        message: error.message,
      });
    }
  },
);

export const resetPasswordAction = createAsyncThunk(
  "auth/resetPassword",
  async (data, thunkAPI) => {
    try {
      const response = await AuthService.resetPassword(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.status,
        message: error.message,
      });
    }
  },
);

export const setUser = createAsyncThunk(
  "auth/refresh",
  async (token, thunkAPI) => {
    try {
      return { token };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  },
);

export const logout = createAsyncThunk("auth/logout", () => {
  AsyncStorage.removeItem("token");
});

export const tokenExpired = createAsyncThunk(
  "auth/tokenExpired",
  async (message, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      dispatch(logout());
      // dispatch(toastAction({ message, type: "WARNING" }));
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = jwtDecode(action.payload.token);
      })
      .addCase(loginAction.rejected, (state) => {
        state.isLoggedIn = false;
        state.token = null;
        state.user = {};
      })
      .addCase(authGoogleAction.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = jwtDecode(action.payload.token);
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.token = null;
        state.user = {};
      })
      .addCase(setUser.fulfilled, (state, action) => {
        try {
          state.isLoggedIn = true;
          state.token = action.payload.token;
          state.user = jwtDecode(action.payload.token);
        } catch (e) {
          console.error(e);
          return initialState;
        }
      });
  },
});

const { reducer } = authSlice;
export default reducer;
