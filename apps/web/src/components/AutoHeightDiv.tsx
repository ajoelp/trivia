import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";

type Props = Omit<JSX.IntrinsicElements["div"], "children"> & {
  children: (height: number) => ReactNode;
};

export function AutoHeightDiv({ children, ...props }: Props) {
  const divRef = useRef<HTMLDivElement>(null);

  const calaulateHeight = useCallback(() => {
    setHeight(divRef.current?.scrollHeight ?? 0);
  }, []);

  const [height, setHeight] = useState(0);

  useEffect(() => {
    calaulateHeight();
    window.addEventListener("resize", calaulateHeight);

    return () => {
      window.removeEventListener("resize", calaulateHeight);
    };
  }, [calaulateHeight]);

  return (
    <div {...props} ref={divRef}>
      {children(height)}
    </div>
  );
}
