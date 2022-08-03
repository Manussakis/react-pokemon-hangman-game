import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { AppContextProvider } from './contexts/AppContext';

describe('App', () => {
  render(<AppContextProvider><App /></AppContextProvider>);

  test('renders footer links', () => {
    const authorLink = screen.getByText('Gabriel Manussakis');
    const githubLink = screen.getByRole('link', { name: /Github/i });

    expect(authorLink).toHaveAttribute('href', 'https://github.com/manussakis');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/manussakis/react-pokemon-hangman-game');
  });
})


