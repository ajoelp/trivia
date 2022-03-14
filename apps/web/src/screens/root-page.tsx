import { Link } from "react-router-dom";
import { routePath } from "../router/router";
import { RouteNames } from "../router/routes";

export default function RootPage() {
  const buttonClasses = "border border-gray-600 rounded py-2 px-4 bg-gray-700 text-x";
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-4">
      <Link to={routePath(RouteNames.GAME)} className={buttonClasses}>
        Join Game
      </Link>
      <Link to={routePath(RouteNames.DASHBOARD)} className={buttonClasses}>
        Create Game
      </Link>
      <Link to={routePath(RouteNames.WATCH)} className={buttonClasses}>
        Watch Game
      </Link>
    </div>
  );
}
