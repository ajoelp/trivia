import { DialogProps } from "dialog-manager-react";
import { Dialog } from "@headlessui/react";
import { BaseDialog } from "./BaseDialog";

export interface ConfirmDialogProps extends DialogProps {
  title: string;
  message: string;
  onSuccess(): void;
}

export default function ConfirmDialog({ closeDialog, onSuccess, active, title, message }: ConfirmDialogProps) {
  return (
    <BaseDialog closeDialog={closeDialog} active={active}>
      <div>
        <div className="text-center">
          <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
            {title}
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">{message}</p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
          onClick={onSuccess}
        >
          Confirm
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
          onClick={closeDialog}
        >
          Cancel
        </button>
      </div>
    </BaseDialog>
  );
}
