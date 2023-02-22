import { ReactNode } from "react";

export type DialogContextValue = {
  isOpen: boolean;
  open: (callback?: () => void) => void;
  close: () => void;
}

export type DialogContextProviderProps = {
  children: ReactNode;
}
