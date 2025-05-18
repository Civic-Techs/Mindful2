import {
  fetchHandler,
  getPostOptions,
  deleteOptions,
  basicFetchOptions,
} from "../utils/fetchingUtils";

const baseUrl = "/api/participants";

export const addParticipant = async ({ user_id, challenge_id }) => {
  return fetchHandler(`${baseUrl}`, getPostOptions({ user_id, challenge_id }));
};

export const getParticipantById = async (user_id) => {
  try {
    return fetchHandler(`${baseUrl}`, basicFetchOptions({ user_id }));
  } catch (error) {
    console.error("Error Fetching Participants", error);
    throw new Error(error.message || "an unexpected error occurred");
  }
};

export const getChallengeTitlesByUserId = async (user_id) => {
  try {
    const response = await fetch(`${baseUrl}/${user_id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch challenge titles");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching challenge titles:", error);
    throw error;
  }
};
