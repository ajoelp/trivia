import { GamesTable } from "../../components/GamesTable";
import { Portal } from "../../components/Portal";
import { Link } from "../../components/Button";
import { routePath } from "../../router/router";
import { RouteNames } from "../../router/routes";

export default function DashboardScreen() {
  return (
    <>
      <Portal name="navbar-actions">
        <Link href={routePath(RouteNames.ADD_GAME)}>Add Game</Link>
      </Portal>
      <GamesTable />
    </>
  );
}
