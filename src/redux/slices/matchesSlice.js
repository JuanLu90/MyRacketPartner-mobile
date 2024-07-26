import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { matchesService } from "myracketpartner-commons";

const initialState = {
  matches: [],
};

export const matches = createAsyncThunk(
  "matches/matches",
  async (id, thunkAPI) => {
    try {
      const data = await matchesService.matches();

      const dataByMatchs = data.reduce((acc, curr) => {
        if (!acc[curr.matchID]) {
          acc[curr.matchID] = [];
        }
        acc[curr.matchID].push(curr);
        return acc;
      }, {});
      return { matches: dataByMatchs };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  },
);

export const matchDetailsAction = createAsyncThunk(
  "matches/matchDetails",
  async (matchId, thunkAPI) => {
    try {
      const data = await matchesService.matchDetails(matchId);

      return { matchDetails: data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  },
);

export const matchDetailsHeadToHeadAction = createAsyncThunk(
  "matches/matchDetailsHeadToHead",
  async (players, thunkAPI) => {
    try {
      const data = await matchesService.matchDetailsHeadToHead(players);
      return { matchDetailsHeadToHead: data };
    } catch (error) {
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
