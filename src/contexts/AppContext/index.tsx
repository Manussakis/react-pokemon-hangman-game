import { createContext, useContext, useEffect, useCallback, useReducer, useRef, useState } from 'react';
import { getPokemonMaxCount, fetchPokemon } from '../../api';
import { MAX_ATTEMPTS } from '../../utils/constants';
import { randomIntFromInterval } from '../../utils/functions';
import { GameActionTypeEnum, GameStatusEnum } from './enums';
import { AppContextValue, GameState, AppContextProviderProps } from './type';
import { gameStateRuducer } from './reducer';

export const AppContext = createContext({} as AppContextValue);

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
  const [isLoadingPokemon, setIsLoadingPokemon] = useState(false);
  const [hasError, setHasError] = useState(false);
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
    setIsLoadingPokemon(true);
    setHasError(false);

    try {
      const pokemonData = await fetchPokemon(pokemonId);

      dispatchGameState({
        type: GameActionTypeEnum.GET_NEW_POKEMON,
        payload: {
          pokemonData,
        }
      });
    } catch (error) {
      setHasError(true);
      console.log(error);
    } finally {
      setIsLoadingPokemon(false);
    }
  }, []);

  const onFindNewPokemon = useCallback(() => {
    const randomPokemonId = randomIntFromInterval(1, MAX_POKEMON_COUNT);

    getNewPokemon(randomPokemonId);

  }, [getNewPokemon]);

  const onTryAgain = useCallback(() => {
    dispatchGameState({
      type: GameActionTypeEnum.GET_NEW_POKEMON,
      payload: {
        pokemonData: gameState.pokemonData
      }
    });
  }, [gameState.pokemonData]);

  const onStartGame = useCallback(() => {
    dispatchGameState({
      type: GameActionTypeEnum.START_GAME,
    });
  }, []);

  useEffect(() => {
    const startApp = async () => {
      setHasError(false);

      try {
        const maxPokemonsCount = await getPokemonMaxCount();
        const randomPokemonId = randomIntFromInterval(1, maxPokemonsCount);

        MAX_POKEMON_COUNT = maxPokemonsCount;
        isFirstFetchCompleted.current = true;

        getNewPokemon(randomPokemonId);
      } catch (error) {
        setHasError(true)
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
    <AppContext.Provider value={{ gameState, isLoadingPokemon, hasError, onClickLetter, onFindNewPokemon, onStartGame, onTryAgain }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext);
}
