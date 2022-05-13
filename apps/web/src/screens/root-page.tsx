import { Link, To } from "react-router-dom";
import { routePath } from "../router/router";
import { RouteNames } from "../router/routes";
import { motion } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { LoginRedirect } from "../services/LoginRedirect";

const LinkElement = motion(Link);

type LinkProps = {
  to: To;
  children: ReactNode;
};
export function BigLink(linkProps: LinkProps) {
  return (
    <LinkElement
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      {...linkProps}
      className="rounded-full p-10 flex w-full items-center justify-center text-xl font-bold text-black bg-white shadow-lg hover:bg-secondary-500 hover:text-white"
    />
  );
}

export default function RootPage() {
  useEffect(() => {
    const redirect = LoginRedirect.get();
    if (redirect) {
      LoginRedirect.clear();
      window.location.pathname = redirect;
    }
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-primary-500 text-center p-2">
      <h1 className="text-white text-8xl font-bold mb-8">OpenTrivia</h1>
      <div className="w-full max-w-xl flex flex-col gap-4">
        <BigLink to={routePath(RouteNames.GAME)}>Join Game</BigLink>
        <BigLink to={routePath(RouteNames.DASHBOARD)}>Create Game</BigLink>
        <BigLink to={routePath(RouteNames.WATCH)}>Watch Game</BigLink>
      </div>
    </div>
  );
}
