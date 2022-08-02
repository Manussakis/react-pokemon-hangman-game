import { forwardRef } from "react";
import { ButtonProps } from "./types";

import './style.scss';

export const Button = forwardRef<any, ButtonProps>(({
  type,
  children,
  onClick,
  disabled = false,
  icon,
  href = '',
  target = '_blank'
}, ref) => {
  const buttonContent = icon ? (
    <>
      <span className="button__icon">{icon}</span>
      <span className="button__text">{children}</span>
    </>
  ) : (
    <>
      {children}
    </>
  );

  return (
    href ? (
      <a href={href} target={target} ref={ref} className={`button button--${type}${disabled ? ' button--disabled' : ''}`} onClick={onClick}>
        {buttonContent}
      </a>
    ) : (
      <button ref={ref} className={`button button--${type}`} onClick={onClick} disabled={disabled}>
        {buttonContent}
      </button>
    )
  );
});
