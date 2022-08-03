import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders author link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Gabriel Manussakis/i);
  expect(linkElement).toBeInTheDocument();
});
