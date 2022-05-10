import { GamesTable } from "../../components/GamesTable";
import { Portal } from "../../components/Portal";
import { Link } from "../../components/Button";
import { routePath } from "../../router/router";
import { RouteNames } from "../../router/routes";
import { Button } from "@chakra-ui/react";

export default function DashboardScreen() {
  return (
    <>
      <Portal name="navbar-actions">
        <Button as={Link} size="sm" variant="ghost" href={routePath(RouteNames.ADD_GAME)}>
          Add Game
        </Button>
      </Portal>
      <GamesTable />
    </>
  );
}
