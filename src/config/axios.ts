import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://api.autobrokerai.com/api/v1"
      : "http://localhost:3001/api/v1",
  headers: {
    common: {
      Authorization: `Bearer ${
        localStorage.getItem("jwt")
          ? JSON.parse(localStorage.getItem("jwt")!).jwtToken
          : ""
      }`,
    },
  },
});
