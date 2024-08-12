import { getUserProfileInfoUrl } from "../resolvers/users.resolvers";
import {
  handleResponse,
  handleError,
  getRequestOptions,
} from "../utils/apiUtils";

async function userProfileInfo(userId) {
  const requestOptions = getRequestOptions("GET");

  return await fetch(getUserProfileInfoUrl(userId), requestOptions).then(
    handleResponse,
    handleError,
  );
}

// async function editUserProfileInfo(data) {
//   const requestOptions = getRequestOptions("PUT", data);

//   return await fetch(
//     `${API_URL}/currentUserProfile/editUserProfile`,
//     requestOptions
//   ).then(handleResponse, handleError);
// }

// async function editPlayerProfileInfo(data) {
//   const requestOptions = getRequestOptions("PUT", data);

//   return await fetch(
//     `${API_URL}/currentUserProfile/editPlayerProfile`,
//     requestOptions
//   ).then(handleResponse, handleError);
// }

// async function sendSuggestions(data) {
//   const requestOptions = getRequestOptions("POST", data);

//   return await fetch(`${API_URL}/sendSuggestions`, requestOptions).then(
//     handleResponse,
//     handleError
//   );
// }

const matchesService = {
  userProfileInfo,
  // editUserProfileInfo,
  // editPlayerProfileInfo,
  // sendSuggestions,
};

export default matchesService;
