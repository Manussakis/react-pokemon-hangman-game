import { useRef, useState } from 'react';
import { useAppContext } from './contexts/AppContext';
import { DialogContextProvider } from './contexts/DialogContext';
import { GenerationBar } from './components/GenerationBar';
import { Keyboard } from './components/Keyboard';
import { WordInProgress } from './components/WordInProgress';
import { Avatar } from './components/Avatar';
import { AttemptsDisplay } from './components/AttemptsDisplay';
import { Button } from './components/Button';
import { Dialog } from './components/Dialog';
import { Introduction } from './components/Introduction';
import { GameConclusion } from './components/GameConclusion';
import { Container } from './components/Container';
import { Divider } from './components/Divider';
import { ReactComponent as Github } from './assets/github-icon.svg';
import { ReactComponent as ExpandMore } from './assets/expand-more-icon.svg';
import { GameStatusEnum } from './contexts/AppContext/enums';
import { ButtonTypeEnum } from './components/Button/enums';
import { DividerSpacingEnum } from './components/Divider/enums';
import { randomIntFromInterval } from './utils/functions';

import {
  StyledWrapper,
  StyledHeaderTop,
  StyledHeaderBottom,
  StyledCollapsebleButton,
  StyledGenerationBarOuter,
  StyledFooterGenerationBar,
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
      generation,
    },
    isLoadingPokemon,
    hasError,
    onFindNewPokemon,
    onClickLetter,
    onTryAgain,
  } = useAppContext();

  const [isGenerationBarOpen, setIsGenerationBarOpen] = useState(false);
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
            <header>
              <StyledHeaderTop>
                <StyledCollapsebleButton
                  aria-label={isGenerationBarOpen ? 'Collapse generation bar' : 'Expand generation bar'}
                  isOpen={isGenerationBarOpen}
                  onClick={() => setIsGenerationBarOpen(() => !isGenerationBarOpen) }>
                    Generation <span className="font-bold">{generation}</span> <ExpandMore />
                </StyledCollapsebleButton>
              </StyledHeaderTop>              
              {isGenerationBarOpen && (
                <StyledGenerationBarOuter>
                  <GenerationBar></GenerationBar>
                  <StyledFooterGenerationBar>
                    <Button type={ButtonTypeEnum.PRIMARY} onClick={() => setIsGenerationBarOpen(false)}>
                      Close
                    </Button>
                  </StyledFooterGenerationBar>
                </StyledGenerationBarOuter>
              )}
              <Divider spacing={DividerSpacingEnum.SM} />
              <StyledHeaderBottom>
                <AttemptsDisplay remainingAttempts={remainingAttempts} />
                <Button type={ButtonTypeEnum.PRIMARY} onClick={handleUseMyTip} disabled={useTipDisabled}>
                  {hasTip ? 'Use my tip' : 'Tip was used'}
                </Button>
              </StyledHeaderBottom>
            </header>
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
          <Button type={ButtonTypeEnum.PRIMARY} icon={<Github />} href="https://github.com/manussakis/react-pokemon-hangman-game">
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
