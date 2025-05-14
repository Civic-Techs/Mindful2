import { fetchHandler } from "../utils/fetchingUtils";

const baseUrl = "/api";

export const allChallenges = async () => {
  try {
    return fetchHandler(`${baseUrl}/challenges`);
  } catch (e) {
    console.error("Error Fetching Challenges", e);
    throw new Error(e.message || "an unexpected error occurred");
  }
};

export const getChallengeId = async (id) => {
  try {
    return fetchHandler(`${baseUrl}/challenges/${id}`);
  } catch (e) {
    console.error("Error Fetching by Id", e);
    throw new Error(e.message || "an unexpected error occurred");
  }
};
