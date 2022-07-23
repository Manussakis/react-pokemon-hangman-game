import { ChangeEvent, useCallback, useEffect, useRef } from 'react';
import './style.scss';

interface WordInProgressProps {
  wordInProgress: string[];
  acceptInput?: boolean;
  onType?: (letter: string, index: number) => void;
}

export const WordInProgress = ({ wordInProgress, acceptInput, onType }: WordInProgressProps) => {
  let focusableElements = useRef<HTMLInputElement[]|null>(null);

  const lettersWrapperRef = useCallback((ul: HTMLUListElement) => {
    if (ul !== null && acceptInput) {
      focusableElements.current = Array.from(ul.querySelectorAll('input[type="text"]'));
    }
  }, [acceptInput]);

  function focusNextInput(currentInput: HTMLInputElement) {
    if (focusableElements.current) {
      const currentIndex = focusableElements.current.indexOf(currentInput);
      const nextInput = focusableElements.current[currentIndex + 1];

      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>, index: number) {
    const targetValue = e.target.value.trim();

    if (targetValue.length === 1) {
      focusNextInput(e.target);
    } else if (targetValue.length > 1) {
      e.target.value = targetValue[0];
      focusNextInput(e.target);
    }

    if (onType) {
      onType(targetValue[0], index);
    }
  }

  useEffect(() => {
    if (acceptInput && focusableElements.current) {
      focusableElements.current[0].focus();

      console.log(focusableElements.current[0]);
    }
  }, [acceptInput]);

  return (
    <ul className='word-in-progress' ref={lettersWrapperRef}>
      {wordInProgress.map((slot, index) => {
        const dashModifier = slot === '-' ? ' word-in-progress__item--has-dash' : '';

        // Using index in the key property shouldn't be a problem here since
        // the order of the letters will never change.
        const key = `slot-${index}`;

        if (acceptInput) {
          return (
            <li key={key} className={`word-in-progress__item${dashModifier}`}>
              {slot ? (
                <span className="word-in-progress__item--blocked">{slot}</span>
              ) : (
                <input key={key} type="text" className="word-in-progress__input" onChange={(e) => handleChangeInput(e, index)} />
              )}
            </li>
          );
        }

        return (
          <li key={key} className={`word-in-progress__item${dashModifier}`}>
            {slot}
          </li>
        );
      })}
    </ul>
  )
}
