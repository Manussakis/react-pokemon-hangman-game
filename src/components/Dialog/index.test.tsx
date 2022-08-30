import { useRef } from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { Dialog } from '.';
import { Button } from '../Button';
import { DialogContextProvider } from '../../contexts/DialogContext'
import { ButtonTypeEnum } from '../Button/enums';

const mockOnConfirm = jest.fn();

const WrapperComponent = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return(
    <DialogContextProvider>
      <Button ref={buttonRef} type={ButtonTypeEnum.PRIMARY}>
        Open Dialog
      </Button>
      <Dialog triggerRef={buttonRef} onConfirm={mockOnConfirm} />
    </DialogContextProvider>
  );
};

async function renderAndOpenDialog() {
  render(<WrapperComponent />);

  const openButton = screen.getByRole('button', { name: /open dialog/i })

  fireEvent.click(openButton);

  const dialog = await screen.findByRole('dialog');

  return { dialog };
}

describe('Dialog component', () => {
  test('opens', async () => {
    const { dialog } = await renderAndOpenDialog();

    expect(dialog).toBeInTheDocument();
  });

  test('cancels', async () => {
    const { dialog } = await renderAndOpenDialog();
    const cancelButton = within(dialog).getByRole('button', { name: /cancel/i })

    fireEvent.click(cancelButton);

    expect(dialog).not.toBeInTheDocument();
  });

  test('confirms', async () => {
    const { dialog } = await renderAndOpenDialog();
    const confirmButton = within(dialog).getByRole('button', { name: /confirm/i })

    fireEvent.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(dialog).not.toBeInTheDocument();
  });
});
