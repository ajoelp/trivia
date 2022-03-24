import { ClipboardCopyIcon } from "@heroicons/react/solid";
import { Tooltip } from "./Tooltip";

interface CopyToClipboardProps {
  value: string;
}

export function CopyToClipboard({ value }: CopyToClipboardProps) {
  return (
    <Tooltip value="Copy to clipboard">
      <button className="inline-flex gap-1 items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-zinc-200 hover:bg-zinc-300 text-zinc-800">
        {value}
        <ClipboardCopyIcon className="w-3 h-" />
      </button>
    </Tooltip>
  );
}
