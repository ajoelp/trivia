import { lazy } from "react";
import { createDialogWrapper } from "dialog-manager-react";

const Dialogs = {
  confirm: lazy(() => import("./ConfirmDialog")),
  modifyQuestion: lazy(() => import("./ModifyQuestionDialog")),
};

const { DialogManager, useDialogs } = createDialogWrapper(Dialogs);

export { DialogManager, useDialogs };
