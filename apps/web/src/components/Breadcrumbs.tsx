import { findRoute, routePath, useCurrentRoute } from "../router/router";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/solid";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { RouteNames } from "../router/routes";
import { classNames } from "../services/utils";

export function Breadcrumbs() {
  const currentRoute = useCurrentRoute();
  const params = useParams();

  const breadcrumbs = useMemo<RouteNames[]>(() => {
    return [...(currentRoute?.breadcrumbs ?? []), currentRoute?.name].filter(Boolean) as RouteNames[];
  }, [currentRoute?.breadcrumbs, currentRoute?.name]);

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4 border py-2 px-4 rounded-lg border-gray-600">
        <li>
          <div>
            <a href="/" className="text-gray-400 hover:text-white">
              <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        {breadcrumbs.map((route) => {
          const isCurrentRoute = route === currentRoute?.name;
          return (
            <li key={route}>
              <div className="flex items-center">
                <ChevronRightIcon className={classNames("flex-shrink-0 h-5 w-5 text-gray-400")} aria-hidden="true" />
                <a
                  href={routePath(route, params)}
                  className={classNames(
                    "ml-4 text-sm font-medium ",
                    isCurrentRoute ? "text-white" : "text-gray-500 hover:text-white",
                  )}
                >
                  {findRoute(route)?.title ?? "No Name"}
                </a>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
