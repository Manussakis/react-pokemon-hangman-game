import { ReactNode, RefObject } from "react";

export type DialogProps = {
  triggerRef: RefObject<HTMLElement>;
  title?: ReactNode;
  label?: string;
  children?: ReactNode;
  cancelButton?: string;
  confirmButton?: string;
  onConfirm: () => void;
}
