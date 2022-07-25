import { ReactComponent as Pokeball } from '../../assets/pokeball.svg';
import { AvatarProps } from './types';

import './style.scss';

export const Avatar = ({ flavorText, image, isLoading }: AvatarProps) => {
  return (
    <div className="avatar-wrapper">
      {isLoading ? (
        <Pokeball className="avatar__loading-icon" />
      ) : (
        <img src={image} alt={flavorText} />
      )}
    </div>
  );
}
