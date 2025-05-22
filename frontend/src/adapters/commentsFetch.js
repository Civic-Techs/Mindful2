import {
  fetchHandler,
  getPostOptions,
  basicFetchOptions,
} from "../utils/fetchingUtils";

// Add a new comment
export const addComment = async ({ post_id, user_id, content }) => {
  const url = "/api/comments";
  const options = getPostOptions({ post_id, user_id, content });
  return await fetchHandler(url, options);
};

// Get comments by post ID
export const getCommentsByPostId = async (post_id) => {
  const url = `/api/comments/post/${post_id}`;
  return await fetchHandler(url, basicFetchOptions);
};

// Get all comments (optional, if needed)
export const getAllComments = async () => {
  const url = "/api/comments";
  return await fetchHandler(url, basicFetchOptions);
};
