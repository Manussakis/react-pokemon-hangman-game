import { MAX_ATTEMPTS } from '../../utils/constants';

import { AttemptsDisplayProps } from './types';

import {
  StyledText,
  StyledNumber,
  StyledList,
  StyledItem,
  StyledPokeball,
  StyledPokeballLight
} from './styles';

export const AttemptsDisplay = ({ remainingAttempts }: AttemptsDisplayProps) => {
  const allPokeballs = Array.from(Array(MAX_ATTEMPTS).keys());

  return (
    <div>
      <StyledText>
        Attempts - <StyledNumber>{`${remainingAttempts}/${MAX_ATTEMPTS}`}</StyledNumber>
      </StyledText>
      <StyledList>
        {allPokeballs.map((attemptNum) => {
          const icon = (attemptNum + 1) <= remainingAttempts ? <StyledPokeball /> : <StyledPokeballLight />;

          return (
            <StyledItem key={attemptNum}>
              {icon}
            </StyledItem>
          );
        })}
      </StyledList>
    </div>
  );
}
