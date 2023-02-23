import { fireEvent, render, screen, within } from '@testing-library/react';
import { GameConclusion } from '.';
import { AppContext, gameStateInitialValue } from '../../contexts/AppContext';
import { GameStatusEnum } from '../../contexts/AppContext/enums';
import { AppContextValue } from '../../contexts/AppContext/type';

const mockOnTryAgain = jest.fn();
const mockFindNewPokemon = jest.fn();

const appContexValue: AppContextValue = {
  gameState: {...gameStateInitialValue},
  onClickLetter: () => {},
  onFindNewPokemon: mockFindNewPokemon,
  onTryAgain: mockOnTryAgain,
  onChangeGeneration: () => {},
  onChangeGameStatus: () => {},
  onResetGame: () => {},
  onRevealPokemonName: () => {},
}

const renderWithAppContext = (result: GameStatusEnum) => {
  render(
    <AppContext.Provider value={{...appContexValue}}>
      <GameConclusion result={result} />
    </AppContext.Provider>
  );

  const dialog = screen.getByRole('dialog');

  return { dialog };
};

describe('GameConclusion component', () => {
  test('renders won result and keeps playing', () => {
    const { dialog } = renderWithAppContext(GameStatusEnum.WON);
    const nextButton = within(dialog).getByRole('button', {name: /next pokémon/i});

    expect(nextButton).toBeInTheDocument();

    fireEvent.click(nextButton);

    expect(mockFindNewPokemon).toHaveBeenCalledTimes(1);
  });

  test('renders lost result and tries again', () => {
    const { dialog } = renderWithAppContext(GameStatusEnum.LOST);
    const tryAgainButton = within(dialog).getByRole('button', {name: /try again/i});

    expect(tryAgainButton).toBeInTheDocument();

    fireEvent.click(tryAgainButton);

    expect(mockOnTryAgain).toHaveBeenCalledTimes(1);
  });

  test('closes', () => {
    const { dialog } = renderWithAppContext(GameStatusEnum.LOST);
    const closeButton = within(dialog).getByRole('button', {name: /close/i});

    fireEvent.click(closeButton);

    expect(dialog).not.toBeInTheDocument();
  });
});
