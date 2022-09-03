import { GENERATIONS, IGeneration } from '../../utils/constants';
import {
  StyledGenerationBarWrapper,
  StyledRail,
  StyledTrack,
  StyledGenerationBar,
  StyledGenerationButton,
  StyledPokemonTotal,
  StyledGenerationItem,
  StyledGenerationMarker,
  StyledGenerationLine,
} from './styles';

export const GenerationBar = () => {
  const trackWidth = 50;
  return (
    <>
      Generations
      <StyledGenerationBarWrapper>
        <StyledRail>
        <StyledTrack width={trackWidth} />
        </StyledRail>
        <StyledGenerationBar>
          {GENERATIONS.map((gen: IGeneration) => {
            return (
              <StyledGenerationItem key={`gen-${gen.name}`}>
                <StyledGenerationButton>{gen.name}</StyledGenerationButton>
                <StyledPokemonTotal>{gen.pokemonsTotal}</StyledPokemonTotal>
                <StyledGenerationMarker />
              </StyledGenerationItem>
            );
          })}
        </StyledGenerationBar>
        <StyledGenerationLine />
        <p>Total Pokémons in generation</p>
      </StyledGenerationBarWrapper>
    </>
  );
}
