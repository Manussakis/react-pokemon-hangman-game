import { ReactNode, MouseEvent } from "react";
import { ButtonTypeEnum } from "./enums";

export type ButtonProps = {
  type: ButtonTypeEnum;
  children: ReactNode;
  icon?: ReactNode;
  href?: string;
  target?: string;
  disabled?: boolean|undefined;
  onClick?: (e: MouseEvent) => void;
  ref?: HTMLAnchorElement | HTMLButtonElement | undefined
}

export interface StyledButtonType {
  buttonType: ButtonTypeEnum;
}

export interface StyledLinkButtonType extends StyledButtonType{
  isDisabled: boolean;
}
