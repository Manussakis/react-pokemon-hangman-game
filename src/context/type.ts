import { GameActionTypeEnum, GameStatusEnum } from "./enums";

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
};

export type AppContextValue = {
  gameState: GameState;
  onClickLetter: (letter: string, isTip?: boolean) => void;
  onFindNewPokemon: () => void;
  onSubmitTypedName: (name: string) => void;
  onStartGame: () => void;
};

export type GameStateAction = {
  type: GameActionTypeEnum;
  payload?: {
    pokemonData?: PokemonData;
    letter?: string;
    isTip?: boolean;
    typedName?: string;
    status?: GameStatusEnum;
  };
};
