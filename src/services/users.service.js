import {
  getSendSuggestionsUrl,
  getUserProfileInfoUrl,
  getEditUserProfileInfo,
  getUsersSearch,
} from "resolvers/users.resolvers";
import { handleResponse, handleError, getRequestOptions } from "utils/apiUtils";

async function userProfileInfo(userId) {
  const requestOptions = await getRequestOptions("GET");

  return await fetch(getUserProfileInfoUrl(userId), requestOptions).then(
    handleResponse,
    handleError,
  );
}

async function editUserProfileInfo(data) {
  const requestOptions = await getRequestOptions("PUT", data);
  return await fetch(getEditUserProfileInfo(), requestOptions)
    .then(handleResponse)
    .catch((error) => {
      handleError(error);
    });
}

// async function editPlayerProfileInfo(data) {
//   const requestOptions = await getRequestOptions("PUT", data);

//   return await fetch(
//     `${API_URL}/currentUserProfile/editPlayerProfile`,
//     requestOptions
//   ).then(handleResponse, handleError);
// }

async function sendSuggestions(data) {
  const requestOptions = await getRequestOptions("POST", data);
  return await fetch(getSendSuggestionsUrl(), requestOptions).then(
    handleResponse,
    handleError,
  );
}

async function usersSearch(value) {
  const requestOptions = await getRequestOptions("GET");

  return await fetch(getUsersSearch(value), requestOptions).then(
    handleResponse,
    handleError,
  );
}

const matchesService = {
  userProfileInfo,
  editUserProfileInfo,
  // editPlayerProfileInfo,
  sendSuggestions,
  usersSearch,
};

export default matchesService;
