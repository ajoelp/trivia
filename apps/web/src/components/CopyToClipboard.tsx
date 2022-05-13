import { ClipboardCopyIcon } from "@heroicons/react/solid";
import { useCallback, useEffect, useRef, useState } from "react";
import { Tooltip } from "./Tooltip";

interface CopyToClipboardProps {
  value: string;
}

export function useCopyToClipboard<T extends string>(value: T) {
  const [copied, setCopied] = useState(false);
  const intervalRef = useRef<NodeJS.Timer>();

  const copy = useCallback(async () => {
    if (!navigator?.clipboard) {
      setCopied(false);
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      intervalRef.current = setInterval(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      setCopied(false);
    }
  }, [value]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { copy, copied };
}

export function CopyToClipboard({ value }: CopyToClipboardProps) {
  const { copy, copied } = useCopyToClipboard(value);
  return (
    <Tooltip value="Copy to clipboard">
      <button
        className="inline-flex gap-1 items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-zinc-200 hover:bg-zinc-300 text-zinc-800"
        onClick={() => {
          copy();
        }}
      >
        {copied ? "Copied" : value}
        <ClipboardCopyIcon className="w-3 h-" />
      </button>
    </Tooltip>
  );
}
