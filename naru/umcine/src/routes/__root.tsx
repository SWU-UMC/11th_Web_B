import { createRootRoute, Outlet } from "@tanstack/react-router";
import "../App.css";
import Header from "../components/layout/header";

export const Route = createRootRoute({
  component: () => (
    <div className="app-shell">
      <Header />
      <Outlet />
    </div>
  ),
});
