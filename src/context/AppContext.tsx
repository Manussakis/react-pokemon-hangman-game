import { createContext, ReactElement, useContext, useEffect, useCallback, useReducer, useRef } from 'react';
import { getPokemonMaxCount, fetchPokemon } from '../api';
import { MAX_ATTEMPTS } from '../library/constants';
import { randomIntFromInterval, getPokemoImageUrl, setThreeDigits } from '../library/utils';

export interface PokemonData {
  name: string;
  image: string;
};

interface GameState {
  pokemonData: PokemonData;
  wordInProgress: string[];
  guesses: string[];
  remainingAttempts: number;
}

interface AppContextValue {
  gameState: GameState;
  onClickLetter: (letter: string) => void;
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
      }

    case EnumGameState.UPDATE_GAME:
      const { pokemonData, wordInProgress, guesses } = state;
      const newWordInProgress: string[] = [...wordInProgress];
      const newGuesses: string[] = [...guesses];
      const letter = action.payload?.letter as string;
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
      }
    default:
      throw new Error("This action type doesn't exist.")
  }
};

const gameStateInitialValue = {
  pokemonData: {
    name: '',
    image: '',
  },
  wordInProgress: [],
  guesses: [],
  remainingAttempts: MAX_ATTEMPTS,
};

let MAX_POKEMON_COUNT: number;

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const isFirstFetchCompleted = useRef(false);
  const [gameState, dispatchGameState] = useReducer(gameStateRuducer, gameStateInitialValue);

  const onClickLetter = (letter: string) => {
    dispatchGameState({
      type: EnumGameState.UPDATE_GAME,
      payload: {
        letter,
      }
    });
  }

  const onFindNewPokemon = useCallback(async () => {
    const randomId = randomIntFromInterval(1, MAX_POKEMON_COUNT);

    try {
      const { name, id } = await fetchPokemon(randomId);
      const image = getPokemoImageUrl(setThreeDigits(id));

      dispatchGameState({
        type: EnumGameState.RESET_GAME,
        payload: {
          pokemonData: {
            name,
            image,
          }
        }
      });
    } catch(error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    console.log('mount');

    const fetchData = async () => {
      const maxPokemonsCount = await getPokemonMaxCount();
      const randomPokemonId = randomIntFromInterval(1, maxPokemonsCount);
      const { name, id } = await fetchPokemon(648);
      const image = getPokemoImageUrl(setThreeDigits(id));

      const pokemonDataObj = {
        name,
        image,
      }

      console.log(pokemonDataObj);

      return {
        maxPokemonsCount,
        pokemonDataObj,
      };
    };

    fetchData()
      .then(({ maxPokemonsCount, pokemonDataObj }) => {
        MAX_POKEMON_COUNT = maxPokemonsCount;
        isFirstFetchCompleted.current = true;

        dispatchGameState({
          type: EnumGameState.RESET_GAME,
          payload: {
            pokemonData: pokemonDataObj,
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
  }, [gameState.remainingAttempts,gameState.wordInProgress, gameState.pokemonData.name]);

  return (
    <AppContext.Provider value={{ gameState, onClickLetter, onFindNewPokemon }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext);
}
