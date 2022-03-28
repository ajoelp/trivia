import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface PortalContext {
  portals: Record<string, Element>;
  addPortal: (element: Element, name: string) => void;
  removePortal: (name: string) => void;
}
const context = createContext<PortalContext>({
  portals: {},
  addPortal() {},
  removePortal() {},
});

interface PortalProviderProps {
  children: ReactNode;
}
export const PortalProvider = ({ children }: PortalProviderProps) => {
  const [portals, setPortals] = useState<Record<string, Element>>({});

  const addPortal = useCallback((element: Element, name: string) => {
    setPortals((old) => ({
      ...old,
      [name]: element,
    }));
  }, []);

  const removePortal = useCallback((name: string) => {
    setPortals((old) => {
      const ref = { ...old };
      delete ref[name];
      return ref;
    });
  }, []);

  return (
    <context.Provider
      value={{
        addPortal,
        removePortal,
        portals,
      }}
    >
      {children}
    </context.Provider>
  );
};

function usePortals() {
  return useContext(context);
}

interface PortalProps {
  name: string;
  children: ReactNode;
}

export function Portal({ name, children }: PortalProps) {
  const { portals } = usePortals();
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

export const PORTAL_PREFIX = "portal";

export function PortalTarget({ name }: PortalTargetProps) {
  const { addPortal, portals, removePortal } = usePortals();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current && !portals[name]) {
      addPortal(ref.current, name);
    }
    return () => {
      removePortal(name);
    };
  }, [name]);
  return <div data-testid={[PORTAL_PREFIX, name].join("-")} ref={ref} />;
}
