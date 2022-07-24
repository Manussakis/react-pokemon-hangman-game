import { ReactNode } from "react";

export type DialogContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export type DialogContextProviderProps = {
  children: ReactNode;
}
