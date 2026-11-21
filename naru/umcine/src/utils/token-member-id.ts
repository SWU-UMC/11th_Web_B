// 조회할 회원 ID만 읽어요. 인증과 수정 권한 검증은 서버에서 처리해요.
export function getTokenMemberId(accessToken: string): number | null {
  try {
    const payload = accessToken.split(".")[1];
    if (!payload) return null;
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const { sub } = JSON.parse(atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "=")));
    if (typeof sub !== "string" || !/^\d+$/.test(sub)) return null;
    const memberId = Number(sub);
    return Number.isSafeInteger(memberId) && memberId > 0 ? memberId : null;
  } catch {
    return null;
  }
}
