import { render, screen, fireEvent } from '@testing-library/react';
import { Introduction } from './index';
import { AppContext, gameStateInitialValue } from '../../contexts/AppContext';
import { AppContextValue } from '../../contexts/AppContext/type';

const onStartGame = jest.fn();

const appContexValue: AppContextValue = {
  gameState: gameStateInitialValue,
  hasError: false,
  isLoadingPokemon: false,
  onClickLetter: () => {},
  onFindNewPokemon: () => {},
  onTryAgain: () => {},
  onStartGame,
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

    expect(onStartGame).toBeCalledTimes(1);
  });
});
