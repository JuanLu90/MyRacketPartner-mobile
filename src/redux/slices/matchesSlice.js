import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MatchesService from "../../services/matches.service";

const initialState = {
  matches: [],
};

export const matches = createAsyncThunk(
  "matches/matches",
  async (id, thunkAPI) => {
    try {
      const data = await MatchesService.matches();

      // const data = [
      //   {
      //     matchID: 1,
      //     matchDate: "2023-09-05 00:00:00",
      //     player1ID: 1,
      //     player1Name: "Juanlu",
      //     player2ID: 2,
      //     player2Name: "Pepelu",
      //     setID: 1,
      //     player1Score: 6,
      //     player2Score: 4,
      //     winnerID: 1,
      //   },
      //   {
      //     matchID: 1,
      //     matchDate: "2023-09-05 00:00:00",
      //     player1ID: 1,
      //     player1Name: "Juanlu",
      //     player2ID: 2,
      //     player2Name: "Pepelu",
      //     setID: 2,
      //     player1Score: 3,
      //     player2Score: 6,
      //     winnerID: 2,
      //   },
      //   {
      //     matchID: 1,
      //     matchDate: "2023-09-05 00:00:00",
      //     player1ID: 1,
      //     player1Name: "Juanlu",
      //     player2ID: 2,
      //     player2Name: "Pepelu",
      //     setID: 3,
      //     player1Score: 7,
      //     player2Score: 5,
      //     winnerID: 1,
      //   },
      //   {
      //     matchID: 2,
      //     matchDate: "2023-08-15 00:00:00",
      //     player1ID: 1,
      //     player1Name: "Juanlu",
      //     player2ID: 2,
      //     player2Name: "Pepelu",
      //     setID: 4,
      //     player1Score: 6,
      //     player2Score: 3,
      //     winnerID: 1,
      //   },
      //   {
      //     matchID: 2,
      //     matchDate: "2023-08-15 00:00:00",
      //     player1ID: 1,
      //     player1Name: "Juanlu",
      //     player2ID: 2,
      //     player2Name: "Pepelu",
      //     setID: 5,
      //     player1Score: 7,
      //     player2Score: 6,
      //     winnerID: 1,
      //   },
      //   {
      //     matchID: 3,
      //     matchDate: "2023-10-26 00:00:00",
      //     player1ID: 1,
      //     player1Name: "Juanlu",
      //     player2ID: 3,
      //     player2Name: "Alberto",
      //     setID: 6,
      //     player1Score: 6,
      //     player2Score: 4,
      //     winnerID: 3,
      //   },
      //   {
      //     matchID: 3,
      //     matchDate: "2023-10-26 00:00:00",
      //     player1ID: 1,
      //     player1Name: "Juanlu",
      //     player2ID: 3,
      //     player2Name: "Alberto",
      //     setID: 7,
      //     player1Score: 7,
      //     player2Score: 5,
      //     winnerID: 3,
      //   },
      //   {
      //     matchID: 4,
      //     matchDate: "2023-10-09 00:00:00",
      //     player1ID: 3,
      //     player1Name: "Alberto",
      //     player2ID: 1,
      //     player2Name: "Juanlu",
      //     setID: 10,
      //     player1Score: 1,
      //     player2Score: 6,
      //     winnerID: 3,
      //   },
      //   {
      //     matchID: 4,
      //     matchDate: "2023-10-09 00:00:00",
      //     player1ID: 3,
      //     player1Name: "Alberto",
      //     player2ID: 1,
      //     player2Name: "Juanlu",
      //     setID: 11,
      //     player1Score: 6,
      //     player2Score: 4,
      //     winnerID: 1,
      //   },
      //   {
      //     matchID: 4,
      //     matchDate: "2023-10-09 00:00:00",
      //     player1ID: 3,
      //     player1Name: "Alberto",
      //     player2ID: 1,
      //     player2Name: "Juanlu",
      //     setID: 12,
      //     player1Score: 3,
      //     player2Score: 6,
      //     winnerID: 3,
      //   },
      //   {
      //     matchID: 5,
      //     matchDate: "2023-10-09 00:00:00",
      //     player1ID: 4,
      //     player1Name: "Pepito",
      //     player2ID: 3,
      //     player2Name: "Alberto",
      //     setID: 13,
      //     player1Score: 6,
      //     player2Score: 4,
      //     winnerID: 4,
      //   },
      //   {
      //     matchID: 5,
      //     matchDate: "2023-10-09 00:00:00",
      //     player1ID: 4,
      //     player1Name: "Pepito",
      //     player2ID: 3,
      //     player2Name: "Alberto",
      //     setID: 14,
      //     player1Score: 3,
      //     player2Score: 6,
      //     winnerID: 3,
      //   },
      //   {
      //     matchID: 5,
      //     matchDate: "2023-10-09 00:00:00",
      //     player1ID: 4,
      //     player1Name: "Pepito",
      //     player2ID: 3,
      //     player2Name: "Alberto",
      //     setID: 15,
      //     player1Score: 6,
      //     player2Score: 1,
      //     winnerID: 4,
      //   },
      //   {
      //     matchID: 6,
      //     matchDate: "2023-10-09 00:00:00",
      //     player1ID: 5,
      //     player1Name: "Mafioso",
      //     player2ID: 4,
      //     player2Name: "Pepito",
      //     setID: 16,
      //     player1Score: 7,
      //     player2Score: 6,
      //     winnerID: 5,
      //   },
      //   {
      //     matchID: 6,
      //     matchDate: "2023-10-09 00:00:00",
      //     player1ID: 5,
      //     player1Name: "Mafioso",
      //     player2ID: 4,
      //     player2Name: "Pepito",
      //     setID: 17,
      //     player1Score: 6,
      //     player2Score: 3,
      //     winnerID: 5,
      //   },
      //   {
      //     matchID: 7,
      //     matchDate: "2023-09-05 00:00:00",
      //     player1ID: 1,
      //     player1Name: "Juanlu",
      //     player2ID: 5,
      //     player2Name: "Mafioso",
      //     setID: 18,
      //     player1Score: 6,
      //     player2Score: 1,
      //     winnerID: 1,
      //   },
      //   {
      //     matchID: 7,
      //     matchDate: "2023-09-05 00:00:00",
      //     player1ID: 1,
      //     player1Name: "Juanlu",
      //     player2ID: 5,
      //     player2Name: "Mafioso",
      //     setID: 19,
      //     player1Score: 6,
      //     player2Score: 4,
      //     winnerID: 1,
      //   },
      //   {
      //     matchID: 14,
      //     matchDate: "2023-10-09 00:00:00",
      //     player1ID: 1,
      //     player1Name: "Juanlu",
      //     player2ID: 5,
      //     player2Name: "Mafioso",
      //     setID: 28,
      //     player1Score: 6,
      //     player2Score: 2,
      //     winnerID: 1,
      //   },
      //   {
      //     matchID: 14,
      //     matchDate: "2023-10-09 00:00:00",
      //     player1ID: 1,
      //     player1Name: "Juanlu",
      //     player2ID: 5,
      //     player2Name: "Mafioso",
      //     setID: 29,
      //     player1Score: 4,
      //     player2Score: 6,
      //     winnerID: 5,
      //   },
      //   {
      //     matchID: 14,
      //     matchDate: "2023-10-09 00:00:00",
      //     player1ID: 1,
      //     player1Name: "Juanlu",
      //     player2ID: 5,
      //     player2Name: "Mafioso",
      //     setID: 30,
      //     player1Score: 7,
      //     player2Score: 6,
      //     winnerID: 1,
      //   },
      //   {
      //     matchID: 15,
      //     matchDate: "2023-10-09 00:00:00",
      //     player1ID: 3,
      //     player1Name: "Alberto",
      //     player2ID: 4,
      //     player2Name: "Pepito",
      //     setID: 31,
      //     player1Score: 4,
      //     player2Score: 6,
      //     winnerID: 4,
      //   },
      //   {
      //     matchID: 15,
      //     matchDate: "2023-10-09 00:00:00",
      //     player1ID: 3,
      //     player1Name: "Alberto",
      //     player2ID: 4,
      //     player2Name: "Pepito",
      //     setID: 32,
      //     player1Score: 2,
      //     player2Score: 6,
      //     winnerID: 4,
      //   },
      //   {
      //     matchID: 16,
      //     matchDate: "2023-10-09 00:00:00",
      //     player1ID: 1,
      //     player1Name: "Juanlu",
      //     player2ID: 4,
      //     player2Name: "Pepito",
      //     setID: 33,
      //     player1Score: 6,
      //     player2Score: 1,
      //     winnerID: 1,
      //   },
      //   {
      //     matchID: 16,
      //     matchDate: "2023-10-09 00:00:00",
      //     player1ID: 1,
      //     player1Name: "Juanlu",
      //     player2ID: 4,
      //     player2Name: "Pepito",
      //     setID: 34,
      //     player1Score: 6,
      //     player2Score: 1,
      //     winnerID: 1,
      //   },
      //   {
      //     matchID: 18,
      //     matchDate: "2023-10-09 00:00:00",
      //     player1ID: 1,
      //     player1Name: "Juanlu",
      //     player2ID: 4,
      //     player2Name: "Pepito",
      //     setID: 35,
      //     player1Score: 7,
      //     player2Score: 6,
      //     winnerID: 1,
      //   },
      //   {
      //     matchID: 18,
      //     matchDate: "2023-10-09 00:00:00",
      //     player1ID: 1,
      //     player1Name: "Juanlu",
      //     player2ID: 4,
      //     player2Name: "Pepito",
      //     setID: 36,
      //     player1Score: 6,
      //     player2Score: 1,
      //     winnerID: 1,
      //   },
      //   {
      //     matchID: 23,
      //     matchDate: "2023-06-21 00:00:00",
      //     player1ID: 1,
      //     player1Name: "Juanlu",
      //     player2ID: 2,
      //     player2Name: "Pepelu",
      //     setID: 37,
      //     player1Score: 7,
      //     player2Score: 6,
      //     winnerID: 1,
      //   },
      //   {
      //     matchID: 23,
      //     matchDate: "2023-06-21 00:00:00",
      //     player1ID: 1,
      //     player1Name: "Juanlu",
      //     player2ID: 2,
      //     player2Name: "Pepelu",
      //     setID: 38,
      //     player1Score: 6,
      //     player2Score: 7,
      //     winnerID: 2,
      //   },
      //   {
      //     matchID: 23,
      //     matchDate: "2023-06-21 00:00:00",
      //     player1ID: 1,
      //     player1Name: "Juanlu",
      //     player2ID: 2,
      //     player2Name: "Pepelu",
      //     setID: 39,
      //     player1Score: 7,
      //     player2Score: 6,
      //     winnerID: 1,
      //   },
      //   {
      //     matchID: 24,
      //     matchDate: "2023-06-21 00:00:00",
      //     player1ID: 1,
      //     player1Name: "Juanlu",
      //     player2ID: 5,
      //     player2Name: "Mafioso",
      //     setID: 40,
      //     player1Score: 1,
      //     player2Score: 6,
      //     winnerID: 5,
      //   },
      //   {
      //     matchID: 24,
      //     matchDate: "2023-06-21 00:00:00",
      //     player1ID: 1,
      //     player1Name: "Juanlu",
      //     player2ID: 5,
      //     player2Name: "Mafioso",
      //     setID: 41,
      //     player1Score: 5,
      //     player2Score: 7,
      //     winnerID: 5,
      //   },
      //   {
      //     matchID: 645,
      //     matchDate: "2023-06-21 10:25:00",
      //     player1ID: 1,
      //     player1Name: "Juanlu",
      //     player2ID: 2,
      //     player2Name: "Pepelu",
      //     setID: 73,
      //     player1Score: 6,
      //     player2Score: 4,
      //     winnerID: 1,
      //   },
      //   {
      //     matchID: 645,
      //     matchDate: "2023-06-21 10:25:00",
      //     player1ID: 1,
      //     player1Name: "Juanlu",
      //     player2ID: 2,
      //     player2Name: "Pepelu",
      //     setID: 74,
      //     player1Score: 6,
      //     player2Score: 1,
      //     winnerID: 1,
      //   },
      //   {
      //     matchID: 646,
      //     matchDate: "2023-06-21 10:25:00",
      //     player1ID: 1,
      //     player1Name: "Juanlu",
      //     player2ID: 2,
      //     player2Name: "Pepelu",
      //     setID: 75,
      //     player1Score: 6,
      //     player2Score: 2,
      //     winnerID: 1,
      //   },
      //   {
      //     matchID: 646,
      //     matchDate: "2023-06-21 10:25:00",
      //     player1ID: 1,
      //     player1Name: "Juanlu",
      //     player2ID: 2,
      //     player2Name: "Pepelu",
      //     setID: 76,
      //     player1Score: 6,
      //     player2Score: 7,
      //     winnerID: 2,
      //   },
      //   {
      //     matchID: 646,
      //     matchDate: "2023-06-21 10:25:00",
      //     player1ID: 1,
      //     player1Name: "Juanlu",
      //     player2ID: 2,
      //     player2Name: "Pepelu",
      //     setID: 77,
      //     player1Score: 1,
      //     player2Score: 6,
      //     winnerID: 2,
      //   },
      // ];

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
      const data = await MatchesService.matchDetails(matchId);

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
      const data = await MatchesService.matchDetailsHeadToHead(players);
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
