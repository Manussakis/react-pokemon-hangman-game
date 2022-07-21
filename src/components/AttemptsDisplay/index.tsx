import { MAX_ATTEMPTS } from '../../library/constants';
import { ReactComponent as Pokeball } from '../../assets/pokeball.svg';
import { ReactComponent as PokeballLight } from '../../assets/pokeball-light.svg';
import './style.scss';

interface AttemptsDisplayProps {
  remainingAttempts: number;
}

export const AttemptsDisplay = ({ remainingAttempts }: AttemptsDisplayProps) => {
  const allPokeballs = Array.from(Array(MAX_ATTEMPTS).keys());

  return (
    <div className="attempts-display">
      <div className="attempts-display__text">
        Attempts - <span className="attempts-display__number">{`${remainingAttempts}/${MAX_ATTEMPTS}`}</span>
      </div>
      <ul className="attempts-display__list">
        {allPokeballs.map((key) => {
          const icon = (key + 1) <= remainingAttempts ?
            <Pokeball className="attempts-display__icon" /> :
            <PokeballLight className="attempts-display__icon" />;

          return (
            <li key={key} className="attempts-display__item">
              {icon}
            </li>
          );
        })}
      </ul>
    </div>
  )
}
