import { ReactNode, MouseEvent } from "react";
import { ButtonTypeEnum } from "./enums";

import './style.scss';

interface ButtonProps {
  type: ButtonTypeEnum;
  children: ReactNode;
  onClick: (e: MouseEvent) => void;
}

export const Button = ({ type, children, onClick }: ButtonProps) => {
  return (
    <button className={`button button--${type}`} onClick={onClick}>
      {children}
    </button>
  )
}
