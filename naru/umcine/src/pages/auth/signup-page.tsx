export function SignupPage() {
  return (
    <main className="flex w-full flex-1 items-center justify-center px-6 py-10">
      <form
        className="flex w-full max-w-[430px] flex-col gap-4"
        onSubmit={(event) => event.preventDefault()}
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
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
            />
            <button className="shrink-0 cursor-pointer bg-transparent p-0 text-xs leading-[14px] font-extrabold text-[#2563eb]" type="button">
              중복 확인
            </button>
          </div>
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
              type="text"
              autoComplete="nickname"
              placeholder="2–12자"
            />
            <button className="shrink-0 cursor-pointer bg-transparent p-0 text-xs leading-[14px] font-extrabold text-[#2563eb]" type="button">
              중복 확인
            </button>
          </div>
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
              type="password"
              autoComplete="new-password"
              placeholder="8자 이상"
              aria-describedby="signup-password-hint"
            />
          </div>
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
            type="password"
            autoComplete="new-password"
            placeholder="다시 입력"
          />
        </div>

        <button className="h-12 w-full cursor-pointer rounded-lg border! border-solid! border-white! bg-[#2563eb] px-4 text-sm font-extrabold text-white" type="submit">
          가입하기
        </button>
        <p className="m-0 flex items-end justify-center text-[13px] leading-4 text-[#606774]">
          이미 계정이 있나요?&nbsp;
          <a className="text-xs leading-[14px] font-extrabold text-[#2563eb] no-underline" href="/login">
            로그인
          </a>
        </p>
      </form>
    </main>
  );
}
