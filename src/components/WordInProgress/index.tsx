import { WordInProgressProps } from './types';

import './style.scss';


export const WordInProgress = ({ wordInProgress }: WordInProgressProps) => {
  return (
    <ul className='word-in-progress'>
      {wordInProgress.map((slot, index) => {
        const dashModifier = slot === '-' ? ' word-in-progress__item--has-dash' : '';

        // Using index in the key property shouldn't be a problem here since
        // the order of the letters will never change.
        const key = `slot-${index}`;

        return (
          <li key={key} className={`word-in-progress__item${dashModifier}`}>
            {slot}
          </li>
        );
      })}
    </ul>
  )
}
