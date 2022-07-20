import './style.css';

interface WordInProgressProps {
  wordInProgress: string[];
}

export const WordInProgress = ({wordInProgress}: WordInProgressProps) => {
  return (
    <ul className='word-in-progress'>
      {wordInProgress.map((slot, index) => {
        const dashModifier = slot === '-' ? ' word-in-progress__item--has-dash' : '';
        return (
          // Using index in the key property shouldn't be a problem here since
          // the order of the letters will never change.
          <li key={`slot-${index}`} className={`word-in-progress__item${dashModifier}`}>
            {slot}
          </li>
        );
      })
      }
    </ul>
  )
}
