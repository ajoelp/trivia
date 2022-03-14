import { useAuth } from "../providers/AuthProvider";
import Gravatar from "react-gravatar";
import Dropdown, { DropdownOption } from "./Dropdown";

function UserMenu() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const options: DropdownOption[] = [{ type: "button", label: "Logout", onClick: logout }];

  return (
    <div>
      <Dropdown options={options}>
        <div className="flex items-center gap-2">
          <Gravatar email={user.email} alt={user.email} className="inline-block h-6 w-6 rounded-md" />
          {user.email}
        </div>
      </Dropdown>
    </div>
  );
}

export function NavBar() {
  return (
    <div className="flex items-center justify-between border-b border-gray-600 p-4 w-full z-40 bg-gray-800">
      <p className="font-bold text-lg uppercase">trivi</p>
      <UserMenu />
    </div>
  );
}
