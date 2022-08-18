import { render, screen, fireEvent } from '@testing-library/react';
import { useRef } from 'react';
import { Button } from '.';
import { ButtonTypeEnum } from './enums';
import { ButtonProps } from './types';

const onClick = jest.fn();

const ButtonWrapper = (buttonProps: ButtonProps) => {
  const ref = useRef(null);
  const { children, ...rest } = buttonProps;

  return (
    <Button {...rest} ref={ref} >
      {children}
    </Button>
  );
};

const renderButton = (props?: { href?: string, disabled?: boolean }) => (
  render(
    <ButtonWrapper {...props} type={ButtonTypeEnum.PRIMARY} onClick={onClick}>
      Click
    </ButtonWrapper>
  )
);

describe('Button component', () => {
  test('calls onClick', () => {
    renderButton();

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(onClick).toBeCalledTimes(1);
  });

  test('renders anchor element', () => {
    renderButton({ href: 'https://guthub.com/manussakis' });

    const linkButton = screen.getByRole('link');

    expect(linkButton).toBeInTheDocument();
  });

  test('is disabled', () => {
    renderButton({ disabled: true });

    const linkButton = screen.getByRole('button');

    expect(linkButton).toHaveAttribute('disabled');
  });
});
