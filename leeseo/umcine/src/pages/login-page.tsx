
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { login } from "../api/members/login";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await login({
        email,
        password,
      });

      if (response.isSuccess) {
        localStorage.setItem(
          "accessToken",
          response.result.accessToken
        );

        localStorage.setItem(
          "refreshToken",
          response.result.refreshToken
        );

        navigate({ to: "/" });
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      setErrorMessage("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-91px)] items-center justify-center bg-[#F5F6F8] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[298px]"
      >
        <h1 className="mb-3 text-[22px] font-bold text-[#191919]">
          로그인
        </h1>

        {/* 이메일 */}
        <div className="mb-3">
          <label
            htmlFor="email"
            className="mb-1 block text-[12px] font-semibold text-[#191919]"
          >
            이메일
          </label>

          <div className="flex h-[35px] items-center gap-2 border border-[#E2E5EA] bg-white px-2.5">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              autoComplete="email"
              required
              className="h-full w-full bg-transparent text-[11px] text-[#191919] outline-none placeholder:text-[#9CA3AF]"
            />
          </div>
        </div>

        {/* 비밀번호 */}
        <div className="mb-3">
          <label
            htmlFor="password"
            className="mb-1 block text-[12px] font-semibold text-[#191919]"
          >
            비밀번호
          </label>

          <div className="flex h-[35px] items-center gap-2 border border-[#E2E5EA] bg-white px-2.5">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              autoComplete="current-password"
              required
              className="h-full w-full bg-transparent text-[11px] text-[#191919] outline-none placeholder:text-[#9CA3AF]"
            />
          </div>
        </div>

        {/* 에러 메시지 */}
        {errorMessage && (
          <p className="mb-2 text-[11px] text-red-500">
            {errorMessage}
          </p>
        )}

        {/* 로그인 버튼 */}
        <button
          type="submit"
          disabled={isLoading}
          className="h-[32px] w-full rounded-[5px] bg-[#2864EB] text-[11px] font-semibold text-white transition-colors hover:bg-[#1D4ED8] active:bg-[#1E40AF] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </button>

        {/* 회원가입 */}
        <p className="mt-4 text-center text-[10px] text-[#737B87]">
          처음이신가요?{" "}
          <Link
            to="/signup"
            className="font-semibold text-[#2864EB] hover:underline"
          >
            회원가입
          </Link>
        </p>
      </form>
    </main>
  );
}
