import { createContext, useContext, useEffect, useCallback, useReducer } from 'react';
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

  const onFindNewPokemon = useCallback(async(generation?: number) => {
    const currentGeneration = !!generation ? generation : gameState.generation;
    const totalPokemons = GENERATIONS.filter(gen => +gen.name === currentGeneration)[0].pokemonsTotal;
    const randomPokemonId = randomIntFromInterval(1, totalPokemons);

    dispatchGameState({
      type: GameActionTypeEnum.UPDATE_STATUS,
      payload: {
        status: GameStatusEnum.LOADING,
      }
    });

    try {
      const pokemonData = await fetchPokemon(randomPokemonId);

      dispatchGameState({
        type: GameActionTypeEnum.GET_NEW_POKEMON,
        payload: {
          pokemonData,
          status: GameStatusEnum.RUNNING,
        }
      });
    } catch (error) {
      dispatchGameState({
        type: GameActionTypeEnum.UPDATE_STATUS,
        payload: {
          status: GameStatusEnum.ERROR,
        }
      });
      console.log(error);
    };

  }, [gameState.generation]);

  const onTryAgain = useCallback(() => {
    dispatchGameState({
      type: GameActionTypeEnum.GET_NEW_POKEMON,
      payload: {
        pokemonData: gameState.pokemonData,
        status: GameStatusEnum.RUNNING,
      }
    });
  }, [gameState.pokemonData]);

  const onResetGame = (generation: number) => {
    dispatchGameState({
      type: GameActionTypeEnum.RESET_GAME,
      payload: {
        generation,
      }
    });
  };

  const onChangeGameStatus = (status: GameStatusEnum) => {
    dispatchGameState({
      type: GameActionTypeEnum.UPDATE_STATUS,
      payload: { status },
    });
  };

  const onRevealPokemonName = () => {
    dispatchGameState({
      type: GameActionTypeEnum.REVEAL_NAME,
    });
  };

  useEffect(() => {
    if (
        gameState.status === GameStatusEnum.RUNNING &&
        gameState.remainingAttempts === 0
      )
    {
      setTimeout(() => {
        dispatchGameState({
          type: GameActionTypeEnum.UPDATE_STATUS,
          payload: {
            status: GameStatusEnum.LOST
          }
        });
      }, DELAY_BEFORE_RESULT);
    } else if (
        gameState.status ===GameStatusEnum.RUNNING && 
        gameState.wordInProgress.join('') === gameState.pokemonData.name
      )
    {
      setTimeout(() => {
        dispatchGameState({
          type: GameActionTypeEnum.UPDATE_STATUS,
          payload: {
            status: GameStatusEnum.WON,
          }
        });
      }, DELAY_BEFORE_RESULT);
    }
  }, [
    gameState.remainingAttempts,
    gameState.wordInProgress,
    gameState.pokemonData.name,
    gameState.status
  ]);

  return (
    <AppContext.Provider value={
      {
        gameState,
        onClickLetter,
        onFindNewPokemon,
        onTryAgain,
        onChangeGeneration,
        onChangeGameStatus,
        onResetGame,
        onRevealPokemonName,
      }
    }>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext);
}
