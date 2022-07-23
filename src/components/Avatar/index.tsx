import { PokemonData } from '../../context/type';
import './style.scss';

interface AvatarProps extends PokemonData { }

export const Avatar = ({ flavorText, image }: AvatarProps) => {
  return (
    <div className="avatar-wrapper">
      <img src={image} alt={flavorText} />
    </div>
  )
}
