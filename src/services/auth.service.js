import { handleResponse, handleError, getRequestOptions } from "utils/apiUtils";

import {
  getAuthGoogleUrl,
  getLoginUrl,
  getRegistersUrl,
} from "resolvers/auth.resolvers";

async function login(user) {
  const requestOptions = await getRequestOptions("POST", user);

  return await fetch(getLoginUrl(), requestOptions).then(
    handleResponse,
    handleError,
  );
}

async function register(data) {
  const requestOptions = await getRequestOptions("POST", data);

  return await fetch(getRegistersUrl(), requestOptions).then(
    handleResponse,
    handleError,
  );
}

async function authGoogle({ token }) {
  const requestOptions = await getRequestOptions("POST", { token });

  return await fetch(getAuthGoogleUrl(), requestOptions).then(
    handleResponse,
    handleError,
  );
}

const authService = {
  login,
  register,
  authGoogle,
};

export default authService;
