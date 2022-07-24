import { ReactNode, MouseEvent, forwardRef } from "react";
import { ButtonTypeEnum } from "./enums";

import './style.scss';

interface ButtonProps {
  type: ButtonTypeEnum;
  children: ReactNode;
  disabled?: boolean|undefined;
  onClick?: (e: MouseEvent) => void;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ type, children, onClick, disabled = false }, ref) => {
  return (
    <button ref={ref} className={`button button--${type}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
});
