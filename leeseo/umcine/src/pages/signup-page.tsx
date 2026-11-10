
import { useState } from "react";
import type { FormEvent } from "react";

import { signup } from "../api/members/signup";
import { checkEmailDuplicate } from "../api/members/check-email-duplicate";
import { checkNicknameDuplicate } from "../api/members/check-nickname-duplicate";

// 중복 확인 기본 상태
const DEFAULT_DUPLICATE_CHECK = {
  isChecking: false,
  isAvailable: false,
};

type DuplicateCheckKey = "email" | "nickname";

// 이메일 형식 검사
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 영문 대소문자, 숫자, 특수문자를 모두 포함해 8자 이상
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

const DEFAULT_FORM = {
  email: "",
  nickname: "",
  password: "",
  passwordConfirm: "",
};

type DefaultFormKey = keyof typeof DEFAULT_FORM;
type DefaultFormValue = (typeof DEFAULT_FORM)[DefaultFormKey];

const SignupPage = () => {
  const [form, setForm] = useState(DEFAULT_FORM);

  const [duplicateCheck, setDuplicateCheck] = useState({
    email: { ...DEFAULT_DUPLICATE_CHECK },
    nickname: { ...DEFAULT_DUPLICATE_CHECK },
  });

  // 입력값 유효성 검사
  const isEmailValid = EMAIL_REGEX.test(form.email.trim());

  const isNicknameValid =
    form.nickname.trim().length >= 2 &&
    form.nickname.trim().length <= 12;

  const isPasswordValid = PASSWORD_REGEX.test(form.password);

  const isPasswordConfirmValid =
    form.passwordConfirm.length > 0 &&
    form.password === form.passwordConfirm;

  // 입력을 시작한 필드에만 오류 표시
  const showEmailError = form.email.length > 0 && !isEmailValid;

  const showNicknameError =
    form.nickname.length > 0 && !isNicknameValid;

  const showPasswordError =
    form.password.length > 0 && !isPasswordValid;

  const showPasswordConfirmError =
    form.passwordConfirm.length > 0 && !isPasswordConfirmValid;

  // 모든 입력값의 유효성 검사
  const isFormValid =
    isEmailValid &&
    isNicknameValid &&
    isPasswordValid &&
    isPasswordConfirmValid;

  // 입력 조건 + 이메일 및 닉네임 중복 확인 통과
  const canSubmit =
    isFormValid &&
    duplicateCheck.email.isAvailable &&
    duplicateCheck.nickname.isAvailable;

  // 입력값 변경
  const handleChangeField = (
    key: DefaultFormKey,
    value: DefaultFormValue
  ) => {
    if (key === "email" || key === "nickname") {
      if (duplicateCheck[key].isChecking) return;

      // 확인한 값을 변경하면 중복 확인 상태 초기화
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...DEFAULT_DUPLICATE_CHECK },
      }));
    }

    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // 이메일 및 닉네임 중복 확인
  const handleCheckDuplicate = async (key: DuplicateCheckKey) => {
    const isValid = key === "email" ? isEmailValid : isNicknameValid;

    if (!isValid || duplicateCheck[key].isChecking) return;

    const label = key === "email" ? "이메일" : "닉네임";

    setDuplicateCheck((prev) => ({
      ...prev,
      [key]: {
        isChecking: true,
        isAvailable: false,
      },
    }));

    try {
      const response =
        key === "email"
          ? await checkEmailDuplicate(form.email.trim())
          : await checkNicknameDuplicate(form.nickname.trim());

      const isAvailable = response.available;

      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isAvailable },
      }));

      alert(
        isAvailable
          ? `사용할 수 있는 ${label}이에요.`
          : `이미 사용 중인 ${label}이에요.`
      );
    } catch {
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isAvailable: false },
      }));

      alert("중복 확인에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isChecking: false },
      }));
    }
  };

const [isSubmitting, setIsSubmitting] = useState(false);
// const navigate = useNavigate();

const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await signup({
        email: form.email.trim(),
        nickname: form.nickname.trim(),
        password: form.password,
      });
      alert(response.message);
      // 로그인 페이지 연결 후 주석 해제
      // navigate({ to: "/login" });
    } catch {
      alert("회원가입에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 공통 스타일
  const inputClass =
    "w-full h-[42px] px-3 rounded-md border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 transition-colors";

  const labelClass =
    "mb-1.5 block text-xs font-semibold text-gray-900";

  const errorClass = "mt-1 text-[10px] text-red-500";

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="h-[76px] border-b border-gray-100 bg-white">
        <div className="mx-auto flex h-full max-w-[1100px] items-center justify-between px-5">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-9">
            <a href="/" className="flex items-center gap-2">
              <div className="flex h-[27px] w-[27px] items-center justify-center rounded-md border-2 border-gray-900">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 3v3M10 3v3M15 3v3M20 3v3" />
                  <rect x="3" y="6" width="18" height="15" rx="3" />
                </svg>
              </div>

              <span className="text-lg font-extrabold tracking-tight">
                UMCine
              </span>
            </a>

            <nav className="flex items-center gap-7 text-xs font-medium text-gray-600">
              <a href="/" className="hover:text-blue-600">
                영화
              </a>
              <a href="/search" className="hover:text-blue-600">
                검색
              </a>
              <a href="/mypage" className="hover:text-blue-600">
                내 정보
              </a>
            </nav>
          </div>

          {/* Header Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="검색"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>
            </button>

            <a
              href="/login"
              className="flex h-9 items-center justify-center rounded-lg bg-blue-600 px-4 text-xs font-semibold text-white hover:bg-blue-700"
            >
              로그인
            </a>
          </div>
        </div>
      </header>

      {/* Signup Content */}
      <main className="flex min-h-[calc(100vh-76px)] items-center justify-center bg-[#f5f6f8] px-5 py-12">
        <section className="w-full max-w-[368px]">
          <h1 className="mb-5 text-[28px] font-bold tracking-tight">
            회원가입
          </h1>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="mb-3.5">
              <label htmlFor="email" className={labelClass}>
                이메일
              </label>

              <div className="flex h-[42px] overflow-hidden rounded-md border border-gray-200 bg-white focus-within:border-blue-500">
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    handleChangeField("email", e.target.value)
                  }
                  placeholder="name@example.com"
                  className="min-w-0 flex-1 px-3 text-sm outline-none placeholder:text-gray-400"
                />

                <button
                  type="button"
                  disabled={
                    !isEmailValid || duplicateCheck.email.isChecking
                  }
                  onClick={() => handleCheckDuplicate("email")}
                  className="shrink-0 px-3 text-[11px] font-semibold text-blue-600 hover:text-blue-700 disabled:cursor-not-allowed disabled:text-gray-300"
                >
                  {duplicateCheck.email.isChecking
                    ? "확인 중..."
                    : "중복 확인"}
                </button>
              </div>

              {showEmailError && (
                <p className={errorClass}>
                  올바른 이메일 형식을 입력해 주세요.
                </p>
              )}
            </div>

            {/* Nickname */}
            <div className="mb-3.5">
              <label htmlFor="nickname" className={labelClass}>
                닉네임
              </label>

              <div className="flex h-[42px] overflow-hidden rounded-md border border-gray-200 bg-white focus-within:border-blue-500">
                <input
                  id="nickname"
                  type="text"
                  value={form.nickname}
                  onChange={(e) =>
                    handleChangeField("nickname", e.target.value)
                  }
                  placeholder="2-12자"
                  className="min-w-0 flex-1 px-3 text-sm outline-none placeholder:text-gray-400"
                />

                <button
                  type="button"
                  disabled={
                    !isNicknameValid ||
                    duplicateCheck.nickname.isChecking
                  }
                  onClick={() => handleCheckDuplicate("nickname")}
                  className="shrink-0 px-3 text-[11px] font-semibold text-blue-600 hover:text-blue-700 disabled:cursor-not-allowed disabled:text-gray-300"
                >
                  {duplicateCheck.nickname.isChecking
                    ? "확인 중..."
                    : "중복 확인"}
                </button>
              </div>

              {showNicknameError && (
                <p className={errorClass}>
                  닉네임은 2~12자로 입력해 주세요.
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-3.5">
              <label htmlFor="password" className={labelClass}>
                비밀번호
              </label>

              <input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) =>
                  handleChangeField("password", e.target.value)
                }
                placeholder="8자 이상"
                className={inputClass}
              />

              <p className="mt-1 text-[10px] text-gray-400">
                영문 대소문자, 숫자, 특수문자를 모두 포함해 8자 이상 입력해 주세요.
              </p>

              {showPasswordError && (
                <p className={errorClass}>
                  비밀번호 조건을 확인해 주세요.
                </p>
              )}
            </div>

            {/* Password Confirm */}
            <div className="mb-3.5">
              <label
                htmlFor="passwordConfirm"
                className={labelClass}
              >
                비밀번호 확인
              </label>

              <input
                id="passwordConfirm"
                type="password"
                value={form.passwordConfirm}
                onChange={(e) =>
                  handleChangeField(
                    "passwordConfirm",
                    e.target.value
                  )
                }
                placeholder="다시 입력"
                className={inputClass}
              />

              {showPasswordConfirmError && (
                <p className={errorClass}>
                  비밀번호가 일치하지 않습니다.
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="mt-0.5 h-10 w-full rounded-md bg-blue-600 text-xs font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {isSubmitting ? "가입 중" : "가입하기"}
            </button>

            {/* Login Link */}
            <p className="mt-3 text-center text-[11px] text-gray-500">
              이미 계정이 있나요?{" "}
              <a
                href="/login"
                className="font-semibold text-blue-600 hover:underline"
              >
                로그인
              </a>
            </p>
          </form>
        </section>
      </main>
    </div>
  );
};

export default SignupPage;
