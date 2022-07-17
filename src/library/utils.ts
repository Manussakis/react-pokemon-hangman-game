// https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
export const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getPokemoImageUrl = (id: string) => {
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;
};

export const setThreeDigits = (num: number): string => {
  const numDigitsLength = String(num).length;

  if (numDigitsLength === 1) {
    return '00' + num;
  }

  if (numDigitsLength === 2) {
    return '0' + num;
  }

  return String(num);
};
