import { useRef } from 'react';
import { useAppContext } from './contexts/AppContext';
import { DialogContextProvider } from './contexts/DialogContext';
import { Keyboard } from './components/Keyboard';
import { WordInProgress } from './components/WordInProgress';
import { Avatar } from './components/Avatar';
import { AttemptsDisplay } from './components/AttemptsDisplay';
import { Button } from './components/Button';
import { Dialog } from './components/Dialog';
import { Introduction } from './components/Introduction';
import { GameConclusion } from './components/GameConclusion';
import { Container } from './components/Container';
import { ReactComponent as Github } from './assets/github-icon.svg';
import { GameStatusEnum } from './contexts/AppContext/enums';
import { ButtonTypeEnum } from './components/Button/enums';
import { randomIntFromInterval } from './utils/functions';

import {
  StyledWrapper,
  StyledHeader,
  StyledError,
  StyledMain,
  StyledButtons,
  StyledFooter,
  StyledFooterContent
} from './styles';

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
    hasError,
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
    <StyledWrapper>
      <Container>
      {status === GameStatusEnum.BEFORE_STARTING ? (
        <Introduction />
      ) : (
        hasError ? (
          <StyledError style={{paddingTop: '1rem'}}>
            Ops! Something went wrong <br />
            It was not possible to load a Pokémon
          </StyledError>
        ) : (
          <>
            <StyledHeader>
              <AttemptsDisplay remainingAttempts={remainingAttempts} />
              <Button type={ButtonTypeEnum.PRIMARY} onClick={handleUseMyTip} disabled={useTipDisabled}>
                {hasTip ? 'Use my tip' : 'Tip was used'}
              </Button>
            </StyledHeader>
            <StyledMain>
              <Avatar image={image} flavorText={flavorText} isLoading={isLoadingPokemon} />
              <WordInProgress wordInProgress={wordInProgress} />
              <Keyboard />
              <StyledButtons>
                {status === GameStatusEnum.LOST && <Button type={ButtonTypeEnum.PRIMARY} onClick={onTryAgain}>Try again</Button>}
                <Button ref={buttonRef} type={ButtonTypeEnum.PRIMARY}>Load new Pokémon</Button>
                <DialogContextProvider>
                  <Dialog title="Are you sure?" triggerRef={buttonRef} onConfirm={onFindNewPokemon} confirmButton="Yes, confirm" cancelButton="No, cancel">
                    <p>After confirming it, a new random Pokémon will be loaded.</p>
                  </Dialog>
                </DialogContextProvider>
              </StyledButtons>
            </StyledMain>
            <GameConclusion result={status} />
          </>
        )
      )}
      </Container>
      <StyledFooter>
        <Container>
          <Button type={ButtonTypeEnum.PRIMARY} icon={<Github />} href="https://github.com/manussakis/react-pokemon-game">
            Github
          </Button>
          <StyledFooterContent>
            Made with React by <a href="https://github.com/manussakis">Gabriel Manussakis</a>
          </StyledFooterContent>
        </Container>
      </StyledFooter>
    </StyledWrapper>
  );
}

export default App;
