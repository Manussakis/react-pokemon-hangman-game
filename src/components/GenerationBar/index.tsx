import { GENERATIONS, IGeneration } from '../../utils/constants';
import {
  StyledGenerationHeading,
  StyledGenerationBarWrapper,
  StyledRail,
  StyledTrack,
  StyledGenerationBar,
  StyledGenerationButton,
  StyledPokemonTotal,
  StyledGenerationItem,
  StyledGenerationMarker,
  StyledGenerationLine,
  StyledGenerationTotalPokemonsHeading,
} from './styles';

export const GenerationBar = () => {
  const selectedGeneration = +GENERATIONS[3].name;
  const trackFragment = 100 / (GENERATIONS.length - 1)
  const trackWidth = (selectedGeneration * trackFragment) - trackFragment;
  
  return (
    <>
      <StyledGenerationHeading>Generations</StyledGenerationHeading>
      <StyledGenerationBarWrapper>
        <StyledRail>
          <StyledTrack width={trackWidth} />
        </StyledRail>
        <StyledGenerationBar>
          {GENERATIONS.map((gen: IGeneration) => {
            const genName = +gen.name;
            const pokemonsTotal = gen.pokemonsTotal;
            
            return (
              <StyledGenerationItem key={`gen-${genName}`}>
                <StyledGenerationButton
                  aria-label={`Generation ${genName}, total of ${pokemonsTotal} Pokémons.`}
                  included={selectedGeneration >= genName}>
                    {genName}
                </StyledGenerationButton>
                <StyledPokemonTotal>{gen.pokemonsTotal}</StyledPokemonTotal>
                <StyledGenerationMarker />
              </StyledGenerationItem>
            );
          })}
        </StyledGenerationBar>
        <StyledGenerationLine />
        <StyledGenerationTotalPokemonsHeading>Total Pokémons in generation</StyledGenerationTotalPokemonsHeading>
      </StyledGenerationBarWrapper>
    </>
  );
}
