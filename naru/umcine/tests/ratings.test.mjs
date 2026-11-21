import assert from "node:assert/strict";
import { test } from "node:test";
import { createServer } from "vite";

test("평점 API의 페이지 조회, 저장·수정·삭제 및 토큰 회원 ID", async () => {
  const server = await createServer({ server: { middlewareMode: true, hmr: false } });
  const originalFetch = globalThis.fetch;
  const originalStorage = globalThis.localStorage;
  globalThis.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };
  let handler;
  globalThis.fetch = async (request) => handler(request);
  try {
    const api = await server.ssrLoadModule("/src/api/ratings.ts");
    const { getTokenMemberId } = await server.ssrLoadModule("/src/utils/token-member-id.ts");
    const token = (sub) => `header.${Buffer.from(JSON.stringify({ sub })).toString("base64url")}.signature`;
    assert.equal(getTokenMemberId(token("42")), 42);
    for (const invalid of ["broken", token("0"), token("-1"), token("1x"), token("9007199254740992")]) {
      assert.equal(getTokenMemberId(invalid), null);
    }

    const rating = { ratingId: 7, movieId: 550, score: 4, comment: "후기", createdAt: "2026-11-21", updatedAt: "2026-11-21" };
    const pages = [];
    handler = (request) => {
      const url = new URL(request.url);
      pages.push(Number(url.searchParams.get("page")));
      assert.equal(url.pathname, "/members/42/ratings");
      assert.equal(url.searchParams.get("size"), "100");
      return Response.json(pages.length === 1 ? Array.from({ length: 100 }, (_, index) => ({ ...rating, movieId: index + 1 })) : [rating]);
    };
    assert.deepEqual(await api.getMovieRating(42, 550), rating);
    assert.deepEqual(pages, [0, 1]);
    handler = () => Response.json([]);
    assert.equal(await api.getMovieRating(42, 999), null);

    const requests = [];
    handler = async (request) => {
      requests.push({ method: request.method, path: new URL(request.url).pathname, body: request.method === "DELETE" ? null : await request.json() });
      return Response.json({ isSuccess: true, result: request.method === "DELETE" ? null : rating });
    };
    const input = { score: 4, comment: "후기" };
    assert.deepEqual(await api.createRating(550, input), rating);
    assert.deepEqual(await api.updateRating(7, input), rating);
    assert.equal(await api.deleteRating(7), null);
    assert.deepEqual(requests, [
      { method: "POST", path: "/ratings", body: { movieId: 550, ...input } },
      { method: "PATCH", path: "/ratings/7", body: input },
      { method: "DELETE", path: "/ratings/7", body: null },
    ]);
    handler = () => Response.json({ message: "중복 평점" }, { status: 409 });
    await assert.rejects(api.createRating(550, input));
  } finally {
    globalThis.fetch = originalFetch;
    if (originalStorage === undefined) delete globalThis.localStorage;
    else globalThis.localStorage = originalStorage;
    await server.close();
  }
});
