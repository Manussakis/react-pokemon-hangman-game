import { ReactNode, MouseEvent } from "react";
import { ButtonTypeEnum } from "./enums";

import './style.scss';

interface ButtonProps {
  type: ButtonTypeEnum;
  children: ReactNode;
  disabled?: boolean|undefined;
  onClick: (e: MouseEvent) => void;
}

export const Button = ({ type, children, onClick, disabled = false }: ButtonProps) => {
  return (
    <button className={`button button--${type}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
