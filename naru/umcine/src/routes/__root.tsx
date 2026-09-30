import { createRootRoute, Outlet } from "@tanstack/react-router";
import Header from "../components/layout/header";

export const Route = createRootRoute({
  component: () => (
    <div className="relative flex min-h-screen min-w-0 flex-col bg-[#f6f7f9]">
      <Header />
      <Outlet />
    </div>
  ),
});
