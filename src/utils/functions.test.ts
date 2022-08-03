import { randomIntFromInterval, getPokemoImageUrl } from './functions';
import { POKEMON_IMG_BASE_URL, POKEMON_IMG_FILE_EXT } from './constants';

describe('Utils functions', () => {
  test('gets random number between interval', () => {
    const startNum = 5;
    const endNum = 18;
    const num = randomIntFromInterval(startNum, endNum);

    expect(num).toBeGreaterThanOrEqual(startNum);
    expect(num).toBeLessThanOrEqual(endNum);
  });

  test('composes Pokémon image url from id', () => {
    const id = 1;
    const url = getPokemoImageUrl(id);
    const finalUrl = `${POKEMON_IMG_BASE_URL}001.${POKEMON_IMG_FILE_EXT}`

    expect(url).toBe(finalUrl);
  });
})
