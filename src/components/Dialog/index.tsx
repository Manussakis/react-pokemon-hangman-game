import Modal from 'react-modal';
import { ButtonTypeEnum } from '../Button/enums';
import { Button } from '../Button';
import { DialogProps } from './types';
import { useEffect } from 'react';
import { useDialogContext } from '../../contexts/DialogContext';

import './style.scss';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.3)',
    border: '0',
    borderRadius: '8px',
    padding: '2rem',
    maxWidth: '24rem',
  },
};

export const Dialog = ({
  title,
  label,
  children,
  cancelButton = 'Cancel',
  confirmButton = 'Confirm',
  onConfirm,
  triggerRef,
}: DialogProps) => {
  const { isOpen, open, close } = useDialogContext();

  useEffect(() => {
    let trigger: HTMLElement;

    if (triggerRef.current) {
      trigger = triggerRef.current;

      trigger.addEventListener('click', open);
    }

    return () => {
      if (trigger) {
        trigger.removeEventListener('click', open);
      }
    }
  });

  function handleOnConfirm() {
    onConfirm();
    close();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={close}
      style={customStyles}
      contentLabel={label}
    >
      {title && (
        <header>
          <h2 className="dialog__title">{title}</h2>
        </header>
      )}
      {children}
      <footer className="dialog__footer">
        <Button type={ButtonTypeEnum.LINK} onClick={() => close()}>{cancelButton}</Button>
        <Button type={ButtonTypeEnum.PRIMARY} onClick={handleOnConfirm}>{confirmButton}</Button>
      </footer>
    </Modal>
  )
}
