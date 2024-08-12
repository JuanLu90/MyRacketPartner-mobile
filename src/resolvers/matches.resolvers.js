import { REACT_APP_API_URL } from "@env";
const API_URL = `${REACT_APP_API_URL}/api/matches`;

export const getMatchesUrl = () => `${API_URL}/matches`;
export const getMatchDetailsUrl = (matchId) =>
  `${API_URL}/matchDetails/${matchId}`;
export const getMatchDetailsHeadToHeadUrl = (data) =>
  `${API_URL}/matchDetails/headtohead/${data.user1Id}/${data.user2Id}`;
