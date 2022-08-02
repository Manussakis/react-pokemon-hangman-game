import { forwardRef } from "react";
import { ButtonProps } from "./types";

import {
  StyledButton,
  StyledLinkButton,
  StyledButtonIcon,
  StyledButtonText,
} from './styles';

export const Button = forwardRef<any, ButtonProps>(({
  type,
  children,
  onClick,
  disabled = false,
  icon,
  href = '',
  target = '_blank',
}, ref) => {
  const buttonContent = icon ? (
    <>
      <StyledButtonIcon>{icon}</StyledButtonIcon>
      <StyledButtonText>{children}</StyledButtonText>
    </>
  ) : (
    <>
      {children}
    </>
  );

  return (
    href ? (
      <StyledLinkButton buttonType={type} href={href} target={target} ref={ref} isDisabled={disabled} onClick={onClick}>
        {buttonContent}
      </StyledLinkButton>
    ) : (
      <StyledButton buttonType={type} ref={ref} onClick={onClick} disabled={disabled}>
        {buttonContent}
      </StyledButton>
    )
  );
});
