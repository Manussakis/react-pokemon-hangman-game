import Modal from 'react-modal';
import { ButtonTypeEnum } from '../Button/enums';
import { Button } from '../Button';
import { DialogProps } from './types';
import { useEffect } from 'react';
import { useDialogContext } from '../../contexts/DialogContext';

import { StyledTitle, StyledFooter } from './styles';

// https://github.com/reactjs/react-modal/issues/632#issuecomment-378755186
if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#root');
}

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
    maxWidth: '34rem',
  },
};

export const Dialog = ({
  title,
  label,
  children,
  cancelButton = 'Cancel',
  confirmButton = 'Confirm',
  onConfirm,
  onCancel,
  onOpen,
  triggerRef,
}: DialogProps) => {
  const { isOpen, open, close } = useDialogContext();

  function handleOnOpen() {
    open(onOpen);
  }

  useEffect(() => {
    let trigger: HTMLElement;

    if (triggerRef.current) {
      trigger = triggerRef.current;

      trigger.addEventListener('click', handleOnOpen);
    }

    return () => {
      if (trigger) {
        trigger.removeEventListener('click', handleOnOpen);
      }
    }
  });

  function handleOnCancel() {
    if (typeof onCancel === 'function') {
      onCancel();
    }
    close();
  }

  function handleOnConfirm() {
    onConfirm();
    close();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleOnCancel}
      style={customStyles}
      contentLabel={label}
      // https://github.com/reactjs/react-modal/issues/632#issuecomment-421114610
      ariaHideApp={process.env.NODE_ENV !== 'test'}
    >
      {title && (
        <header>
          <StyledTitle>{title}</StyledTitle>
        </header>
      )}
      {children}
      <StyledFooter>
        <Button type={ButtonTypeEnum.LINK} onClick={handleOnCancel}>{cancelButton}</Button>
        <Button type={ButtonTypeEnum.PRIMARY} onClick={handleOnConfirm}>{confirmButton}</Button>
      </StyledFooter>
    </Modal>
  );
}
