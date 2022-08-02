export type KeyProps = {
  letter: string;
  isDisable: boolean;
  isInWord: boolean;
  onClick: (letter: string) => void;
};

export type StyledKeyProps = {
  isDisabled?: boolean;
  isRightGuess?: boolean;
}
