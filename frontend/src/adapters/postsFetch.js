import {
  fetchHandler,
  getPostOptions,
  deleteOptions,
} from "../utils/fetchingUtils";

const baseUrl = "/api/challenges";

export const createPost = async (id, postData) => {
  return await fetchHandler(`${baseUrl}/${id}/posts`, getPostOptions(postData));
};

export const allPosts = async () => {
  return await fetchHandler(`${baseUrl}/posts`);
};

export const getPostId = async (id) => {
  return fetchHandler(`${baseUrl}/posts/${id}`);
};

export const getPostsByChallengeId = async (challengeId) => {
  return fetchHandler(`${baseUrl}/${challengeId}/posts`);
};

export const deletePost = async (id) => {
  const url = `${baseUrl}/posts/${id}`;
  return await fetchHandler(url, deleteOptions);
};
