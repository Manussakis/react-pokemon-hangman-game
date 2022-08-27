import { WordInProgressProps } from './types';
import { StyledList, StyledItem } from './styles';

export const WordInProgress = ({ wordInProgress }: WordInProgressProps) => {
  return (
    <StyledList aria-label="word in progress">
      {wordInProgress.map((slot, index) => {
        const dashModifier = slot === '-';

        // Using index in the key property shouldn't be a problem here since
        // the order of the letters will never change.
        const key = `slot-${index}`;

        return (
          <StyledItem key={key} hasDash={dashModifier}>
            {slot}
          </StyledItem>
        );
      })}
    </StyledList>
  )
}
