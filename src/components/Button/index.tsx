import { forwardRef } from "react";
import { ButtonProps } from "./types";

import './style.scss';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ type, children, onClick, disabled = false }, ref) => {
  return (
    <button ref={ref} className={`button button--${type}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
});
