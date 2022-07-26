import { GameActionTypeEnum, GameStatusEnum } from './enums';
import { GameState, GameStateAction, PokemonData } from './type';
import { MAX_ATTEMPTS } from '../../library/constants';

export const gameStateRuducer = (state: GameState, action: GameStateAction): GameState => {
  let newRemainingAttempts: number;
  let pokemonData: PokemonData;

  switch (action.type) {
    case GameActionTypeEnum.START_GAME:
      return {
        ...state,
        status: GameStatusEnum.RUNNING,
      }

    case GameActionTypeEnum.GET_NEW_POKEMON:
      if (!action.payload?.pokemonData) {
        throw new Error(`The action type ${GameActionTypeEnum.GET_NEW_POKEMON} requires a payload object with the property "pokemonData".`)
      }

      pokemonData = action.payload.pokemonData;
      const pokemonName = pokemonData.name as string;
      let status = GameStatusEnum.BEFORE_STARTING;

      if (state.status !== GameStatusEnum.BEFORE_STARTING) {
        status = GameStatusEnum.RUNNING;
      }

      return {
        ...state,
        pokemonData,
        wordInProgress: pokemonName.split('').map((char) => char === '-' ? '-' : ''),
        remainingAttempts: MAX_ATTEMPTS,
        guesses: [],
        hasTip: true,
        status,
      }

    case GameActionTypeEnum.CLICK_LETTER:
      if (!action.payload?.letter) {
        throw new Error(`The action type ${GameActionTypeEnum.CLICK_LETTER} requires a payload object with the property "letter".`)
      }

      pokemonData = state.pokemonData;
      const { wordInProgress, guesses, hasTip } = state;
      const newWordInProgress: string[] = [...wordInProgress];
      const newGuesses: string[] = [...guesses];
      const { letter } = action.payload;
      const isTip = action.payload?.isTip as boolean;

      newGuesses.push(letter);

      if (pokemonData.name.includes(letter)) {
        pokemonData.name.split('').forEach((l, i) => {
          if (l === letter) {
            newWordInProgress[i] = letter;
          }
        });

        newRemainingAttempts = state.remainingAttempts;
      } else {
        newRemainingAttempts = state.remainingAttempts - 1
      }

      return {
        ...state,
        wordInProgress: newWordInProgress,
        remainingAttempts: newRemainingAttempts,
        guesses: newGuesses,
        hasTip: !hasTip ? hasTip : !isTip,
      };

    case GameActionTypeEnum.UPDATE_STATUS:
      if (!action.payload?.status) {
        throw new Error(`The action ${GameActionTypeEnum.UPDATE_STATUS} requires a payload object with the property "status".`);
      }

      return {
        ...state,
        status: action.payload.status,
      }

    default:
      throw new Error("This action type doesn't exist.");
  }
};
