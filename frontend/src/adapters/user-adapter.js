// These functions all take in a body and return an options object
// with the provided body and the remaining options
import {
  fetchHandler,
  getPatchOptions,
  basicFetchOptions,
} from "../utils/fetchingUtils";

const baseUrl = "/api/users";

export const getAllUsers = async () => {
  return await fetchHandler(baseUrl);
};

export const getUser = async (id) => {
  return fetchHandler(`${baseUrl}/${id}`);
};

export const updateUsername = async ({ id, username, bio }) => {
  return fetchHandler(
    `${baseUrl}/${id}`,
    getPatchOptions({ id, username, bio })
  );
};

export const getUserById = async (user_id) => {
  const url = `/api/users/${user_id}`; // Adjust the endpoint based on your backend
  return await fetchHandler(url, basicFetchOptions);
};
