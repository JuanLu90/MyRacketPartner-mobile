import {
  handleResponse,
  handleError,
  getRequestOptions,
} from "../utils/apiUtils";

import {
  getMatchesUrl,
  getMatchDetailsUrl,
  getMatchDetailsHeadToHeadUrl,
} from "../resolvers/matches.resolvers";

async function matches() {
  const requestOptions = await getRequestOptions("GET");

  return await fetch(getMatchesUrl(), requestOptions).then(
    handleResponse,
    handleError,
  );
}

async function matchDetails(matchId) {
  const requestOptions = await getRequestOptions("GET");

  return await fetch(getMatchDetailsUrl(matchId), requestOptions).then(
    handleResponse,
    handleError,
  );
}

async function matchDetailsHeadToHead(data) {
  const requestOptions = await getRequestOptions("GET");

  return await fetch(getMatchDetailsHeadToHeadUrl(data), requestOptions).then(
    handleResponse,
    handleError,
  );
}

const matchesService = {
  matches,
  matchDetails,
  matchDetailsHeadToHead,
};

export default matchesService;
