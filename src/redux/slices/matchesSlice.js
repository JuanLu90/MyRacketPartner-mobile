import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import matchesService from "../../services/matches.service";
import { setLoading } from "./loadingSlice";

const initialState = {
  matches: [],
};

export const matches = createAsyncThunk(
  "matches/matches",
  async (id, thunkAPI) => {
    const { dispatch } = thunkAPI;

    try {
      dispatch(setLoading(true));
      const data = await matchesService.matches();

      const dataByMatchs = data.reduce((acc, curr) => {
        if (!acc[curr.matchID]) {
          acc[curr.matchID] = [];
        }
        acc[curr.matchID].push(curr);
        return acc;
      }, {});

      dispatch(setLoading(false));
      return { matches: dataByMatchs };
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  },
);

export const matchDetailsAction = createAsyncThunk(
  "matches/matchDetails",
  async (matchId, thunkAPI) => {
    const { dispatch } = thunkAPI;

    try {
      dispatch(setLoading(true));
      const data = await matchesService.matchDetails(matchId);

      dispatch(setLoading(false));
      return { matchDetails: data };
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  },
);

export const matchDetailsHeadToHeadAction = createAsyncThunk(
  "matches/matchDetailsHeadToHead",
  async (users, thunkAPI) => {
    const { dispatch } = thunkAPI;

    try {
      dispatch(setLoading(true));
      const data = await matchesService.matchDetailsHeadToHead(users);

      dispatch(setLoading(false));
      return { matchDetailsHeadToHead: data };
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  },
);

const matchesSlice = createSlice({
  name: "matches",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(matches.fulfilled, (state, action) => {
        state.matches = action.payload.matches;
      })
      .addCase(matchDetailsAction.fulfilled, (state, action) => {
        state.matchDetails = action.payload.matchDetails;
      })
      .addCase(matchDetailsHeadToHeadAction.fulfilled, (state, action) => {
        state.matchDetailsHeadToHead = action.payload.matchDetailsHeadToHead;
      });
  },
});

const { reducer } = matchesSlice;
export default reducer;
