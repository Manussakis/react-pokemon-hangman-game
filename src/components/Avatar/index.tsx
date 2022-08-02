import { AvatarProps } from './types';

import { StyledAvatar, StyledImage, StyledPokeball } from './style';

export const Avatar = ({ flavorText, image, isLoading }: AvatarProps) => {
  return (
    <StyledAvatar>
      {isLoading ? (
        <StyledPokeball />
      ) : (
        <StyledImage src={image} alt={flavorText} />
      )}
    </StyledAvatar>
  );
}
