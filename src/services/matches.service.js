import { REACT_APP_API_URL } from "@env";

import {
  handleResponse,
  handleError,
  getRequestOptions,
} from "../utils/apiUtils";

const API_URL = `${REACT_APP_API_URL}/api/matches`;

async function matches() {
  const requestOptions = getRequestOptions("GET");

  return await fetch(`${API_URL}/matches`, requestOptions).then(
    handleResponse,
    handleError,
  );
}

async function matchDetails(matchId) {
  const requestOptions = getRequestOptions("GET");

  return await fetch(`${API_URL}/matchDetails/${matchId}`, requestOptions).then(
    handleResponse,
    handleError,
  );
}

const matchesService = {
  matches,
  matchDetails,
};

export default matchesService;
