import { KeyProps } from './types';

import './style.scss';

export const Key = ({ letter, isDisable, isInWord, onClick }: KeyProps) => {
  return (
    <button className={`key key--${letter}${isDisable ? ' key--disable' : ''}${isInWord ? ' key--right-guess' : ''}`}
      onClick={() => onClick(letter)}>
      {letter}
    </button>
  );
};
