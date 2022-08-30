import App from './App';
import { AppContextProvider } from './contexts/AppContext';
import { fireEvent, render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import { PokemonData } from './contexts/AppContext/type';
import { getPokemonMaxCount, fetchPokemon} from './api/index';

const WORD_IN_PROGRESS_NAME = /word in progress/i;
const LOADING_POKEMON_IMAGE_NAME = /loading pokémon/i;

jest.mock('./api/index');

const mockedGetPokemonMaxCount = jest.mocked(getPokemonMaxCount);
const mockedFetchPokemon = jest.mocked(fetchPokemon);

const promiseMaxCount = Promise.resolve(905);
const promisePokemonData: Promise<PokemonData> = Promise.resolve({
  name: 'pikachu',
  image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
  flavorText: 'When several of\nthese Pokémon\ngather, their\felectricity could\nbuild and cause\nlightning storms.',
});

async function initGame() {
  render(
    <AppContextProvider>
      <App />
    </AppContextProvider>
  );

  const startButton = await screen.findByRole('button', { name: /start/i});

  fireEvent.click(startButton);

  await waitForElementToBeRemoved(screen.queryByRole('image', { name: LOADING_POKEMON_IMAGE_NAME }));
}

describe('App', () => {
  beforeEach(() => {
    mockedGetPokemonMaxCount.mockReset();
    mockedFetchPokemon.mockReset();

    mockedGetPokemonMaxCount.mockReturnValueOnce(promiseMaxCount);
    mockedFetchPokemon.mockReturnValueOnce(promisePokemonData);
  });

  test('inits game', async () => {
    await initGame();

    const wordInprogress = screen.getByRole('list', { name: WORD_IN_PROGRESS_NAME });

    expect(wordInprogress).toBeInTheDocument();
  })

  test('shows tip', async () => {
    await initGame();

    const tipButton = screen.getByRole('button', { name: /use my tip/i});

    fireEvent.click(tipButton);

    const wordInprogress = screen.getByRole('list', { name: WORD_IN_PROGRESS_NAME });
    const letters = within(wordInprogress).getAllByRole('listitem');
    const filledElements = letters.filter(item => item.textContent !== '');

    expect(letters).toHaveLength(7);
    expect(filledElements).toHaveLength(1);
  });

  test('loads new Pokémon', async () => {
    await initGame();

    const promiseNewPokemonData: Promise<PokemonData> = Promise.resolve({
      name: 'meganium',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/154.png',
      flavorText: 'The aroma that\nrises from its\npetals contains a\fsubstance that\ncalms aggressive\nfeelings.',
    });

    mockedFetchPokemon.mockReturnValueOnce(promiseNewPokemonData);

    const resetButton = screen.getByRole('button', { name: /load new pokémon/i});

    fireEvent.click(resetButton);

    const modal = await screen.findByRole('dialog');
    const modalConfirmButton = within(modal).getByRole('button', { name: /confirm/i} );

    fireEvent.click(modalConfirmButton);

    await waitForElementToBeRemoved(screen.queryByRole('image', { name: LOADING_POKEMON_IMAGE_NAME }));

    const wordInprogress = screen.getByRole('list', { name: WORD_IN_PROGRESS_NAME });
    const letters = within(wordInprogress).getAllByRole('listitem');

    expect(letters).toHaveLength(8);
  });

  test('renders footer links', async () => {
    render(
      <AppContextProvider>
        <App />
      </AppContextProvider>
    );

    const authorLink = screen.getByText(/gabriel manussakis/i);
    const githubLink = screen.getByRole('link', { name: /github/i });

    expect(authorLink).toHaveAttribute('href', 'https://github.com/manussakis');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/manussakis/react-pokemon-hangman-game');
  });
});
