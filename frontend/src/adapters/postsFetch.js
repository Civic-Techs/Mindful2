import { fetchHandler, getPostOptions } from '../utils/fetchingUtils';

const baseUrl = '/api/challenges';

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
