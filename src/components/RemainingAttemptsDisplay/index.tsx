import './style.scss';

interface RemainingAttemptsDisplayProps {
  remainingAttempts: number;
}

export const RemainingAttemptsDisplay = ({ remainingAttempts }: RemainingAttemptsDisplayProps) => {
  return (
    <div className="remaining-attempts-display">{remainingAttempts}</div>
  )
}
