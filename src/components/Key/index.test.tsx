import { render, screen, fireEvent } from '@testing-library/react';
import { Key } from './index';
import { KeyProps } from './types';

const letter = 'a';
const onClick = jest.fn();

const props: KeyProps = {
  letter,
  isDisable: false,
  isInWord: false,
  onClick,
};

const renderComponent = () => render(<Key {...props} />);

describe('Key component', () => {
  test('loads letter', () => {
    renderComponent();

    const keyButton = screen.getByRole('button', { name: letter });

    expect(keyButton).toBeInTheDocument();
  });

  test('calls onClick by clicking on button', () => {
    renderComponent();

    const keyButton = screen.getByRole('button');

    fireEvent.click(keyButton);

    expect(onClick).toBeCalledTimes(1);
  });
});



