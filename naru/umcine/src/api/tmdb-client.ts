import ky from "ky";
import { env } from "../config/env";

export const tmdbClient = ky.create({
  baseUrl: new URL("/3/", env.tmdbApiBaseUrl),
  headers: {
    Authorization: `Bearer ${env.tmdbAccessToken}`,
    accept: "application/json",
  },
  searchParams: {
    language: "ko-KR",
  },
});
