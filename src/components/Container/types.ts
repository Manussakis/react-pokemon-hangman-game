import { ReactNode } from 'react';
import { ContainerSizesEnum } from './enums';

export type ContainerProps = {
  size?: ContainerSizesEnum;
  children: ReactNode;
}
