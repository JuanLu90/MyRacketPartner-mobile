import AsyncStorage from "@react-native-async-storage/async-storage";

// This methods is responsible for handling the API response
export async function handleResponse(response) {
  if (response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json(); // If it's valid JSON, parse it
    } else {
      // If it's not JSON, assume it's a token or another type of response
      return response.text();
    }
  }

  if (response.status === 400) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = await response.text();
    throw new Error(error);
  }

  if (response.status === 401) {
    // Pass the pathname and  then to redirect
    // localStorage.clear();

    // deleteToken();
    // history.push('/Login');
    const error = await response.text();
    const customError = new Error(error);

    customError.status = response.status;
    // throw new Error("Your session has expired. Please log in.");
    throw customError;
  }

  if (response.status === 403) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = await response.text();
    throw new Error(error);
  }

  if (response.status === 404) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = await response.text();
    throw new Error(error);
  }

  if (response.status === 409) {
    // Pass the pathname and  then to redirect
    //  localStorage.clear();

    const error = await response.text();
    throw new Error(error);
  }

  if (response.status === 429) {
    // Pass the pathname and  then to redirect
    // localStorage.clear();

    const error = await response.text();
    throw new Error(error);
  }

  if (response.status === 500) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = await response.text();
    throw new Error(error);
  }

  if (response.status === 503) {
    throw new Error(
      "Sorry we are doing some maintenance. Please check back soon.",
    );
  }

  throw new Error("Network response was not ok.");
}

// In a real app, would likely call an error logging service.
export function handleError(error) {
  // eslint-disable-next-line no-console
  console.error("API call failed. " + error);
  throw error;
}

export const getTokenLocalStorage = async () => {
  try {
    return await AsyncStorage.getItem("token");
  } catch (error) {
    console.error("Failed to retrieve token from local storage", error);
    return null;
  }
};

export const getRequestOptions = async (method, body) => {
  const token = await getTokenLocalStorage();

  return {
    method: method,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    body: body ? JSON.stringify(body) : undefined,
  };
};
