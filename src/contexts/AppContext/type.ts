import { ReactNode } from 'react';
import { GameActionTypeEnum, GameStatusEnum } from "./enums";

export type AppContextProviderProps = {
  children: ReactNode;
}

export type PokemonData = {
  name: string;
  image: string;
  flavorText: string;
};

export type GameState = {
  pokemonData: PokemonData;
  wordInProgress: string[];
  guesses: string[];
  remainingAttempts: number;
  hasTip: boolean;
  status: GameStatusEnum;
  generation: number;
};

export type ErrorObj = {
  message: string;
}

export type AppContextValue = {
  gameState: GameState;
  isLoadingPokemon: boolean;
  hasError: boolean;
  onClickLetter: (letter: string, isTip?: boolean) => void;
  onFindNewPokemon: () => void;
  onTryAgain: () => void;
  onStartGame: () => void;
  onChangeGeneration: (generation: number) => void;
  onChangeGameStatus: (status: GameStatusEnum) => void;
};

export type GameStateAction = {
  type: GameActionTypeEnum;
  payload?: {
    pokemonData?: PokemonData;
    letter?: string;
    isTip?: boolean;
    typedName?: string;
    status?: GameStatusEnum;
    generation?: number;
  };
};
