import { createContext, useContext, useState } from "react";
import { DialogContextValue, DialogContextProviderProps } from './types';

export const DialogContext = createContext<DialogContextValue>({} as DialogContextValue);

export const DialogContextProvider = ({children}: DialogContextProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function open(callback?: () => void) {
    setIsOpen(true);

    if (typeof callback === 'function') {
      callback();
    }
  }

  function close() {
    setIsOpen(false);
  }

  return(
    <DialogContext.Provider value={{isOpen, open, close}}>
      {children}
    </DialogContext.Provider>
  )
}

export const useDialogContext = () => {
  return useContext(DialogContext);
}
