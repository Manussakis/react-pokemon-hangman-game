import { render, screen, fireEvent } from '@testing-library/react';
import { Introduction } from './index';
import { AppContext, gameStateInitialValue } from '../../contexts/AppContext';
import { AppContextValue } from '../../contexts/AppContext/type';

const onFindNewPokemon = jest.fn();

const appContexValue: AppContextValue = {
  gameState: {...gameStateInitialValue},
  onClickLetter: () => {},
  onFindNewPokemon,
  onTryAgain: () => {},
  onChangeGeneration: () => {},
  onChangeGameStatus: () => {},
  onResetGame: () => {},
  onRevealPokemonName: () => {},
}

const renderComponent = () => {
  return render(
    <AppContext.Provider value={{...appContexValue}}>
      <Introduction />
    </AppContext.Provider>
  );
}

describe('Introduction component', () => {
  test('renders H1',  () => {
    renderComponent();

    const h1 = screen.getByRole('heading', { level: 1 });

    expect(h1).toBeInTheDocument();
  });

  test('calls function by clicking on the button', () => {
    renderComponent();

    const button = screen.getByRole('button', { name: 'Start'});

    fireEvent.click(button);

    expect(onFindNewPokemon).toBeCalledTimes(1);
  });
});
