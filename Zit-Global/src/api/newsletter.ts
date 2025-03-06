import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/subscribe"; // Base URL for the backend API

/**
 * Subscribe a user to the newsletter.
 * 
 * @param email - The email address to subscribe
 * @returns Promise with the API response
 */
export const subscribeToNewsletter = async (email: string): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}`, { email });
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Failed to subscribe");
  }
};
