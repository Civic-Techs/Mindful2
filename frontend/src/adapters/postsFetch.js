import { fetchHandler } from '../utils/fetchingUtils';

const baseUrl = '/api/challenges';

export const allPosts = async () => {
  try {
    return fetchHandler(`${baseUrl}/posts`);
  } catch (e) {
    console.error('Error Fetching Posts', e);
    throw new Error(e.message || 'an unexpected error occurred');
  }
};

export const getPostId = async (id) => {
  try {
    return fetchHandler(`${baseUrl}/posts/${id}`);
  } catch (e) {
    console.error('Error Fetching by ID', e);
    throw new Error(e.message || 'an unexpected error occurred');
  }
};
