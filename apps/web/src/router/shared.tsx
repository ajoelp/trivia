import { RouteObject } from "react-router-dom";
import { LazyExoticComponent } from "react";

export interface RouteInstance<T = string> extends Omit<RouteObject, "children" | "element"> {
  children?: RouteInstance[];
  component: LazyExoticComponent<any>;
  name: T;
  title: string;
  auth?: boolean;
  breadcrumbs?: string[];
}
