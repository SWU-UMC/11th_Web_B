import { useIsMutating, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { addFavorite, deleteFavorite, getFavorites, getFavoriteStatus } from "../api/favorites";
import { useAuthStore } from "../stores/auth-store";

export function useFavoritesQuery() {
  const accessToken = useAuthStore((state) => state.accessToken);
  return useQuery({
    queryKey: ["favorites", accessToken, "list"],
    queryFn: getFavorites,
    enabled: Boolean(accessToken),
    retry: false,
  });
}

export function useFavoriteStatusQuery(movieId: number) {
  const accessToken = useAuthStore((state) => state.accessToken);
  return useQuery({
    queryKey: ["favorites", accessToken, "status", movieId],
    queryFn: () => getFavoriteStatus(movieId),
    enabled: Boolean(accessToken) && Number.isSafeInteger(movieId) && movieId > 0,
    retry: false,
  });
}

export function useToggleFavorite() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutationKey = ["favorites", accessToken];
  const isPending = useIsMutating({ mutationKey }) > 0;
  const mutation = useMutation({
    mutationKey,
    mutationFn: async ({ movieId, isFavorite }: { movieId: number; isFavorite: boolean }) => {
      if (isFavorite) await deleteFavorite(movieId);
      else await addFavorite(movieId);
    },
    onSuccess: async (_, { movieId, isFavorite }) => {
      await queryClient.cancelQueries({ queryKey: ["favorites", accessToken, "status", movieId] });
      queryClient.setQueryData(["favorites", accessToken, "status", movieId], { isFavorite: !isFavorite });
      await queryClient.invalidateQueries({ queryKey: ["favorites", accessToken, "list"] });
    },
    onError: () => {
      alert("즐겨찾기 변경에 실패했어요. 다시 시도해 주세요.");
      void queryClient.invalidateQueries({ queryKey: ["favorites", accessToken] });
    },
  });

  const toggleFavorite = (movieId: number, isFavorite: boolean) => {
    if (!accessToken) {
      void navigate({ to: "/login" });
      return;
    }
    if (isPending || queryClient.isMutating({ mutationKey }) > 0) return;
    mutation.mutate({ movieId, isFavorite });
  };

  return { toggleFavorite, isPending };
}
