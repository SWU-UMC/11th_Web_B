import { useRef, useState, type ChangeEvent, type SubmitEvent } from "react";

const DEFAULT_PROFILE = {
  nickname: "gs0428",
  email: "gwangsoo@cinemalab.kr",
};

export function ProfilePage() {
  const [nickname, setNickname] = useState(DEFAULT_PROFILE.nickname);
  const [profileImage, setProfileImage] = useState("");
  const imageInput = useRef<HTMLInputElement>(null);

  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type) || file.size > 5 * 1024 * 1024) {
      alert("5MB 이하의 JPG, PNG, WebP, GIF 이미지를 선택해 주세요.");
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (nickname.trim().length < 2 || nickname.trim().length > 12) {
      alert("닉네임은 2~12자로 입력해 주세요.");
      return;
    }
    setNickname(nickname.trim());
    alert("변경한 내용을 화면에 반영했어요. 서버 저장은 아직 연결되지 않았어요.");
  };

  return (
    <main className="flex w-full flex-1 flex-col gap-8 px-20 py-6 max-[1199px]:px-10 max-[683px]:px-6 max-[463px]:px-4">
      <div className="flex items-center justify-between gap-4 max-[463px]:flex-wrap">
        <div className="flex flex-col gap-[9px]">
          <h1 className="m-0 text-[31px] leading-[37px] font-bold tracking-[-1.24px]">내 정보 수정</h1>
          <p className="m-0 text-sm leading-[22.4px] text-[#606774]">닉네임과 프로필 이미지만 변경할 수 있어요.</p>
        </div>
        <button className="h-[42px] shrink-0 cursor-pointer rounded-lg border! border-solid! border-white! bg-[#2563eb] px-4 text-sm font-extrabold text-white" type="submit" form="profile-form">
          변경사항 저장
        </button>
      </div>

      <form id="profile-form" className="flex w-full items-center max-[683px]:flex-col max-[683px]:gap-6" onSubmit={handleSubmit}>
        <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 max-[683px]:w-full">
          <div className="relative">
            <span className="grid size-[82px] place-items-center overflow-hidden rounded-full bg-[#e3e6eb]">
              {profileImage ? (
                <img className="size-full object-cover" src={profileImage} alt="선택한 프로필" />
              ) : (
                <img className="block" src="/icons/profile-person.svg" alt="기본 프로필" />
              )}
            </span>
            <button className="absolute right-0 bottom-0 grid size-6 cursor-pointer place-items-center rounded-full border-2! border-solid! border-[#17191e]! bg-[#f6f7f9] p-0" type="button" aria-label="프로필 이미지 변경" onClick={() => imageInput.current?.click()}>
              <img className="block" src="/icons/profile-edit.svg" alt="" />
            </button>
          </div>
          <input ref={imageInput} className="hidden" type="file" accept="image/jpeg,image/png,image/webp,image/gif" aria-label="프로필 이미지 선택" onChange={handleChangeImage} />
          <span className="text-[15px] leading-[18px] font-bold">프로필 이미지</span>
          <span className="text-[11px] leading-[13px] text-[#969da8]">선택 사항 · 최대 5MB</span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-[17px] max-[683px]:w-full">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] leading-4 font-extrabold" htmlFor="profile-nickname">닉네임</label>
            <div className="flex min-h-[49px] items-center gap-2 rounded-lg border border-[#e3e6eb] bg-white px-[13px] py-[14px] focus-within:border-[#2563eb]">
              <input className="min-w-0 flex-1 bg-transparent px-0.5 text-sm leading-[19px] outline-none" id="profile-nickname" name="nickname" autoComplete="nickname" value={nickname} onChange={(event) => setNickname(event.target.value)} />
              <button className="shrink-0 cursor-pointer bg-transparent p-0 text-xs font-extrabold text-[#2563eb]" type="button" onClick={() => alert("닉네임 중복 확인은 내 정보 API 연동 시 연결할 예정이에요.")}>중복 확인</button>
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-px">
            <label className="text-[13px] leading-4 font-extrabold" htmlFor="profile-email">이메일</label>
            <input className="min-h-[49px] w-full rounded-lg border border-[#e3e6eb] bg-white px-[15px] py-[14px] text-sm leading-[19px] outline-none focus:border-[#2563eb]" id="profile-email" name="email" type="email" value={DEFAULT_PROFILE.email} readOnly />
          </div>
        </div>
      </form>

      <section className="mt-auto flex items-center justify-between gap-4 rounded-[10px] border border-[#d92d20] bg-[#d92d20]/10 p-5 text-[#d92d20] max-[463px]:flex-wrap">
        <div className="flex flex-col gap-1">
          <h2 className="m-0 text-sm leading-[17px] font-bold">회원 탈퇴</h2>
          <p className="m-0 text-[11px] leading-[16.5px]">탈퇴하면 작성한 평점, 후기와 즐겨찾기가 모두 삭제되며 복구할 수 없습니다.</p>
        </div>
        <button className="h-[42px] shrink-0 cursor-pointer rounded-lg border! border-solid! border-[#d92d20]! bg-white px-4 text-sm font-extrabold" type="button" onClick={() => alert("회원 탈퇴 기능은 아직 연결되지 않았어요.")}>회원 탈퇴</button>
      </section>
    </main>
  );
}
