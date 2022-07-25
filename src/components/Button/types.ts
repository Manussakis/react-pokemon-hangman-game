import { ReactNode, MouseEvent } from "react";
import { ButtonTypeEnum } from "./enums";

export type ButtonProps = {
  type: ButtonTypeEnum;
  children: ReactNode;
  disabled?: boolean|undefined;
  onClick?: (e: MouseEvent) => void;
}
