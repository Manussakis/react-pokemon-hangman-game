import React from 'react';
import './style.scss';

interface KeyProps {
  letter: string;
  isDisable: boolean;
  isInWord: boolean;
  onClickKey: (letter: string) => void;
};

export const Key = ({ letter, isDisable, isInWord, onClickKey }: KeyProps) => {
  return (
    <button className={`key key--${letter}${isDisable ? ' key--disable' : ''}${isInWord ? ' key--right-guess' : ''}`}
      onClick={() => onClickKey(letter)}>
      {letter}
    </button>
  );
};
