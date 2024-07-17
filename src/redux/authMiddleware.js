// authMiddleware.js
// import { tokenExpired } from "./slices/authSlice";

const authMiddleware = (store) => (next) => (action) => {
  if (action.error && action.payload && action.payload.status === 401) {
    // Despacha la acción para indicar la redirección
    // store.dispatch(tokenExpired("Your session has expired. Please log in")); // También podrías desencadenar la acción de cierre de sesión aquí
  }
  return next(action);
};

export default authMiddleware;
