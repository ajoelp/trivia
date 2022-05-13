import { Outlet } from "react-router-dom";
import { NavBar } from "../../components/NavBar";

export default function Layout() {
  return (
    <div className="w-screen min-h-screen p-4 flex flex-col">
      <NavBar />
      <div className="flex-1 bg-white rounded-3xl p-10 shadow-xl">
        <Outlet />
      </div>
    </div>
  );
}
