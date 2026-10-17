import { createFileRoute, type SearchSchemaInput } from "@tanstack/react-router";
import { MovieListPage } from "../pages/movies/movie-list-page";

export const Route = createFileRoute("/")({
  validateSearch: (search: { page?: unknown } & SearchSchemaInput): { page: number } => {
    const page =
      typeof search.page === "number"
        ? search.page
        : typeof search.page === "string" && /^\d+$/.test(search.page)
          ? Number(search.page)
          : 1;

    return { page: Number.isSafeInteger(page) && page > 0 ? page : 1 };
  },
  component: MovieListPage,
});
