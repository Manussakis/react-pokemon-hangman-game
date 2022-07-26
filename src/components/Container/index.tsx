import { ContainerSizesEnum } from './enums';
import { ContainerProps } from './types';

import './style.css';

export const Container = ({ size = ContainerSizesEnum.MEDIUM, children }: ContainerProps) => {
  return (
    <div className={`container container--${size}`}>
      {children}
    </div>
  );
}
