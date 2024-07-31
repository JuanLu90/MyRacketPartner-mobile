import { REACT_APP_API_URL } from "@env";
import {
  handleResponse,
  handleError,
  getRequestOptions,
} from "../utils/apiUtils";

const API_URL = `${REACT_APP_API_URL}/api/auth`;

async function login(user) {
  const requestOptions = getRequestOptions("POST", user);

  return await fetch(`${API_URL}/login`, requestOptions).then(
    handleResponse,
    handleError,
  );
}

async function register(data) {
  const requestOptions = getRequestOptions("POST", data);

  return await fetch(`${API_URL}/register`, requestOptions).then(
    handleResponse,
    handleError,
  );
}

async function authGoogle({ token }) {
  const requestOptions = getRequestOptions("POST", { token });

  return await fetch(`${API_URL}/google`, requestOptions).then(
    handleResponse,
    handleError,
  );
}

async function changePassword(data) {
  const requestOptions = getRequestOptions("POST", data);

  return await fetch(`${API_URL}/changepassword`, requestOptions).then(
    handleResponse,
    handleError,
  );
}

async function forgotPassword(email) {
  const requestOptions = getRequestOptions("POST");

  return await fetch(`${API_URL}/forgotpassword/${email}`, requestOptions).then(
    handleResponse,
    handleError,
  );
}

async function resetPassword({ userID, uuid, password }) {
  const requestOptions = getRequestOptions("POST", { password });

  return await fetch(
    `${API_URL}/resetpassword/${userID}/${uuid}`,
    requestOptions,
  ).then(handleResponse, handleError);
}

const authService = {
  login,
  register,
  authGoogle,
  changePassword,
  forgotPassword,
  resetPassword,
};

export default authService;
