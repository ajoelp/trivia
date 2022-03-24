import { useAuth } from "../providers/AuthProvider";
import Gravatar from "react-gravatar";
import Dropdown, { DropdownOption } from "./Dropdown";
import { useCurrentRoute } from "../router/router";
import { Breadcrumbs } from "./Breadcrumbs";
import { PortalTarget } from "./Portal";

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
    <div className="flex items-center justify-between border-b border-zinc-600 p-4 w-full z-40 bg-zinc-800">
      <div className="flex gap-4 items-center">
        <Breadcrumbs />
      </div>
      <div className="flex ml-auto items-center gap-4">
        <PortalTarget name="navbar-actions" />
        <UserMenu />
      </div>
    </div>
  );
}
