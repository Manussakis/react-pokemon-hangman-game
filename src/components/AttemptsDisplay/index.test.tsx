import { render, screen } from '@testing-library/react';
import { AttemptsDisplay } from './index';
import { MAX_ATTEMPTS } from '../../utils/constants';

describe('AttemptsDisplay component', () => {
  test('loads available attempts', () => {
    const remainingAttempts = 2;
    const availableIcon = 'pokeball.svg';
    const displayText = `${remainingAttempts}/${MAX_ATTEMPTS}`;

    render(<AttemptsDisplay remainingAttempts={remainingAttempts} />);

    const usedAttempts = screen.getByText(displayText);
    const allAvailableAttemptsIcon = screen.getAllByText(availableIcon);

    expect(usedAttempts).toBeInTheDocument();
    expect(allAvailableAttemptsIcon.length).toEqual(remainingAttempts);
  });
});
