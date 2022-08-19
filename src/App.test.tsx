import App from './App';
import { AppContextProvider } from './contexts/AppContext';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const startButtonText = 'Start';
const loadNewPokemonButtonText = 'Load new Pokémon';

const renderApp = () => render(<AppContextProvider><App /></AppContextProvider>);

describe('App', () => {
  test('renders introduction', () => {
    renderApp();

    const h1 = screen.getByRole('heading', { level: 1 });
    const startButton = screen.getByRole('button', { name: startButtonText });
    const loadNewPokemonButton = screen.queryByRole('button', { name: loadNewPokemonButtonText });

    expect(h1).toBeInTheDocument();
    expect(startButton).toBeInTheDocument();
    expect(loadNewPokemonButton).toBeNull();
  });

  test('starts game when clicking on the "Start" button', ()=> {
    renderApp();

    const startButton = screen.getByRole('button', { name: startButtonText });

    userEvent.click(startButton);

    const loadNewPokemonButton = screen.getByRole('button', { name: loadNewPokemonButtonText });

    expect(startButton).not.toBeInTheDocument();
    expect(loadNewPokemonButton).toBeInTheDocument();
  });

  test('renders footer links', () => {
    renderApp();

    const authorLink = screen.getByText('Gabriel Manussakis');
    const githubLink = screen.getByRole('link', { name: /Github/i });

    expect(authorLink).toHaveAttribute('href', 'https://github.com/manussakis');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/manussakis/react-pokemon-hangman-game');
  });
})


