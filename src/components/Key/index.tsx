import './style.scss';

interface KeyProps {
  letter: string;
  isDisable: boolean;
  isInWord: boolean;
  onClick: (letter: string) => void;
};

export const Key = ({ letter, isDisable, isInWord, onClick }: KeyProps) => {
  return (
    <button className={`key key--${letter}${isDisable ? ' key--disable' : ''}${isInWord ? ' key--right-guess' : ''}`}
      onClick={() => onClick(letter)}>
      {letter}
    </button>
  );
};
