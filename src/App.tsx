import { useRef } from 'react';

import { Keyboard } from './components/Keyboard';
import { WordInProgress } from './components/WordInProgress';
import { Avatar } from './components/Avatar';
import { AttemptsDisplay } from './components/AttemptsDisplay';
import { Button } from './components/Button';
import { Dialog } from './components/Dialog';
import { Introduction } from './components/Introduction';
import { GameConclusion } from './components/GameConclusion';
import { Container } from './components/Container';

import { GameStatusEnum } from './contexts/AppContext/enums';
import { ButtonTypeEnum } from './components/Button/enums';

import { useAppContext } from './contexts/AppContext';
import { DialogContextProvider } from './contexts/DialogContext';

import { randomIntFromInterval } from './utils/functions';

import './App.css';

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
    isLoadingPokemon,
    onFindNewPokemon,
    onClickLetter,
    onTryAgain,
  } = useAppContext();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const useTipDisabled = !hasTip || status === GameStatusEnum.WON || status === GameStatusEnum.LOST;

  function handleUseMyTip() {
    const hiddenLetters = name.split('').filter(l => !wordInProgress.includes(l));
    const letter = hiddenLetters[randomIntFromInterval(0, hiddenLetters.length - 1)];

    onClickLetter(letter, true);
  }

  return (
    <>
      <div className="app">
        <Container>
          {status === GameStatusEnum.BEFORE_STARTING ? (
            <Introduction />
          ) : (
            <>
              <header className="app__header">
                <AttemptsDisplay remainingAttempts={remainingAttempts} />
                <Button type={ButtonTypeEnum.PRIMARY} onClick={handleUseMyTip} disabled={useTipDisabled}>
                  {hasTip ? 'Use my tip' : 'Tip was used'}
                </Button>
              </header>
              <main>
                <Avatar image={image} flavorText={flavorText} isLoading={isLoadingPokemon} />
                <WordInProgress wordInProgress={wordInProgress} />
                <Keyboard />
                <div className="app__buttons">
                  {status === GameStatusEnum.LOST && <Button type={ButtonTypeEnum.PRIMARY} onClick={onTryAgain}>Try again</Button>}
                  <Button ref={buttonRef} type={ButtonTypeEnum.PRIMARY}>Get new Pokémon</Button>
                  <DialogContextProvider>
                    <Dialog title="Are you sure?" triggerRef={buttonRef} onConfirm={onFindNewPokemon} confirmButton="Yes, confirm" cancelButton="No, cancel">
                      <p>After confirming it, a new random Pokémon will be loaded.</p>
                    </Dialog>
                  </DialogContextProvider>
                </div>
              </main>
              <GameConclusion result={status} />
            </>
          )}
        </Container>
      </div>
    </>
  );
}

export default App;
