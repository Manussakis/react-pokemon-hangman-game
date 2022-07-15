import { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import { api } from '../api';
import { MAX_ATTEMPTS } from '../library/constants';

interface AppContextValue {
  word: string[];
  wordInProgress: string[];
  guesses: string[];
  remainingAttempts: number;
  updateWordInProgress: (letter: string) => void;
  updateGuesses: (letter: string) => void;
};

export const AppContext = createContext({} as AppContextValue);

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

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [word, setWord] = useState<string[]>([]);
  const [wordInProgress, setWordInProgress] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [level, setLevel] = useState<LevelEnum>(LevelEnum.Medium);
  const [remainingAttempts, setRemainingAttempts] = useState<number>(remainingAttemptsObj[level]);

  const updateWordInProgress = (letter: string) => {
    const newWordInProgress: string[] = [...wordInProgress];

    if (word.includes(letter)) {
      word.forEach((l, i) => {
        if (l === letter) {
          newWordInProgress[i] = letter;
        }
      })
    } else {
      decreaseRemainingAttempts();
    }

    setWordInProgress(newWordInProgress);
  }

  const updateGuesses = (letter: string) => {
    const newGuesses = [...guesses];

    newGuesses.push(letter);

    setGuesses(newGuesses);
  }

  const decreaseRemainingAttempts = () => {
    setRemainingAttempts((prevRemainingAttempts) => prevRemainingAttempts - 1);
  }

  useEffect(() => {
    console.log(remainingAttempts);

    api().then(data => {
      const word = data.hair_color.split('');
      const wordInProgress = word.map(() => '_');

      setWord(word);
      setWordInProgress(wordInProgress);
    });

  }, []);

  useEffect(() => {
    if (remainingAttempts === 0) {
      console.log('Fim de jogo');
    }
  }, [remainingAttempts])

  return (
    <AppContext.Provider value={{ word, wordInProgress, guesses, remainingAttempts, updateWordInProgress, updateGuesses }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext);
}
