import React from 'react';
import { KEYBOARD_LETTERS } from '../../library/constants';
import { Key } from '../Key';
import './style.scss';

interface KeyboadProps {
  wordInProgress: string[];
  guesses: string[];
};

export const Keyboard = ({ wordInProgress, guesses }: KeyboadProps) => {
  function onClickKey(letter: string) {
    console.log(letter);
  }

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
              <Key key={letter} isDisable={isDisable} isInWord={isInWord} letter={letter} onClickKey={onClickKey}/>
            );
          })}
        </div>
      ))}
    </div>
  );
};
