import { useAppContext } from '../../contexts/AppContext';
import { GameStatusEnum } from '../../contexts/AppContext/enums';
import { KEYBOARD_LETTERS } from '../../utils/constants';
import { Key } from '../Key';

import { StyledWrapper, StyledRow } from './styles';

export const Keyboard = () => {
  const {
    gameState: {
      wordInProgress,
      guesses,
      status,
    },
    onClickLetter,
  } = useAppContext();

  const disableKeyboard = status === GameStatusEnum.WON || status === GameStatusEnum.LOST;

  return (
    <StyledWrapper isDisabled={disableKeyboard} aria-hidden={disableKeyboard} data-testid="keyboard-wrapper">
      {KEYBOARD_LETTERS.map((row, index) => (
        // Using index in the key property shouldn't be a problem here since
        // the order of the rows in the Keyboard will never change.
        <StyledRow key={`row-${index + 1}`}>
          {row.map(letter => {
            const isInWord = guesses.includes(letter) && wordInProgress.includes(letter);
            const isDisable = guesses.includes(letter);

            return (
              <Key key={letter} isDisable={isDisable} isInWord={isInWord} letter={letter} onClick={() => onClickLetter(letter)} />
            );
          })}
        </StyledRow>
      ))}
    </StyledWrapper>
  );
};
