import { Api, ContentType } from "./api";

const API_URL = import.meta.env.VITE_API_URL;

export const api = new Api({
  baseUrl: API_URL,
  headers: {
    "content-type": ContentType.Json,
  },
});
