import { Outlet } from "react-router-dom";

export default function GameLayout() {
  return (
    <div className="w-screen min-h-screen flex flex-col text-white">
      <Outlet />
    </div>
  );
}
