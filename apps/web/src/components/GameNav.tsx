import { useMemo } from "react";
import Dropdown, { DropdownOption } from "./Dropdown";
import { useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { routePath } from "../router/router";
import { RouteNames } from "../router/routes";
import { CogIcon } from "@heroicons/react/solid";
import { useGameSocket } from "../providers/GameProvider";
import { useTeamId } from "../services/useTeamId";
import { Link } from "./Button";

export function GameNav() {
  const { game } = useGameSocket();
  const location = useLocation();
  const { user, logout } = useAuth();
  console.log(game?.code ?? "no game");

  const { teamId, setTeamId } = useTeamId();

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
  }, [location.pathname, logout, setTeamId, teamId, user]);

  return (
    <div className="w-screen p-4 flex items-center justify-end">
      {game?.isOwner && (
        <Link href={routePath(RouteNames.HOST, { code: game.code })} variant="secondary" size="md">
          Host Mode
        </Link>
      )}
      <Dropdown options={dropdownOptions}>
        <CogIcon className="w-5 h-5" />
      </Dropdown>
    </div>
  );
}
