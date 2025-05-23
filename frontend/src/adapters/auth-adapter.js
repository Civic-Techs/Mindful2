import {
  fetchHandler,
  getPostOptions,
  deleteOptions,
} from '../utils/fetchingUtils';

const baseUrl = '/api/auth';

export const registerUser = async ({
  name,
  dob,
  email,
  username,
  password,
}) => {
  return fetchHandler(
    `${baseUrl}/register`,
    getPostOptions({ name, dob, email, username, password })
  );
};

export const logUserIn = async ({ username, password }) => {
  return fetchHandler(
    `${baseUrl}/login`,
    getPostOptions({ username, password })
  );
};

export const logUserOut = async () => {
  return fetchHandler(`${baseUrl}/logout`, deleteOptions);
};

export const checkForLoggedInUser = async () => {
  return await fetchHandler(`${baseUrl}/me`);
};
