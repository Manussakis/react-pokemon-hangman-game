import { createContext, useContext, useEffect, useCallback, useReducer, useRef, useState } from 'react';
import { fetchPokemon } from '../../api';
import { MAX_ATTEMPTS, DELAY_BEFORE_RESULT, GENERATIONS } from '../../utils/constants';
import { randomIntFromInterval } from '../../utils/functions';
import { GameActionTypeEnum, GameStatusEnum } from './enums';
import { AppContextValue, GameState, AppContextProviderProps } from './type';
import { gameStateRuducer } from './reducer';

export const AppContext = createContext({} as AppContextValue);

export const gameStateInitialValue: GameState = {
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
  generation: +GENERATIONS[0].name,
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const hasGameBeenStarted = useRef(false);
  const [isLoadingPokemon, setIsLoadingPokemon] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [gameState, dispatchGameState] = useReducer(gameStateRuducer, gameStateInitialValue);

  const onClickLetter = (letter: string, isTip?: boolean) => {
    if (
      gameState.remainingAttempts > 0 &&
      gameState.wordInProgress.join('') !== gameState.pokemonData.name
    ) {
      dispatchGameState({
        type: GameActionTypeEnum.CLICK_LETTER,
        payload: {
          letter: letter.toLowerCase(),
          isTip,
        }
      });
    }
  }

  const onChangeGeneration = (generation: number) => {    
    dispatchGameState({
      type: GameActionTypeEnum.CHANGE_GENERATION,
      payload: {
        generation
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
    const totalPokemons = GENERATIONS.filter(gen => +gen.name === gameState.generation)[0].pokemonsTotal;
    const randomPokemonId = randomIntFromInterval(1, totalPokemons);

    getNewPokemon(randomPokemonId);

  }, [getNewPokemon, gameState.generation]);

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
    
    hasGameBeenStarted.current = true;

    onFindNewPokemon();
  }, [onFindNewPokemon]);

  useEffect(() => {
    if (gameState.remainingAttempts === 0) {
      setTimeout(() => {
        dispatchGameState({
          type: GameActionTypeEnum.UPDATE_STATUS,
          payload: {
            status: GameStatusEnum.LOST
          }
        });
      }, DELAY_BEFORE_RESULT);
    } else if (hasGameBeenStarted.current && gameState.wordInProgress.join('') === gameState.pokemonData.name) {
      setTimeout(() => {
        dispatchGameState({
          type: GameActionTypeEnum.UPDATE_STATUS,
          payload: {
            status: GameStatusEnum.WON,
          }
        });
      }, DELAY_BEFORE_RESULT);
    }
  }, [gameState.remainingAttempts, gameState.wordInProgress, gameState.pokemonData.name]);

  return (
    <AppContext.Provider value={{ gameState, isLoadingPokemon, hasError, onClickLetter, onFindNewPokemon, onStartGame, onTryAgain, onChangeGeneration }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext);
}
