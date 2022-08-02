import styled, { css } from "styled-components";
import { StyledItemProps } from './types';

export const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

export const StyledItem = styled.li<StyledItemProps>`
  font-size: 1.5rem;
  text-transform: uppercase;
  width: 100%;
  height: 3rem;
  border-bottom: 3px solid var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 2.5rem;

  @media only screen and (min-width: 550px) {
    font-size: 3rem;
    max-width: 4rem;
    height: 4rem;
    border-bottom: 4px solid var(--primary);
  }

  ${(props) => props.hasDash && css`
    border-bottom: 0;
  `}
`;
