import { MAX_ATTEMPTS } from '../../library/constants';
import './style.scss';

interface IllustrationProps {
  remainingAttempts: number;
};

export const Illustration = ({ remainingAttempts }: IllustrationProps) => {
  const remainingAttemptsArr = Array.from(Array(MAX_ATTEMPTS - remainingAttempts).keys());

  return (
    <div className="illustration">
      {remainingAttemptsArr.map(el => <div key={el}>{el}</div>)}
    </div>
  );
}
