import ToastProvider, { MessageEntries, ToastMessage, ToastMessageTypes } from "./ToastProvider";
import { ReactNode, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { classNames } from "../utils";
import { ExclamationCircleIcon, ExclamationIcon, XIcon, CheckCircleIcon } from "@heroicons/react/outline";

export const toast = new ToastProvider();

export function useToast() {
  const [toasts, setToasts] = useState<MessageEntries>([]);

  useEffect(() => {
    toast.subscribe(setToasts);
    return () => {
      toast.unsubscribe(setToasts);
    };
  }, []);

  return toasts;
}

type ToastColor = {
  background: string;
  text: string;
  icon: ReactNode;
};

const toastColors: Record<ToastMessageTypes, ToastColor> = {
  error: {
    background: "ring ring-red-500",
    text: "text-red-900",
    icon: <ExclamationCircleIcon className="text-red-500 w-5 h-5 mx-2" />,
  },
  success: {
    background: "ring ring-green-500",
    text: "text-green-900",
    icon: <CheckCircleIcon className="text-green-500 w-5 h-5 mx-2" />,
  },
  warning: {
    background: "ring ring-yellow-500",
    text: "text-yellow-900",
    icon: <ExclamationIcon className="text-yellow-500 w-5 h-5 mx-2" />,
  },
};

type ToastProps = {
  toast: ToastMessage;
};
export function Toast({ toast }: ToastProps) {
  const Colors = toastColors[toast.type];
  return (
    <AnimatePresence>
      <motion.div
        layout
        initial={{ opacity: 0, y: 50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.5 }}
        className={classNames(Colors.background, "p-2 rounded-lg flex gap-2 bg-zinc-900 items-center min-h-[60px]")}
      >
        {Colors.icon}
        <div>{toast.message}</div>
        <div className="ml-auto h-full rounded hover:bg-zinc-800">
          <button
            className="p-2 flex items-center justify-center"
            onClick={(e) => {
              e.preventDefault();
              toast.remove();
            }}
          >
            <XIcon className={classNames("text-white w-4 h-4")} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function ToastMessages() {
  const toasts = useToast();

  if (toasts.length <= 0) return null;

  return (
    <div className="fixed right-0 bottom-0 p-4 inline-flex flex-col gap-4 w-full max-w-sm">
      {toasts.map(([id, toast]) => (
        <Toast key={id} toast={toast} />
      ))}
    </div>
  );
}
