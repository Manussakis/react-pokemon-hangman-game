import { useEffect, useState } from 'react';
import { GENERATIONS, IGeneration } from '../../utils/constants';
import { GenerationBarProps } from './types';
import {
  StyledGenerationBarContainer,
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

export const GenerationBar = ({ generation, onChange }: GenerationBarProps) => {
  const [selectedGeneration, setSelectedGeneration] = useState(1);
  const trackFragment = 100 / (GENERATIONS.length - 1)
  const trackWidth = (selectedGeneration * trackFragment) - trackFragment;

  function handleClick(genName: number) {
    setSelectedGeneration(genName);
    onChange(genName);
  }

  useEffect(() => {
    setSelectedGeneration(generation);
  }, [generation]);
  
  return (
    <StyledGenerationBarContainer>
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
                  included={selectedGeneration >= genName}
                  onClick={() => handleClick(genName)}>
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
    </StyledGenerationBarContainer>
  );
}
