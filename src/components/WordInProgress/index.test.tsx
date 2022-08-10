import { render, screen } from '@testing-library/react';
import { WordInProgress } from './index';

const wordInProgress = ['n', '-', 'l', 'l'];

describe('WordInProgress component', () => {
  test('loads incomplete word', () => {
    render(<WordInProgress wordInProgress={wordInProgress} />);

    const items = screen.getAllByRole('listitem');
    const nItems = screen.getAllByText(wordInProgress[0]);
    const dashItems = screen.getAllByText(wordInProgress[1]);
    const lItems = screen.getAllByText(wordInProgress[2]);

    expect(items.length).toEqual(wordInProgress.length);
    expect(nItems.length).toEqual(1);
    expect(dashItems.length).toEqual(1);
    expect(lItems.length).toEqual(2);
  });
});
