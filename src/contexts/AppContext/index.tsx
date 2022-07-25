import { createContext, useContext, useEffect, useCallback, useReducer, useRef } from 'react';
import { getPokemonMaxCount, fetchPokemon } from '../../api';
import { MAX_ATTEMPTS } from '../../library/constants';
import { randomIntFromInterval } from '../../library/utils';
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
