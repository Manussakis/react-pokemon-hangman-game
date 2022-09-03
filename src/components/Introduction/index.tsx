import { useAppContext } from '../../contexts/AppContext';
import { Button } from '../Button';
import { ButtonTypeEnum } from '../Button/enums';
import { GenerationSelector } from '../GenerationSelector'

import { StyledWrapper, StyledPokeball, StyledContent } from './styles';

export const Introduction = () => {
  const { onStartGame } = useAppContext();

  return (
    <StyledWrapper>
      <StyledPokeball />
      <h1>Can you spell any Pokémon name?</h1>
      <StyledContent>
        <p>This is a Pokémon version of the hangman game.</p>
        <p>A random Pokémon will appear, can you spell its name correctly? You'll have 6 attemps to do that.</p>
        <p className="font-bold">Good luck!</p>
        <hr />
        <GenerationSelector></GenerationSelector>
      </StyledContent>
      <Button type={ButtonTypeEnum.PRIMARY} onClick={() => onStartGame()}>Start</Button>
    </StyledWrapper>
  )
}
