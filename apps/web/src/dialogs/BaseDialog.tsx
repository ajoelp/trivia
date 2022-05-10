import { DialogProps } from "dialog-manager-react";
import { ReactNode } from "react";
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, ModalHeader } from "@chakra-ui/react";

interface BaseDialogProps extends DialogProps {
  children: ReactNode;
}

export function BaseDialog({ closeDialog, active, children }: BaseDialogProps) {
  return (
    <Modal isOpen={active} onClose={closeDialog}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
