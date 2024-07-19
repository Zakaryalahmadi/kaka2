import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    Accept: "application/json",
  },
});
