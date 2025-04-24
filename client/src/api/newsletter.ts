import axios from "axios";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const API_BASE_URL = `${VITE_BACKEND_URL}/api/subscribe`;

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
