import { KeyProps } from './types';

import { StyledKey } from './styles';

export const Key = ({ letter, isDisable, isInWord, onClick }: KeyProps) => {
  return (
    <StyledKey isDisabled={isDisable} isRightGuess={isInWord} onClick={() => onClick(letter)} disabled={isDisable}>
      {letter}
    </StyledKey>
  );
};
