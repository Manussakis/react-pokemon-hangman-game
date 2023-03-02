import { fireEvent, render, screen, within } from '@testing-library/react';
import { GameConclusion } from '.';
import { AppContext, gameStateInitialValue } from '../../contexts/AppContext';
import { GameStatusEnum } from '../../contexts/AppContext/enums';
import { AppContextValue } from '../../contexts/AppContext/type';
import { FIND_NEW_POKEMON_BUTTON_LABEL, TRY_AGAIN_BUTTON_LABEL } from '../../utils/constants';

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
    const findNewPokemonButton = within(dialog).getByLabelText(FIND_NEW_POKEMON_BUTTON_LABEL);

    expect(findNewPokemonButton).toBeInTheDocument();

    fireEvent.click(findNewPokemonButton);

    expect(mockFindNewPokemon).toHaveBeenCalledTimes(1);
  });

  test('renders lost result and tries again', () => {
    const { dialog } = renderWithAppContext(GameStatusEnum.LOST);
    const tryAgainButton = within(dialog).getByLabelText(TRY_AGAIN_BUTTON_LABEL);

    expect(tryAgainButton).toBeInTheDocument();

    fireEvent.click(tryAgainButton);

    expect(mockOnTryAgain).toHaveBeenCalledTimes(1);
  });
});
