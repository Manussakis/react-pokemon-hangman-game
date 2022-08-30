import { AvatarProps } from './types';

import { StyledAvatar, StyledImage, StyledPokeball } from './styles';

export const Avatar = ({ flavorText, image, isLoading }: AvatarProps) => {
  return (
    <StyledAvatar>
      {isLoading ? (
        <StyledPokeball role="image" aria-label="Loading Pokémon" />
      ) : (
        <StyledImage src={image} alt={flavorText} />
      )}
    </StyledAvatar>
  );
}
