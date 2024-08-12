import { REACT_APP_API_URL } from "@env";
const API_URL = `${REACT_APP_API_URL}/api/users`;

export const getUserProfileInfoUrl = (userId) =>
  `${API_URL}/userProfile/${userId}`;
