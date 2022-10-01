import styled from "styled-components";
import { StyledTrackProps, StyledGenerationButtonProps } from "./types";

const buttonSizeSM = 1.8;
const buttonSizeMD = 2;

export const StyledGenerationHeading = styled.div`
  font-weight: 600;
  margin-bottom: 0.2rem;
`;

export const StyledGenerationBarWrapper = styled.div`
  position: relative;
`;

export const StyledRail = styled.div`
  height: 8px;
  width: 95%;
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--darksurface);
  position: absolute;
  top: 10px;

  @media only screen and (min-width: 550px) {
    top: 12px;
  }
`;

export const StyledTrack = styled.div<StyledTrackProps>`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: var(--primary);
  position: absolute;
`;

export const StyledGenerationBar = styled.ul`
  position: relative;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
`;

export const StyledGenerationButton = styled.button<StyledGenerationButtonProps>`
  width: ${buttonSizeSM}rem;
  height: ${buttonSizeSM}rem;
  border-radius: ${buttonSizeSM}rem;
  border: 2px solid var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  background-color: ${props => props.included ? 'var(--lightgreen)' : ''};
  transition: transform 0.2s ease-in-out;
  transform: scale(1);

  &:hover, 
  &:active,
  &:focus {
    transform: scale(1.1);
  }

  @media only screen and (min-width: 550px) {
    width: ${buttonSizeMD}rem;
    height: ${buttonSizeMD}rem;
  }
`;

export const StyledPokemonTotal = styled.span`
  font-size: 0.625rem;
  margin-top: 0.5rem;

  @media only screen and (min-width: 550px) {
    font-size: 0.75rem;
  }
`;

export const StyledGenerationItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledGenerationMarker = styled.span`
  width: 1px;
  height: 10px;
  background-color: var(--primary);
`;

export const StyledGenerationLine = styled.span`
  width: calc(100% - ${buttonSizeSM}rem);
  height: 1px;
  background-color: var(--primary);
  display: block;
  position: relative;
  top: -1px;
  left: ${buttonSizeSM / 2}rem;

  @media only screen and (min-width: 550px) {
    width: calc(100% - ${buttonSizeMD}rem);
    left: ${buttonSizeMD / 2}rem;
  }
`;

export const StyledGenerationTotalPokemonsHeading = styled.div`
  font-weight: 600;
  margin-top: 0.2rem;
`
