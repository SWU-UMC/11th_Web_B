import { createFileRoute } from "@tanstack/react-router";
import { ProfileEditPage } from "../../../pages/mypage/profile-edit-page";

export const Route = createFileRoute("/(authenticated)/_auth/mypage/edit")({
  component: ProfileEditPage,
});
