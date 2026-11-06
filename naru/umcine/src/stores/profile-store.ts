import { create } from "zustand";

interface Profile {
  nickname: string;
  email: string;
  image: string;
}

interface ProfileStore {
  profile: Profile;
  updateProfile: (changes: Pick<Profile, "nickname" | "image">) => void;
}

// API 연동 전 화면 확인용 임시 데이터예요. 새로고침하면 초기화돼요.
export const useProfileStore = create<ProfileStore>((set) => ({
  profile: { nickname: "gs0428", email: "gwangsoo@cinemalab.kr", image: "" },
  updateProfile: (changes) => set((state) => ({ profile: { ...state.profile, ...changes } })),
}));
