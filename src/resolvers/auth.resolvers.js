import { REACT_APP_API_URL } from "@env";
const API_URL = `${REACT_APP_API_URL}/api/auth`;

export const getLoginUrl = () => `${API_URL}/login`;
export const getRegistersUrl = () => `${API_URL}/register`;
export const getAuthGoogleUrl = () => `${API_URL}/google/`;
