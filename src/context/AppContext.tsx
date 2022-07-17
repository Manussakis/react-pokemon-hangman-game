import { createContext, ReactElement, useContext, useEffect, useState, useCallback, useReducer } from 'react';
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

enum LevelEnum {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

const remainingAttemptsObj = {
  [LevelEnum.Easy]: MAX_ATTEMPTS,
  [LevelEnum.Medium]: 6,
  [LevelEnum.Hard]: 3,
};

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
        wordInProgress: pokemonName.split('').map(() => '_'),
        remainingAttempts: remainingAttemptsObj[LevelEnum.Medium],
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
  remainingAttempts: remainingAttemptsObj[LevelEnum.Medium],
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [level, setLevel] = useState<LevelEnum>(LevelEnum.Medium);
  const [maxCount, setMaxCount] = useState<number>(0);
  const [isFirstFetchCompleted, setIsFirstFetchCompleted] = useState(false);
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
    const randomId = randomIntFromInterval(1, maxCount);
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
  }, [maxCount]);

  useEffect(() => {
    console.log('mount');

    const fetchData = async () => {
      const maxPokemonsCount = await getPokemonMaxCount();
      const randomPokemonId = randomIntFromInterval(1, maxPokemonsCount);
      const { name, id } = await fetchPokemon(randomPokemonId);

      const pokemonDataObj = {
        name,
        image: getPokemoImageUrl(setThreeDigits(id)),
      }

      console.log(pokemonDataObj);

      return {
        maxPokemonsCount,
        pokemonDataObj
      };
    };

    fetchData().then(({ maxPokemonsCount, pokemonDataObj }) => {
      setMaxCount(maxPokemonsCount);
      setIsFirstFetchCompleted(true);

      dispatchGameState({
        type: EnumGameState.RESET_GAME,
        payload: {
          pokemonData: pokemonDataObj,
        }
      });
    });
  }, []);

  useEffect(() => {
    if (gameState.remainingAttempts === 0) {
      console.log('You lost!');
    }
  }, [gameState.remainingAttempts]);

  useEffect(() => {
    const { wordInProgress, pokemonData } = gameState;

    if (isFirstFetchCompleted && wordInProgress.join('') === pokemonData.name) {
      console.log('You win!');
    }
  }, [isFirstFetchCompleted, gameState]);

  useEffect(() => {
    console.log(gameState);

  }, [gameState]);

  return (
    <AppContext.Provider value={{ gameState, onClickLetter, onFindNewPokemon }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext);
}
