import { useState, type SubmitEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { createRating, deleteRating, getMovieRating, updateRating, type Rating, type RatingInput } from "../../api/ratings";
import { useAuthStore } from "../../stores/auth-store";
import { getTokenMemberId } from "../../utils/token-member-id";

export function MovieRating({ movieId }: { movieId: number }) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const memberId = accessToken ? getTokenMemberId(accessToken) : null;
  const query = useQuery({
    queryKey: ["ratings", memberId, movieId],
    queryFn: () => getMovieRating(memberId!, movieId),
    enabled: memberId !== null,
    retry: false,
  });

  if (!accessToken) return <p>평점을 남기려면 <Link to="/login">로그인</Link>해 주세요.</p>;
  if (memberId === null) return <p role="alert">로그인 정보를 확인할 수 없어요. 다시 로그인해 주세요.</p>;
  if (query.isError) return <div><p role="alert">내 평점을 불러오지 못했어요.</p><button type="button" disabled={query.isFetching} onClick={() => void query.refetch()}>다시 시도</button></div>;
  if (query.data === undefined) return <p role="status">내 평점을 불러오는 중이에요.</p>;

  return <RatingForm key={`${memberId}:${movieId}:${query.data?.ratingId ?? "new"}:${query.data?.updatedAt ?? ""}`} movieId={movieId} memberId={memberId} rating={query.data} />;
}

function RatingForm({ movieId, memberId, rating }: { movieId: number; memberId: number; rating: Rating | null }) {
  const [score, setScore] = useState(rating?.score ?? 0);
  const [comment, setComment] = useState(rating?.comment ?? "");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (action: { type: "save"; input: RatingInput } | { type: "delete" }) => {
      if (action.type === "delete") return deleteRating(rating!.ratingId);
      return rating ? updateRating(rating.ratingId, action.input) : createRating(movieId, action.input);
    },
    onSuccess: (result) => {
      queryClient.setQueryData(["ratings", memberId, movieId], result);
      alert(result ? "평점을 저장했어요." : "평점을 삭제했어요.");
    },
    onError: () => {
      alert("평점 변경에 실패했어요. 다시 시도해 주세요.");
    },
  });
  const canSubmit = score >= 1 && score <= 5 && comment.length <= 500;
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || mutation.isPending) return;
    mutation.mutate({ type: "save", input: { score, comment: comment.trim() || null } });
  };

  return (
    <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit}>
      <p className="m-0 text-xs text-[#969da8]">별점은 필수, 후기는 선택이에요.</p>
      <fieldset className="flex gap-1 border-0 p-0" disabled={mutation.isPending}>
        <legend className="sr-only">영화 별점</legend>
        {[1, 2, 3, 4, 5].map((value) => (
          <button className="grid size-[38px] cursor-pointer place-items-center rounded-lg border border-[#e3e6eb] bg-white" key={value} type="button" aria-label={`${value}점`} aria-pressed={score === value} onClick={() => setScore(value)}>
            <img className="size-6" src={value <= score ? "/icons/star.svg" : "/icons/star-outline.svg"} alt="" />
          </button>
        ))}
      </fieldset>
      <textarea className="h-[102px] w-full resize-none rounded-lg border border-[#e3e6eb] bg-white px-3 py-4 text-[13px]" aria-label="영화 후기" placeholder="영화를 보고 느낀 점을 남겨보세요." maxLength={500} value={comment} disabled={mutation.isPending} onChange={(event) => setComment(event.target.value)} />
      <p className="m-0 text-xs text-[#969da8]">{comment.length}/500</p>
      <button className="h-[42px] w-full rounded-lg bg-[#17191e] text-sm font-extrabold text-white disabled:opacity-50" type="submit" disabled={!canSubmit || mutation.isPending}>
        {mutation.isPending ? "처리 중" : rating ? "평점 수정" : "평점 저장"}
      </button>
      {rating && <button className="h-[42px] w-full rounded-lg border border-[#e3e6eb] bg-white text-sm" type="button" disabled={mutation.isPending} onClick={() => mutation.mutate({ type: "delete" })}>평점 삭제</button>}
    </form>
  );
}
