import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const portals: Record<string, Element> = {};

interface PortalProps {
  name: string;
  children: ReactNode;
}

export function Portal({ name, children }: PortalProps) {
  const mount = portals[name];
  const element = useRef<HTMLDivElement>(document.createElement("div"));

  useEffect(() => {
    if (!mount) {
      return;
    }
    mount.appendChild(element.current);
    return () => {
      mount.removeChild(element.current);
    };
  }, [mount]);
  return createPortal(children, element.current);
}

interface PortalTargetProps {
  name: string;
}

export function PortalTarget({ name }: PortalTargetProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current && !portals[name]) {
      portals[name] = ref.current;
    }
  }, [name]);
  return <div ref={ref} />;
}
