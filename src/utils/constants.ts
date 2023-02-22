export const KEYBOARD_LETTERS = [
  ['q', 'w','e','r','t','y','u','i','o','p'],
  ['a','s','d','f','g','h','j','k','l'],
  ['z','x','c','v','b','n','m']
];

export const MAX_ATTEMPTS = 6;

export const POKEMON_IMG_BASE_URL = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/';

export const POKEMON_IMG_FILE_EXT = 'png';

export const DELAY_BEFORE_RESULT = 500;

export interface IGeneration {
  name: string;
  pokemonsTotal: number;
}

export const GENERATIONS: IGeneration[] = [
  {
    name: '1',
    pokemonsTotal: 151,
  },
  {
    name: '2',
    pokemonsTotal: 251,
  },
  {
    name: '3',
    pokemonsTotal: 386,
  },
  {
    name: '4',
    pokemonsTotal: 493,
  },
  {
    name: '5',
    pokemonsTotal: 649,
  },
  {
    name: '6',
    pokemonsTotal: 721,
  },
  {
    name: '7',
    pokemonsTotal: 809,
  },
  {
    name: '8',
    pokemonsTotal: 905,
  },
]
