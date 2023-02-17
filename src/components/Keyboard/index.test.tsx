import { fireEvent, render, screen } from '@testing-library/react';
import { Keyboard } from './index';
import { AppContext, AppContextProvider, gameStateInitialValue } from '../../contexts/AppContext';
import { GameStatusEnum } from '../../contexts/AppContext/enums';
import { AppContextValue } from '../../contexts/AppContext/type';

const mockOnClickLetter = jest.fn();
const appContexValue: AppContextValue = {
  gameState: {...gameStateInitialValue},
  hasError: false,
  isLoadingPokemon: false,
  onClickLetter: mockOnClickLetter,
  onFindNewPokemon: () => {},
  onTryAgain: () => {},
  onStartGame: () => {},
  onChangeGeneration: () => {},
};

describe('Keyboard component', () => {
  test('has 26 letters', () => {
    render(
      <AppContextProvider>
        <Keyboard />
      </AppContextProvider>
    );

    const keys = screen.getAllByRole('button');

    expect(keys.length).toEqual(26);
  });

  test('is disabled', () => {
    appContexValue.gameState.status = GameStatusEnum.WON;

    render(
      <AppContext.Provider value={{...appContexValue}}>
        <Keyboard />
      </AppContext.Provider>
    );

    const wrapper = screen.getByTestId('keyboard-wrapper');

    expect(wrapper).toHaveAttribute('aria-hidden', 'true');
  });

  test('invokes onClickLetter if keyboard is pressed', async () => {
    render(
      <AppContext.Provider value={{...appContexValue}}>
        <Keyboard />
      </AppContext.Provider>
    );

    fireEvent.keyDown(document, { key: 'p' });

    expect(mockOnClickLetter).toHaveBeenCalledTimes(1);    
  });
});
