import App from './App';
import { gameStateInitialValue, AppContext } from './contexts/AppContext';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppContextValue } from './contexts/AppContext/type';
import { GameStatusEnum } from './contexts/AppContext/enums';

const startButtonText = /start/i;

const mockOnClickLetter = jest.fn();
const mockOnFindNewPokemon = jest.fn();
const mockOnTryAgain = jest.fn();
const mockOnStartGame = jest.fn();

const appContexValue: AppContextValue = {
  gameState: {
    ...gameStateInitialValue,
    pokemonData: {
      name: 'pikachu',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
      flavorText: 'When several of\nthese POKéMON\ngather, their\felectricity could\nbuild and cause\nlightning storms.',
    },
    wordInProgress: ['', '', '', '', '', '', ''],
  },
  hasError: false,
  isLoadingPokemon: false,
  onClickLetter: mockOnClickLetter,
  onFindNewPokemon: mockOnFindNewPokemon,
  onTryAgain: mockOnTryAgain,
  onStartGame: mockOnStartGame,
}

const renderApp = (contextValue: AppContextValue) => (
  render(
    <AppContext.Provider value={{...contextValue}}>
      <App />
    </AppContext.Provider>
  )
);

describe('App', () => {
  test('renders introduction',  () => {
    renderApp(appContexValue);

    const h1 = screen.getByRole('heading', { level: 1 });
    const startButton = screen.getByRole('button', { name: startButtonText });
    const loadNewPokemonButton = screen.queryByRole('button', { name: /load new pokémon/i });

    expect(h1).toBeInTheDocument();
    expect(startButton).toBeInTheDocument();
    expect(loadNewPokemonButton).toBeNull();
  });

  test('calls "onStartGame" when clicking on the "Start" button', async ()=> {
    renderApp(appContexValue);

    const startButton = screen.getByRole('button', { name: startButtonText });

    userEvent.click(startButton);

    expect(mockOnStartGame).toHaveBeenCalledTimes(1);
  });

  test('rendes running game', () => {
    const contextValue = {
      ...appContexValue,
      gameState: {
        ...appContexValue.gameState,
        status: GameStatusEnum.RUNNING
      },
    };

    renderApp(contextValue);

    const keyboard = screen.getByTestId('keyboard-wrapper');

    expect(keyboard).toBeInTheDocument();

    const testButton = screen.getByRole('button', { name: /tip/i });

    fireEvent.click(testButton);

    expect(mockOnClickLetter).toHaveBeenCalledTimes(1);
  });

  test('renders footer links', () => {
    renderApp(appContexValue);

    const authorLink = screen.getByText(/gabriel manussakis/i);
    const githubLink = screen.getByRole('link', { name: /github/i });

    expect(authorLink).toHaveAttribute('href', 'https://github.com/manussakis');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/manussakis/react-pokemon-hangman-game');
  });
})
