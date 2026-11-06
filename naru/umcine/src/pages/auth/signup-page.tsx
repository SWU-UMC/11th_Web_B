import { Link } from "@tanstack/react-router";
import { useState, type SubmitEvent } from "react";
import { checkEmailDuplicate } from "../../api/members/check-email-duplicate";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate";
import { signup } from "../../api/members/signup";
// import { useNavigate } from "@tanstack/react-router";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

const DEFAULT_DUPLICATE_CHECK = {
  isChecking: false,
  isAvailable: false,
};
type DuplicateCheckKey = "email" | "nickname";

export function SignupPage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [duplicateCheck, setDuplicateCheck] = useState({
    email: DEFAULT_DUPLICATE_CHECK,
    nickname: DEFAULT_DUPLICATE_CHECK,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const navigate = useNavigate();

  const isEmailValid = EMAIL_REGEX.test(form.email.trim());
  const isNicknameValid =
    form.nickname.trim().length >= 2 && form.nickname.trim().length <= 12;
  const isPasswordValid = PASSWORD_REGEX.test(form.password);
  const isPasswordConfirmValid =
    form.passwordConfirm.length > 0 && form.password === form.passwordConfirm;

  const showEmailError = form.email.length > 0 && !isEmailValid;
  const showNicknameError = form.nickname.length > 0 && !isNicknameValid;
  const showPasswordError = form.password.length > 0 && !isPasswordValid;
  const showPasswordConfirmError =
    form.passwordConfirm.length > 0 && !isPasswordConfirmValid;

  const isFormValid =
    isEmailValid && isNicknameValid && isPasswordValid && isPasswordConfirmValid;
  const canSubmit =
    isFormValid &&
    duplicateCheck.email.isAvailable &&
    duplicateCheck.nickname.isAvailable;

  const handleChangeField = (key: DefaultFormKey, value: DefaultFormValue) => {
    if (key === "email" || key === "nickname") {
      if (duplicateCheck[key].isChecking) return;
      // 확인한 값을 바꾸면 다시 중복 확인해야 해요.
      setDuplicateCheck((prev) => ({ ...prev, [key]: DEFAULT_DUPLICATE_CHECK }));
    }
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckDuplicate = async (key: DuplicateCheckKey) => {
    const isValid = key === "email" ? isEmailValid : isNicknameValid;
    if (!isValid || duplicateCheck[key].isChecking) return;

    const label = key === "email" ? "이메일" : "닉네임";
    setDuplicateCheck((prev) => ({
      ...prev,
      [key]: { isChecking: true, isAvailable: false },
    }));
    try {
      const response = key === "email"
        ? await checkEmailDuplicate(form.email.trim())
        : await checkNicknameDuplicate(form.nickname.trim());
      const isAvailable = response.available;
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isAvailable },
      }));
      alert(isAvailable
        ? `사용할 수 있는 ${label}이에요.`
        : `이미 사용 중인 ${label}이에요.`);
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

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await signup({
        email: form.email.trim(),
        nickname: form.nickname.trim(),
        password: form.password,
      });
      alert(response.message);
      // 로그인 페이지 연결 후 사용해요.
      // navigate({ to: "/login" });
    } catch {
      alert("회원가입에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex w-full flex-1 items-center justify-center px-6 py-10">
      <form
        className="flex w-full max-w-[430px] flex-col gap-4"
        onSubmit={handleSubmit}
        noValidate
      >
        <h1 className="m-0 text-[34px] leading-[41px] font-bold tracking-[-1.53px]">
          회원가입
        </h1>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] leading-4 font-extrabold" htmlFor="signup-email">
            이메일
          </label>
          <div className="flex min-h-[49px] items-center gap-[9px] rounded-lg border border-[#e3e6eb] bg-white px-[13px] py-[14px] focus-within:border-[#2563eb]">
            <input
              className="min-w-0 flex-1 bg-transparent px-0.5 text-sm leading-[19px] outline-none placeholder:text-[#969da8]"
              id="signup-email"
              name="email"
              value={form.email}
              onChange={(event) => handleChangeField("email", event.target.value)}
              disabled={isSubmitting || duplicateCheck.email.isChecking}
              aria-invalid={showEmailError}
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
            />
            <button className="shrink-0 cursor-pointer bg-transparent p-0 text-xs leading-[14px] font-extrabold text-[#2563eb]" type="button" disabled={!isEmailValid || duplicateCheck.email.isChecking || isSubmitting} onClick={() => void handleCheckDuplicate("email")}>
              {duplicateCheck.email.isChecking ? "확인 중" : "중복 확인"}
            </button>
          </div>
          {showEmailError && <p className="m-0 text-xs text-red-600" role="alert">이메일 형식을 확인해 주세요.</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] leading-4 font-extrabold" htmlFor="signup-nickname">
            닉네임
          </label>
          <div className="flex min-h-[49px] items-center gap-[9px] rounded-lg border border-[#e3e6eb] bg-white px-[13px] py-[14px] focus-within:border-[#2563eb]">
            <input
              className="min-w-0 flex-1 bg-transparent px-0.5 text-sm leading-[19px] outline-none placeholder:text-[#969da8]"
              id="signup-nickname"
              name="nickname"
              value={form.nickname}
              onChange={(event) => handleChangeField("nickname", event.target.value)}
              disabled={isSubmitting || duplicateCheck.nickname.isChecking}
              aria-invalid={showNicknameError}
              type="text"
              autoComplete="nickname"
              placeholder="2–12자"
            />
            <button className="shrink-0 cursor-pointer bg-transparent p-0 text-xs leading-[14px] font-extrabold text-[#2563eb]" type="button" disabled={!isNicknameValid || duplicateCheck.nickname.isChecking || isSubmitting} onClick={() => void handleCheckDuplicate("nickname")}>
              {duplicateCheck.nickname.isChecking ? "확인 중" : "중복 확인"}
            </button>
          </div>
          {showNicknameError && <p className="m-0 text-xs text-red-600" role="alert">닉네임은 2~12자로 입력해 주세요.</p>}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] leading-4 font-extrabold" htmlFor="signup-password">
              비밀번호
            </label>
            <input
              className="min-h-[49px] w-full rounded-lg border border-[#e3e6eb] bg-white px-[15px] py-[14px] text-sm leading-[19px] outline-none placeholder:text-[#969da8] focus:border-[#2563eb]"
              id="signup-password"
              name="password"
              value={form.password}
              onChange={(event) => handleChangeField("password", event.target.value)}
              disabled={isSubmitting}
              aria-invalid={showPasswordError}
              type="password"
              autoComplete="new-password"
              placeholder="8자 이상"
              aria-describedby="signup-password-hint"
            />
          </div>
          {showPasswordError && <p className="m-0 text-xs text-red-600" role="alert">영문 대·소문자, 숫자, 특수문자(!@#$%^&*)를 포함해 8자 이상 입력해 주세요.</p>}
          <p className="m-0 text-[11px] leading-[13px] text-[#969da8]" id="signup-password-hint">
            영문 대·소문자, 숫자, 특수문자를 모두 포함해 8자 이상 입력해 주세요
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] leading-4 font-extrabold" htmlFor="signup-password-confirm">
            비밀번호 확인
          </label>
          <input
            className="min-h-[49px] w-full rounded-lg border border-[#e3e6eb] bg-white px-[15px] py-[14px] text-sm leading-[19px] outline-none placeholder:text-[#969da8] focus:border-[#2563eb]"
            id="signup-password-confirm"
            name="passwordConfirm"
              value={form.passwordConfirm}
              onChange={(event) => handleChangeField("passwordConfirm", event.target.value)}
              disabled={isSubmitting}
              aria-invalid={showPasswordConfirmError}
            type="password"
            autoComplete="new-password"
            placeholder="다시 입력"
          />
        </div>

        {showPasswordConfirmError && <p className="m-0 text-xs text-red-600" role="alert">비밀번호가 일치하지 않아요.</p>}
        <button disabled={!canSubmit || isSubmitting} className="h-12 disabled:cursor-not-allowed disabled:opacity-50 w-full cursor-pointer rounded-lg border! border-solid! border-white! bg-[#2563eb] px-4 text-sm font-extrabold text-white" type="submit">
          {isSubmitting ? "가입 중" : "가입하기"}
        </button>
        <p className="m-0 flex items-end justify-center text-[13px] leading-4 text-[#606774]">
          이미 계정이 있나요?&nbsp;
          <Link className="text-xs leading-[14px] font-extrabold text-[#2563eb] no-underline" to="/login">
            로그인
          </Link>
        </p>
      </form>
    </main>
  );
}
