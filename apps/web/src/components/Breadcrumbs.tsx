import { findRoute, routePath, useCurrentRoute } from "../router/router";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { RouteNames } from "../router/routes";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

export function Breadcrumbs() {
  const currentRoute = useCurrentRoute();
  const params = useParams();

  const breadcrumbs = useMemo<RouteNames[]>(() => {
    return [...(currentRoute?.breadcrumbs ?? []), currentRoute?.name].filter(Boolean) as RouteNames[];
  }, [currentRoute?.breadcrumbs, currentRoute?.name]);

  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      {breadcrumbs.map((route, index) => (
        <BreadcrumbItem key={index}>
          <BreadcrumbLink href={routePath(route, params)}>{findRoute(route)?.title ?? "No Name"}</BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
