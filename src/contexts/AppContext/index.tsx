import { createContext, useContext, useEffect, useCallback, useReducer, useRef } from 'react';
import { getPokemonMaxCount, fetchPokemon } from '../../api';
import { MAX_ATTEMPTS } from '../../library/constants';
import { randomIntFromInterval } from '../../library/utils';
import { GameActionTypeEnum, GameStatusEnum } from './enums';
import { AppContextValue, GameState, GameStateAction, AppContextProviderProps } from './type';

export const AppContext = createContext({} as AppContextValue);

const gameStateRuducer = (state: GameState, action: GameStateAction): GameState => {
  let newRemainingAttempts: number;

  switch (action.type) {
    case GameActionTypeEnum.START_GAME:
      return {
        ...state,
        status: GameStatusEnum.RUNNING
      }

    case GameActionTypeEnum.GET_NEW_POKEMON:
      if (!action.payload?.pokemonData) {
        throw new Error(`The action type ${GameActionTypeEnum.GET_NEW_POKEMON} requires a payload object with the property "pokemonData".`)
      }

      const pokeData = action.payload.pokemonData;
      const pokemonName = pokeData.name as string;

      return {
        ...state,
        pokemonData: pokeData,
        wordInProgress: pokemonName.split('').map((char) => char === '-' ? '-' : ''),
        remainingAttempts: MAX_ATTEMPTS,
        guesses: [],
        hasTip: true,
      }

    case GameActionTypeEnum.CLICK_LETTER:
      if (!action.payload?.letter) {
        throw new Error(`The action type ${GameActionTypeEnum.CLICK_LETTER} requires a payload object with the property "letter".`)
      }

      const { pokemonData, wordInProgress, guesses, hasTip } = state;
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

    case GameActionTypeEnum.SUBMIT_TYPED_NAME:
      if (!action.payload?.typedName) {
        throw new Error(`The action ${GameActionTypeEnum.SUBMIT_TYPED_NAME} requires a payload object with the property "typedName".`);
      }

      const { typedName } = action.payload;

      if (state.pokemonData.name === typedName) {
        return {
          ...state,
          wordInProgress: state.pokemonData.name.split(''),
        }
      }

      newRemainingAttempts = state.remainingAttempts - 1;

      return {
        ...state,
        remainingAttempts: newRemainingAttempts,
      }

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

const gameStateInitialValue: GameState = {
  pokemonData: {
    name: '',
    image: '',
    flavorText: '',
  },
  wordInProgress: [],
  guesses: [],
  remainingAttempts: MAX_ATTEMPTS,
  hasTip: true,
  status: GameStatusEnum.BEFORE_STARTING,
};

let MAX_POKEMON_COUNT: number;

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const isFirstFetchCompleted = useRef(false);
  const [gameState, dispatchGameState] = useReducer(gameStateRuducer, gameStateInitialValue);

  const onClickLetter = (letter: string, isTip?: boolean) => {
    dispatchGameState({
      type: GameActionTypeEnum.CLICK_LETTER,
      payload: {
        letter,
        isTip,
      }
    });
  }

  const getNewPokemon = useCallback(async (pokemonId: number) => {
    try {
      const pokemonData = await fetchPokemon(pokemonId);

      // @TODO delete it.
      console.log(pokemonData.name);

      dispatchGameState({
        type: GameActionTypeEnum.GET_NEW_POKEMON,
        payload: {
          pokemonData,
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onFindNewPokemon = useCallback(async () => {
    const randomPokemonId = randomIntFromInterval(1, MAX_POKEMON_COUNT);

    getNewPokemon(randomPokemonId);

  }, [getNewPokemon]);

  const onStartGame = useCallback(() => {
    dispatchGameState({
      type: GameActionTypeEnum.START_GAME,
    });
  }, []);

  function onSubmitTypedName(typedName: string) {
    dispatchGameState({
      type: GameActionTypeEnum.SUBMIT_TYPED_NAME,
      payload: {
        typedName,
      },
    })
  }

  useEffect(() => {
    console.log('mount');

    const startApp = async () => {
      try {
        const maxPokemonsCount = await getPokemonMaxCount();
        const randomPokemonId = randomIntFromInterval(1, maxPokemonsCount);

        MAX_POKEMON_COUNT = maxPokemonsCount;
        isFirstFetchCompleted.current = true;

        getNewPokemon(randomPokemonId);
      } catch (error) {
        console.log(error);
      }
    };

    startApp();
  }, [getNewPokemon]);

  useEffect(() => {
    if (isFirstFetchCompleted.current && gameState.remainingAttempts === 0) {
      dispatchGameState({
        type: GameActionTypeEnum.UPDATE_STATUS,
        payload: {
          status: GameStatusEnum.LOST
        }
      });
    } else if (isFirstFetchCompleted.current && gameState.wordInProgress.join('') === gameState.pokemonData.name) {
      dispatchGameState({
        type: GameActionTypeEnum.UPDATE_STATUS,
        payload: {
          status: GameStatusEnum.WON,
        }
      });
    }
  }, [gameState.remainingAttempts, gameState.wordInProgress, gameState.pokemonData.name]);

  return (
    <AppContext.Provider value={{ gameState, onClickLetter, onFindNewPokemon, onSubmitTypedName, onStartGame }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext);
}
