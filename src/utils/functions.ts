import { POKEMON_IMG_BASE_URL, POKEMON_IMG_FILE_EXT } from './constants';

// https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
export const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const setThreeDigits = (num: number): string => {
  const numDigitsLength = String(num).length;

  if (numDigitsLength === 1) {
    return '00' + num;
  }

  if (numDigitsLength === 2) {
    return '0' + num;
  }

  return String(num);
};

export const getPokemoImageUrl = (id: number) => {
  const idString = setThreeDigits(id);

  return `${POKEMON_IMG_BASE_URL}${idString}.${POKEMON_IMG_FILE_EXT}`;
};

export const convertStrToEmptyArray = (text: string) => {
  return text.split('').map((char) => char === '-' ? '-' : '');
};

export const isLetter = (char: string): boolean => {
  return ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].includes(char.toLowerCase());
}
