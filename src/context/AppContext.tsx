import { createContext, ReactElement, useContext, useEffect, useCallback, useReducer, useRef } from 'react';
import { getPokemonMaxCount, fetchPokemon } from '../api';
import { MAX_ATTEMPTS } from '../library/constants';
import { randomIntFromInterval } from '../library/utils';

export interface PokemonData {
  name: string;
  image: string;
  flavorText: string;
};

interface GameState {
  pokemonData: PokemonData;
  wordInProgress: string[];
  guesses: string[];
  remainingAttempts: number;
  hasTip: boolean;
}

interface AppContextValue {
  gameState: GameState;
  onClickLetter: (letter: string, isTip?: boolean) => void;
  onFindNewPokemon: () => void;
};

interface AppContextProviderProps {
  children: ReactElement;
}

enum EnumGameState {
  RESET_GAME = 'RESET_GAME',
  UPDATE_GAME = 'UPDATE_GAME',
}

interface GameStateAction {
  type: EnumGameState;
  payload?: {
    pokemonData?: PokemonData;
    letter?: string;
    isTip?: boolean;
  };
}

export const AppContext = createContext({} as AppContextValue);

const gameStateRuducer = (state: GameState, action: GameStateAction): GameState => {
  switch (action.type) {
    case EnumGameState.RESET_GAME:
      const pokeData = action.payload?.pokemonData as PokemonData;
      const pokemonName = pokeData.name as string;

      return {
        ...state,
        pokemonData: pokeData,
        wordInProgress: pokemonName.split('').map((char) => char === '-' ? '-' : ''),
        remainingAttempts: MAX_ATTEMPTS,
        guesses: [],
        hasTip: true,
      }

    case EnumGameState.UPDATE_GAME:
      const { pokemonData, wordInProgress, guesses } = state;
      const newWordInProgress: string[] = [...wordInProgress];
      const newGuesses: string[] = [...guesses];
      const letter = action.payload?.letter as string;
      const isTip =  action.payload?.isTip as boolean;
      let newRemainingAttempts: number;

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
        hasTip: !isTip,
      }
    default:
      throw new Error("This action type doesn't exist.")
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
};

let MAX_POKEMON_COUNT: number;

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const isFirstFetchCompleted = useRef(false);
  const [gameState, dispatchGameState] = useReducer(gameStateRuducer, gameStateInitialValue);

  const onClickLetter = (letter: string, isTip?: boolean) => {
    dispatchGameState({
      type: EnumGameState.UPDATE_GAME,
      payload: {
        letter,
        isTip,
      }
    });
  }

  const onFindNewPokemon = useCallback(async () => {
    const randomId = randomIntFromInterval(1, MAX_POKEMON_COUNT);

    try {
      const pokemonData = await fetchPokemon(randomId);

      dispatchGameState({
        type: EnumGameState.RESET_GAME,
        payload: {
          pokemonData,
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    console.log('mount');

    const fetchData = async () => {
      const maxPokemonsCount = await getPokemonMaxCount();
      const randomPokemonId = randomIntFromInterval(1, maxPokemonsCount);
      const pokemonData = await fetchPokemon(randomPokemonId);

      return {
        maxPokemonsCount,
        pokemonData,
      };
    };

    fetchData()
      .then(({ maxPokemonsCount, pokemonData }) => {
        MAX_POKEMON_COUNT = maxPokemonsCount;
        isFirstFetchCompleted.current = true;

        dispatchGameState({
          type: EnumGameState.RESET_GAME,
          payload: {
            pokemonData,
          }
        });
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (isFirstFetchCompleted.current && gameState.remainingAttempts === 0) {
      console.log('You lost!');
    } else if (isFirstFetchCompleted.current && gameState.wordInProgress.join('') === gameState.pokemonData.name) {
      console.log('You win!');
    }
  }, [gameState.remainingAttempts, gameState.wordInProgress, gameState.pokemonData.name]);

  return (
    <AppContext.Provider value={{ gameState, onClickLetter, onFindNewPokemon }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext);
}
