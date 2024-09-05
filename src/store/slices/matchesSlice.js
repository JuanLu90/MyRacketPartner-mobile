import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import matchesService from "services/matches.service";
import { setLoading } from "./loadingSlice";

const initialState = {
  matches: [],
};

export const matchesAction = createAsyncThunk(
  "matches/matches",
  async (id, thunkAPI) => {
    const { dispatch } = thunkAPI;

    try {
      dispatch(setLoading(true));
      const data = await matchesService.matches();

      dispatch(setLoading(false));
      return { matches: data };
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

export const newMatchAction = createAsyncThunk(
  "matches/newMatch",
  async (user, thunkAPI) => {
    try {
      const response = await matchesService.newMatch(user);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.status,
        message: error.message,
      });
    }
  },
);

export const editMatchAction = createAsyncThunk(
  "matches/editMatch",
  async (match, thunkAPI) => {
    try {
      // Filtrar sets vacíos
      const filteredSets = match.sets.filter(
        (set) => set.user1Score || set.user2Score,
      );

      // Crear una copia del objeto match con los sets filtrados
      const cleanedMatch = {
        ...match,
        sets: filteredSets,
      };

      // Enviar los datos filtrados al servicio
      const response = await matchesService.editMatch(cleanedMatch);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.status,
        message: error.message,
      });
    }
  },
);

const matchesSlice = createSlice({
  name: "matches",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(matchesAction.fulfilled, (state, action) => {
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
