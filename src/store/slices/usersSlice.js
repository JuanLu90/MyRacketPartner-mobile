import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UsersService from "services/users.service";
import { setLoading } from "./loadingSlice";

const initialState = {
  userInfo: {},
};

export const userProfileAction = createAsyncThunk(
  "users/user",
  async (userId, thunkAPI) => {
    const { dispatch } = thunkAPI;

    try {
      dispatch(setLoading(true));
      const data = await UsersService.userProfileInfo(userId);

      dispatch(setLoading(false));
      return { userInfo: data[0] };
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
      return thunkAPI.rejectWithValue({
        status: error.status,
        message: error.message,
      });
    }
  },
);

export const editUserInfoAction = createAsyncThunk(
  "users/edituser",
  async (data, thunkAPI) => {
    try {
      const response = await UsersService.editUserProfileInfo(data);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({
        status: error.status,
        message: error.message,
      });
    }
  },
);

export const editPlayerInfoAction = createAsyncThunk(
  "users/edituserplayer",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await UsersService.editPlayerProfileInfo(data);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({
        status: error.status,
        message: error.message,
      });
    }
  },
);

export const sendSuggestionsAction = createAsyncThunk(
  "users/sendSuggestions",
  async (data, thunkAPI) => {
    try {
      const response = await UsersService.sendSuggestions(data);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({
        status: error.status,
        message: error.message,
      });
    }
  },
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(userProfileAction.fulfilled, (state, action) => {
        state.userInfo = action.payload.userInfo;
      })
      .addCase(editUserInfoAction.fulfilled, (state, action) => {
        state.userInfo = {
          ...state.userInfo,
          ...action.payload.data,
        };
      })
      .addCase(editPlayerInfoAction.fulfilled, (state, action) => {
        state.userInfo = {
          ...state.userInfo,
          ...action.payload.data,
        };
      });
  },
});

const { reducer } = usersSlice;
export default reducer;
