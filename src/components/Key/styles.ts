import styled, { css } from "styled-components";
import { StyledKeyProps } from "./types";

export const StyledKey = styled.button<StyledKeyProps>`
  width: 9%;
  height: 3rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--primary);
  border-radius: 0.25rem;
  text-transform: uppercase;
  font-size: 1rem;
  background-color: white;
  margin: 0.05rem;
  font-weight: bold;
  box-shadow: 2px 2px 0 var(--primary);
  transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    box-shadow: 1px 1px 0 var(--primary);
    transform: translate(1px, 1px);
  }

  &:active {
    box-shadow: 0px 0px 0 var(--primary);
    transform: translate(2px, 2px);
  }

  @media only screen and (min-width: 480px) {
    width: 2.5rem;
    margin: 0.1rem;
  }

  @media only screen and (min-width: 550px) {
    width: 3rem;
    margin: 0.2rem;
    box-shadow: 4px 4px 0 var(--primary);

    &:hover {
      box-shadow: 2px 2px 0 var(--primary);
      transform: translate(2px, 2px);
    }

    &:active {
      box-shadow: 1px 1px 0 var(--primary);
      transform: translate(3px, 3px);
    }
  }

  ${(props) =>
    props.isDisabled &&
    css`
      pointer-events: none;
      background-color: var(--red);
      box-shadow: 0px 0px 0 var(--primary);
      transform: translate(1px, 1px);
      color: var(--primary);

      @media only screen and (min-width: 550px) {
        box-shadow: 1px 1px 0 var(--primary);
        transform: translate(3px, 3px);
      }
    `}

  ${(props) =>
    props.isRightGuess &&
    css`
      background-color: var(--lightgreen);
    `}
`;
