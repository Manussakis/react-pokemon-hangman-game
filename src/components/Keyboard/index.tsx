import { useAppContext } from '../../context/AppContext';
import { KEYBOARD_LETTERS } from '../../library/constants';
import { Key } from '../Key';
import './style.scss';

export const Keyboard = () => {
  const {
    gameState: {
      wordInProgress,
      guesses,
    },
    onClickLetter,
  } = useAppContext();

  return (
    <div className='keyboard'>
      {KEYBOARD_LETTERS.map((row, index) => (
        // Using index in the key property shouldn't be a problem here since
        // the order of the rows in the Keyboard will never change.
        <div key={`row-${index + 1}`} className={`keyboard__row keyboard__row--${index + 1}`}>
          {row.map(letter => {
            const isInWord = guesses.includes(letter) && wordInProgress.includes(letter);
            const isDisable = guesses.includes(letter);

            return (
              <Key key={letter} isDisable={isDisable} isInWord={isInWord} letter={letter} onClick={() => onClickLetter(letter)} />
            );
          })}
        </div>
      ))}
    </div>
  );
};
