import styled, { css } from "styled-components";
import { StyledWrapperProps } from './types';

export const StyledWrapper = styled.div<StyledWrapperProps>`
  list-style: none;
  margin: 0 -1rem;
  padding: 0;

  ${(props) => props.isDisabled && css`
    pointer-events: none;
  `}
`;

export const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`;
