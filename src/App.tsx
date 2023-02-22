import { useEffect, useRef, useState } from 'react';
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
import { ReactComponent as Home } from './assets/home-icon.svg';
import { GameStatusEnum } from './contexts/AppContext/enums';
import { ButtonTypeEnum } from './components/Button/enums';
import { DividerSpacingEnum } from './components/Divider/enums';
import { randomIntFromInterval } from './utils/functions';

import {
  StyledWrapper,
  StyledHomeButton,
  StyledHeaderTop,
  StyledHeaderBottom,
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
    onFindNewPokemon,
    onClickLetter,
    onTryAgain,
    onChangeGeneration,
    onChangeGameStatus,
    onResetGame,
  } = useAppContext();

  const [selectedGeneration, setSelectedGeneration] = useState(generation);
  const loadNewPokemonBtnRef = useRef<HTMLButtonElement>(null);
  const resetBtnRef = useRef<HTMLButtonElement>(null);
  const useTipDisabled = !hasTip || status === GameStatusEnum.WON || status === GameStatusEnum.LOST;

  function handleUseMyTip() {
    const hiddenLetters = name.split('').filter(l => !wordInProgress.includes(l));
    const letter = hiddenLetters[randomIntFromInterval(0, hiddenLetters.length - 1)];

    onClickLetter(letter, true);
  }

  function onChangeGen(generation: number) {
    setSelectedGeneration(generation);
  }

  function onConfirmLoadNewPokemon() {           
    if (selectedGeneration === generation) {
      onFindNewPokemon(); 
    } else {
      onChangeGeneration(selectedGeneration);
      onFindNewPokemon(selectedGeneration);
    }
  }

  function onCancelLoadNewPokemon() {    
    setSelectedGeneration(generation);
    onChangeGameStatus(GameStatusEnum.RUNNING);
  }

  function onOpenLoadNewPokemonModal() {
    onChangeGameStatus(GameStatusEnum.PAUSED);
  }

  useEffect(() => {    
    setSelectedGeneration(generation);   
  }, [generation]);

  return (
    <StyledWrapper>
      <Container>
      {status === GameStatusEnum.BEFORE_STARTING ? (
        <Introduction />
      ) : (
        status === GameStatusEnum.ERROR ? (
          <StyledError style={{paddingTop: '1rem'}}>
            Ops! Something went wrong <br />
            It was not possible to load a Pokémon
          </StyledError>
        ) : (
          <>
            <header>
              <StyledHeaderTop>
                <StyledHomeButton ref={resetBtnRef} aria-label="Go back to home">
                  <Home />
                </StyledHomeButton>
                Generation <span className="font-bold">{generation}</span>                
              </StyledHeaderTop>
              <Divider spacing={DividerSpacingEnum.SM} />
              <StyledHeaderBottom>
                <AttemptsDisplay remainingAttempts={remainingAttempts} />
                <Button type={ButtonTypeEnum.PRIMARY} onClick={handleUseMyTip} disabled={useTipDisabled}>
                  {hasTip ? 'Use my tip' : 'Tip was used'}
                </Button>
              </StyledHeaderBottom>
            </header>
            <StyledMain>
              <Avatar image={image} flavorText={flavorText} isLoading={status === GameStatusEnum.LOADING} />
              <WordInProgress wordInProgress={wordInProgress} />
              <Keyboard />
              <StyledButtons>
                {status === GameStatusEnum.LOST && <Button type={ButtonTypeEnum.PRIMARY} onClick={onTryAgain}>Try again</Button>}
                <Button ref={loadNewPokemonBtnRef} type={ButtonTypeEnum.PRIMARY}>Load new Pokémon</Button>
                <DialogContextProvider>
                  <Dialog 
                    title="Are you sure?" 
                    triggerRef={loadNewPokemonBtnRef} 
                    onOpen={onOpenLoadNewPokemonModal}
                    onConfirm={onConfirmLoadNewPokemon}
                    onCancel={onCancelLoadNewPokemon}
                    confirmButton="Yes, confirm"
                    cancelButton="No, cancel">
                      <p>If you want, change the Generation.<br />After confirming it, a new random Pokémon will be loaded.</p>
                    <GenerationBar generation={generation} onChange={onChangeGen} />
                  </Dialog>
                </DialogContextProvider>
                <DialogContextProvider>
                  <Dialog 
                    title="Are you sure?" 
                    triggerRef={resetBtnRef} 
                    onConfirm={() => onResetGame(generation)}
                    confirmButton="Yes, confirm"
                    cancelButton="No, cancel">
                      <p>Your current game will be reset.</p>
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
