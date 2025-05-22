import { BitlyClient } from "bitly";
import dotenv from "dotenv";
dotenv.config();

const bitly = new BitlyClient(process.env.BITLY_ACCESS_TOKEN);

export const shortUrl = async (url) => {
  try {
    const response = await bitly.shorten(url);
    console.log(response);
    return response.link;
  } catch (error) {
    console.error("Error shortening URL:", error.message);
    return null;
  }
};

