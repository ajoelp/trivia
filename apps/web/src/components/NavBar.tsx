import { useAuth } from "../providers/AuthProvider";
import Gravatar from "react-gravatar";
import Dropdown, { DropdownOption } from "./Dropdown";
import { Breadcrumbs } from "./Breadcrumbs";
import { PortalTarget } from "./Portal";
import styled from "styled-components";
import { getSizing } from "../theme/helpers";

const UserMenuWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${getSizing("spacing.2")};
`;

const Avatar = styled(Gravatar)`
  display: inline-block;
  height: ${getSizing("spacing.6")};
  width: ${getSizing("spacing.6")};
  border-radius: ${getSizing("spacing.3")};
`;

function UserMenu() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const options: DropdownOption[] = [{ type: "button", label: "Logout", onClick: logout }];

  return (
    <div>
      <Dropdown options={options}>
        <UserMenuWrapper>
          <Avatar email={user.email} alt={user.email} />
          {user.email}
        </UserMenuWrapper>
      </Dropdown>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  padding: ${getSizing("spacing.4")};
`;

const ActionsWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${getSizing("spacing.4")};
`;

export function NavBar() {
  return (
    <Wrapper>
      <div className="flex gap-4 items-center">
        <Breadcrumbs />
      </div>
      <ActionsWrapper>
        <PortalTarget name="navbar-actions" />
        <UserMenu />
      </ActionsWrapper>
    </Wrapper>
  );
}
