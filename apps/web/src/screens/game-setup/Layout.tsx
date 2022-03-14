import { Outlet } from "react-router-dom";
import { NavBar } from "../../components/NavBar";

export default function Layout() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <NavBar />
      <Outlet />
    </div>
  );
}
