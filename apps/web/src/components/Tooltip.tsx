import { computePosition } from "@floating-ui/dom";
import {
  ReactNode,
  Children,
  cloneElement,
  ReactElement,
  Ref,
  useRef,
  useState,
  useEffect,
  forwardRef,
  CSSProperties,
} from "react";
import { usePopper } from "react-popper";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface TooltipProps {
  children: ReactNode;
  value: string;
}

type TooltipContentProps = {
  style?: CSSProperties;
  children: ReactNode;
};

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>((props, ref) => {
  const [node, setNode] = useState<HTMLDivElement>();

  useEffect(() => {
    if (!node) {
      const element = document.createElement("div");
      element.classList.add("tooltip-portal");
      document.body.appendChild(element);
      setNode(element);
    }
    return () => {
      if (node) {
        document.body.removeChild(node);
      }
      setNode(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!node) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        {...props}
        ref={ref}
        className="bg-gray-900 text-sm rounded shadow-xl py-1 px-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>,
    node,
  );
});

export function Tooltip({ children, value }: TooltipProps) {
  const [referenceElement, setReferenceElement] = useState<HTMLSpanElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const { styles, attributes } = usePopper(referenceElement, popperElement);

  return (
    <>
      <span
        onMouseOver={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        ref={setReferenceElement}
      >
        {children}
      </span>
      {showTooltip && (
        <TooltipContent ref={setPopperElement} style={styles.popper} {...attributes.popper}>
          {value}
        </TooltipContent>
      )}
    </>
  );
}
