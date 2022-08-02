import styled, { css } from 'styled-components';
import { StyledContainerProps } from './types';
import { ContainerSizesEnum } from './enums';

export const StyledContainer = styled.div<StyledContainerProps>`
  max-width: 34rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;

  ${(props) => props.size === ContainerSizesEnum.SMALL && css`
    max-width: 30rem;
  `}
`;
