import React, { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import { api } from '../api';

interface AppContextValue {
  word: string[];
  wordInProgress: string[];
  guesses: string[];
  updateWordInProgress: (letter: string) => void;
  updateGuesses: (letter: string) => void;
};

export const AppContext = createContext({} as AppContextValue);

interface AppContextProviderProps {
  children: ReactElement;
}

export const AppContextProvider = ({children}: AppContextProviderProps) => {
  const [word, setWord] = useState<string[]>([]);
  const [wordInProgress, setWordInProgress] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<string[]>([]);

  const updateWordInProgress = (letter: string) => {
    const newWordInProgress: string[] = [...wordInProgress];

    if (word.includes(letter)) {
      word.forEach((l, i) => {
        if (l === letter) {
          newWordInProgress[i] = letter;
        }
      })
    }

    setWordInProgress(newWordInProgress);
  }

  const updateGuesses = (letter: string) => {
    const newGuesses = [...guesses];

    newGuesses.push(letter);

    setGuesses(newGuesses);
  }

  useEffect(() => {
    api().then(data => {
      const word = data.hair_color.split('');
      const wordInProgress = word.map(() => '_');

      setWord(word);
      setWordInProgress(wordInProgress);
    });

  }, []);

  return (
    <AppContext.Provider value={{word, wordInProgress, guesses, updateWordInProgress, updateGuesses}}>
      { children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext);
}
