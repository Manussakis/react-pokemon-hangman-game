import { useState } from 'react';
import Modal from 'react-modal';
import { Keyboard } from './components/Keyboard';
import { WordInProgress } from './components/WordInProgress';
import { Avatar } from './components/Avatar';
import { AttemptsDisplay } from './components/AttemptsDisplay';
import { Button } from './components/Button';
import { ButtonTypeEnum } from './components/Button/enums';
import { NameTyper } from './components/NameTyper';

import { useAppContext } from './context/AppContext';

import './App.css';
import { randomIntFromInterval } from './library/utils';
import { GameStatusEnum } from './context/enums';
import { Introduction } from './components/Introduction';

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
  },
};

function App() {
  const {
    gameState: {
      pokemonData: {
        name,
        image,
        flavorText
      },
      remainingAttempts,
      wordInProgress,
      hasTip,
      status,
    },
    onFindNewPokemon,
    onClickLetter,
    onSubmitTypedName,
  } = useAppContext();

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {

  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleUseMyTip() {
    const hiddenLetters = name.split('').filter(l => !wordInProgress.includes(l));
    const letter = hiddenLetters[randomIntFromInterval(0, hiddenLetters.length - 1)];

    onClickLetter(letter, true);
  }

  function handleSubmitName(typedName: string) {
    setIsOpen(false);
    onSubmitTypedName(typedName);
  }

  return (
    <>
      <main>
        <div className="container">
          {status === GameStatusEnum.BEFORE_STARTING ? (
            <Introduction />
          ) : (
            <>
              <div className="flex align-center justify-between">
                <AttemptsDisplay remainingAttempts={remainingAttempts} />
                <Button type={ButtonTypeEnum.PRIMARY} onClick={handleUseMyTip} disabled={!hasTip}>Use my tip</Button>
              </div>
              <Avatar name={name} image={image} flavorText={flavorText} />
              <WordInProgress wordInProgress={wordInProgress} />
              <div>
                <div>
                  <Keyboard />
                  <div className="text-center">
                    <p className="color-hint">Use the virtual keyboard above or type the name manually.</p>
                    <Button type={ButtonTypeEnum.LINK} onClick={openModal}>Type name</Button>
                  </div>
                </div>
                <div className="text-center">
                  <Button type={ButtonTypeEnum.PRIMARY} onClick={onFindNewPokemon}>Restart</Button>
                </div>
              </div>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <h2>Type the Pokémon name</h2>
                <p>If you fail, one attempt will be decreased.</p>
                <NameTyper wordInProgress={wordInProgress} onSubmitTypedName={handleSubmitName} onCancel={closeModal} />
              </Modal>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
