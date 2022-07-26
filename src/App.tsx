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
      <main>
        <Container>
          {status === GameStatusEnum.BEFORE_STARTING ? (
            <Introduction />
          ) : (
            <>
              <div className="flex align-center justify-between">
                <AttemptsDisplay remainingAttempts={remainingAttempts} />
                <Button type={ButtonTypeEnum.PRIMARY} onClick={handleUseMyTip} disabled={useTipDisabled}>
                  {hasTip ? 'Use my tip' : 'Tip was used'}
                </Button>
              </div>
              <Avatar image={image} flavorText={flavorText} isLoading={isLoadingPokemon} />
              <WordInProgress wordInProgress={wordInProgress} />
              <Keyboard />
              <div className="text-center">
                <Button ref={buttonRef} type={ButtonTypeEnum.PRIMARY}>Restart</Button>
                <DialogContextProvider>
                  <Dialog title="Confirm restart game?" triggerRef={buttonRef} onConfirm={onFindNewPokemon}>
                    <p>After confirming it, a new random Pokémon will be loaded.</p>
                  </Dialog>
                </DialogContextProvider>
              </div>
              <GameConclusion result={status} />
            </>
          )}
        </Container>
      </main>
    </>
  );
}

export default App;
