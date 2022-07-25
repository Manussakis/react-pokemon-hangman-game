import { AvatarProps } from './types';

import './style.scss';

export const Avatar = ({ flavorText, image }: AvatarProps) => {
  return (
    <div className="avatar-wrapper">
      <img src={image} alt={flavorText} />
    </div>
  );
}
