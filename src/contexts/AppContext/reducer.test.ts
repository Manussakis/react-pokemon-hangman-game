import { gameStateRuducer } from './reducer';
import { GameActionTypeEnum, GameStatusEnum } from './enums';
import { GameState, PokemonData } from './type';
import { MAX_ATTEMPTS } from '../../utils/constants';

const pikachuPokemonData: PokemonData = {
  name: "pikachu",
  image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
  flavorText: "When several of\nthese POKéMON\ngather, their\felectricity could\nbuild and cause\nlightning storms.",
};

const murkrowPokemonData: PokemonData = {
  name: 'murkrow',
  image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/198.png',
  flavorText: 'Feared and loathed\nby many, it is\nbelieved to bring\fmisfortune to all\nthose who see it\nat night.'
};

describe('Game state reducer', () => {
  test('updates game', () => {
    const clickedLetter = 'm';
    const action = {
      type: GameActionTypeEnum.CLICK_LETTER,
      payload: {
        letter: clickedLetter,
      }
    };
    const runningState: GameState = {
      pokemonData: { ...pikachuPokemonData },
      wordInProgress: [ '', '', '', '', '', '', '' ],
      guesses: [],
      remainingAttempts: 6,
      hasTip: true,
      status: GameStatusEnum.RUNNING,
      generation: 1
    };

    const expectedState = {
      ...runningState,
      guesses: [clickedLetter],
      remainingAttempts: 5,
    };
    const newState = gameStateRuducer(runningState, action);

    expect(newState).toStrictEqual(expectedState);
  })

  test('loads new Pokémon', () => {
    const action = {
      type: GameActionTypeEnum.FIND_NEW_POKEMON,
      payload: {
        pokemonData: { ...pikachuPokemonData },
        status: GameStatusEnum.RUNNING,
      }
    };
    const runningState: GameState = {
      pokemonData: { ...murkrowPokemonData },
      wordInProgress: [ 'm', 'u', '', '', '', 'o', '' ],
      guesses: ['m', 'u', 'o', 'i'],
      remainingAttempts: 5,
      hasTip: false,
      status: GameStatusEnum.RUNNING,
      generation: 1
    };

    const expectedState: GameState = {
      pokemonData: { ...pikachuPokemonData },
      wordInProgress: [ '', '', '', '', '', '', '' ],
      guesses: [],
      remainingAttempts: MAX_ATTEMPTS,
      hasTip: true,
      status: GameStatusEnum.RUNNING,
      generation: 1,
    };

    const newState = gameStateRuducer(runningState, action);

    expect(newState).toStrictEqual(expectedState);
  });

  test('updates game status', () => {
    const action = {
      type: GameActionTypeEnum.UPDATE_STATUS,
      payload: {
        status: GameStatusEnum.LOST
      }
    };
    const runningState: GameState = {
      pokemonData: { ...murkrowPokemonData },
      wordInProgress: [ 'm', 'u', '', '', '', 'o', '' ],
      guesses: ['m', 'u', 'o', 'i', 'y', 'q', 'c', 'z', 'x'],
      remainingAttempts: 0,
      hasTip: false,
      status: GameStatusEnum.RUNNING,
      generation: 1
    };
    const expectedState = {
      ...runningState,
      status: GameStatusEnum.LOST,
    };

    const newState = gameStateRuducer(runningState, action);

    expect(newState).toStrictEqual(expectedState);
  });

  test('reveals Pokémon name', () => {
    const action = {
      type: GameActionTypeEnum.REVEAL_NAME,
    };
    const runningState: GameState = {
      pokemonData: { ...pikachuPokemonData },
      wordInProgress: [ '', '', '', '', '', '', '' ],
      guesses: [],
      remainingAttempts: 6,
      hasTip: true,
      status: GameStatusEnum.RUNNING,
      generation: 1
    };
    const expectedState = {
      ...runningState,
      wordInProgress: [ 'p', 'i', 'k', 'a', 'c', 'h', 'u' ],
      hasTip: false,
      status: GameStatusEnum.REVEALED,
    };

    const newState = gameStateRuducer(runningState, action);

    expect(newState).toStrictEqual(expectedState);
  });
});
