import { GameActionTypeEnum, GameStatusEnum } from './enums';
import { GameState, GameStateAction, PokemonData } from './type';
import { MAX_ATTEMPTS } from '../../utils/constants';
import { convertStrToEmptyArray } from '../../utils/functions';
import { gameStateInitialValue } from '.';

export const gameStateRuducer = (state: GameState, action: GameStateAction): GameState => {
  let newRemainingAttempts: number;
  let pokemonData: PokemonData;

  switch (action.type) {
    case GameActionTypeEnum.FIND_NEW_POKEMON:
      if (!action.payload?.pokemonData) {
        throw new Error(`The action type ${GameActionTypeEnum.FIND_NEW_POKEMON} requires a payload object with the property "pokemonData".`)
      }

      if (!action.payload?.status) {
        throw new Error(`The action type ${GameActionTypeEnum.FIND_NEW_POKEMON} requires a payload object with the property "status".`)
      }

      pokemonData = action.payload.pokemonData;
      const pokemonName = pokemonData.name as string;

      return {
        ...state,
        pokemonData,
        wordInProgress: convertStrToEmptyArray(pokemonName),
        remainingAttempts: MAX_ATTEMPTS,
        guesses: [],
        hasTip: true,
        status: action.payload.status,
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

    case GameActionTypeEnum.CHANGE_GENERATION:
      if (!action.payload?.generation) {
        throw new Error(`The action type ${GameActionTypeEnum.CHANGE_GENERATION} requires a payload object with the property "generation".`)
      }

      return {
        ...state,
        generation: action.payload.generation,
      }

      case GameActionTypeEnum.RESET_GAME:
        if (!action.payload?.generation) {
          throw new Error(`The action type ${GameActionTypeEnum.RESET_GAME} requires a payload object with the property "generation".`)
        }
  
        return {
          ...gameStateInitialValue,
          generation: action.payload.generation,
        }

    case GameActionTypeEnum.REVEAL_NAME:
      const revealedWordInProgress = state.pokemonData.name.split('');
      
      return {
        ...state,
        wordInProgress: revealedWordInProgress,
        status: GameStatusEnum.REVEALED,
      }

    default:
      throw new Error("This action type doesn't exist.");
  }
};
