import { computePosition } from "@floating-ui/dom";
import { ReactNode, Children, cloneElement, ReactElement, Ref, useRef, useState } from "react";

interface TooltipProps {
  children: ReactNode;
  value: string;
}

export function Tooltip({ children }: TooltipProps) {
  const [ref, setRef] = useState<any>(null);
  const floatingThing = useRef();
  const child = Children.only(children) as ReactElement & {
    ref?: Ref<any>;
  };

  const trigger = cloneElement(child, { ref: (node: any) => setRef(node) });

  console.log(ref);

  return (
    <>
      {trigger}
      <div ref={floatingThing}>
        <p>Hello world</p>
      </div>
    </>
  );
}
