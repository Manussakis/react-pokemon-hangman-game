import { ContainerSizesEnum } from './enums';
import { ContainerProps } from './types';
import { StyledContainer } from './styles';

export const Container = ({ size = ContainerSizesEnum.MEDIUM, children }: ContainerProps) => {
  return (
    <StyledContainer size={size}>
      {children}
    </StyledContainer>
  );
}
