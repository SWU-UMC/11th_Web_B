import { Link } from "@tanstack/react-router";
import { useState, type SubmitEvent } from "react";
import { useLoginMutation } from "../../hooks/use-login-mutation";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_FORM = { email: "", password: "" };

export function LoginPage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const loginMutation = useLoginMutation();
  const canSubmit = EMAIL_REGEX.test(form.email.trim()) && form.password.length > 0;

  const handleChangeField = (key: keyof typeof DEFAULT_FORM, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || loginMutation.isPending) return;

    loginMutation.mutate({
      email: form.email.trim(),
      password: form.password,
    });
  };

  return (
    <main className="flex w-full flex-1 items-center justify-center px-6 py-10">
      <form
        className="flex w-full max-w-[430px] flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h1 className="m-0 text-[34px] leading-[41px] font-bold tracking-[-1.53px]">
          로그인
        </h1>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] leading-4 font-extrabold" htmlFor="login-email">
            이메일
          </label>
          <div className="flex min-h-[49px] items-center gap-1 rounded-lg border border-[#e3e6eb] bg-white px-[13px] py-[14px] focus-within:border-[#2563eb]">
            <img className="block shrink-0" src="/icons/login-mail.svg" alt="" />
            <input
              className="min-w-0 flex-1 bg-transparent px-0.5 text-sm leading-[19px] outline-none placeholder:text-[#969da8]"
              id="login-email"
              name="email"
              type="email"
              autoComplete="username"
              placeholder="name@example.com"
              value={form.email}
              onChange={(event) => handleChangeField("email", event.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] leading-4 font-extrabold" htmlFor="login-password">
            비밀번호
          </label>
          <div className="flex min-h-[49px] items-center gap-1 rounded-lg border border-[#e3e6eb] bg-white px-[13px] py-[14px] focus-within:border-[#2563eb]">
            <span className="relative block size-4 shrink-0" aria-hidden="true">
              <img className="absolute top-[0.6667px] left-[2.6667px] block" src="/icons/login-lock.svg" alt="" />
            </span>
            <input
              className="min-w-0 flex-1 bg-transparent px-0.5 text-sm leading-[19px] outline-none placeholder:text-[#969da8]"
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="비밀번호"
              value={form.password}
              onChange={(event) => handleChangeField("password", event.target.value)}
            />
          </div>
        </div>

        <button
          className="h-12 w-full cursor-pointer rounded-lg border! border-solid! border-white! bg-[#2563eb] px-4 text-sm font-extrabold text-white"
          type="submit"
          disabled={!canSubmit || loginMutation.isPending}
        >
          {loginMutation.isPending ? "로그인 중" : "로그인"}
        </button>
        <p className="m-0 flex items-end justify-center pt-[5px] text-[13px] leading-4 text-[#606774]">
          처음이신가요?&nbsp;
          <Link className="text-xs leading-[14px] font-extrabold text-[#2563eb] no-underline" to="/signup">
            회원가입
          </Link>
        </p>
      </form>
    </main>
  );
}
