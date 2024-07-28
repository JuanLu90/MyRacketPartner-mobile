import { REACT_APP_API_URL } from "@env";
import { matchesResolvers } from "myracketpartner-commons";

import {
  handleResponse,
  handleError,
  getRequestOptions,
} from "../utils/apiUtils";

const API_URL = `${REACT_APP_API_URL}/api`;

async function matches() {
  const requestOptions = getRequestOptions("GET");

  return await fetch(
    `${API_URL + matchesResolvers.getMatches()}`,
    requestOptions,
  ).then(handleResponse, handleError);
}

async function matchDetails(matchId) {
  const requestOptions = getRequestOptions("GET");

  return await fetch(
    `${API_URL + matchesResolvers.getMatchDetails(matchId)}`,
    requestOptions,
  ).then(handleResponse, handleError);
}

async function matchDetailsHeadToHead(players) {
  const requestOptions = getRequestOptions("GET");

  return await fetch(
    `${API_URL + matchesResolvers.getMatchDetailsHeadToHead(players)}`,
    requestOptions,
  ).then(handleResponse, handleError);
}

const matchesService = {
  matches,
  matchDetails,
  matchDetailsHeadToHead,
};

export default matchesService;
