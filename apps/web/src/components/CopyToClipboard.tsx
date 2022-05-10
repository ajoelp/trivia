import { Button, Tooltip, useClipboard } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
interface CopyToClipboardProps {
  value: string;
  label?: string;
}

export function CopyToClipboard({ value, label }: CopyToClipboardProps) {
  const { hasCopied, onCopy } = useClipboard(value);

  if (!label) {
    label = value;
  }

  return (
    <Tooltip label="Copy to clipboard">
      <Button size="xs" leftIcon={<CopyIcon />} onClick={onCopy}>
        {hasCopied ? "Copied" : label}
      </Button>
    </Tooltip>
  );
}
