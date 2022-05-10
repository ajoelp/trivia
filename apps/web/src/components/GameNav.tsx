import styled from "styled-components";
import { getSizing } from "../theme/helpers";
import { useMemo } from "react";
import Dropdown, { DropdownOption } from "./Dropdown";
import { SettingsIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { routePath } from "../router/router";
import { RouteNames } from "../router/routes";
import { useLocalStorage } from "usehooks-ts";

const Wrapper = styled.div`
  width: 100vw;
  padding: ${getSizing("spacing.4")};
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export function GameNav() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [teamId, setTeamId] = useLocalStorage("teamId", null);

  const dropdownOptions = useMemo<DropdownOption[]>(() => {
    return [
      !user && {
        type: "link",
        label: "Host Login",
        href: routePath(RouteNames.LOGIN, {}, { redirect: location.pathname }),
      },
      user && { type: "button", label: "Logout", onClick: logout },
      teamId && { type: "button", label: "Switch Team", onClick: () => setTeamId(null) },
    ].filter(Boolean) as DropdownOption[];
  }, [location.pathname, logout, user]);

  return (
    <Wrapper>
      <Dropdown options={dropdownOptions}>
        <SettingsIcon />
      </Dropdown>
    </Wrapper>
  );
}
