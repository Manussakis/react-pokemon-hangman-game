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
import { ReactComponent as Eye } from './assets/eye-icon.svg';
import { ReactComponent as Search } from './assets/search-icon.svg';
import { ReactComponent as Restart } from './assets/restart-icon.svg';
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
import { 
  FIND_NEW_POKEMON_BUTTON_LABEL,
  REVEALED_NAME_BUTTON_LABEL,
  REVEAL_NAME_BUTTON_LABEL,
  TRY_AGAIN_BUTTON_LABEL
} from './utils/constants';

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
    onRevealPokemonName,
  } = useAppContext();

  const [selectedGeneration, setSelectedGeneration] = useState(generation);
  const findNewPokemonBtnRef = useRef<HTMLButtonElement>(null);
  const resetBtnRef = useRef<HTMLButtonElement>(null);
  const previousStatus = useRef<GameStatusEnum>(status);
  const useTipDisabled = (
    !hasTip || 
    status === GameStatusEnum.WON || 
    status === GameStatusEnum.LOST || 
    status === GameStatusEnum.REVEALED ||
    status === GameStatusEnum.STANDBY_LOST ||
    status === GameStatusEnum.STANDBY_WON
  );

  function handleUseMyTip() {
    const hiddenLetters = name.split('').filter(l => !wordInProgress.includes(l));
    const letter = hiddenLetters[randomIntFromInterval(0, hiddenLetters.length - 1)];

    onClickLetter(letter, true);
  }

  function onChangeGen(generation: number) {
    setSelectedGeneration(generation);
  }

  function onConfirmFindNewPokemon() {           
    if (selectedGeneration === generation) {
      onFindNewPokemon(); 
    } else {
      onChangeGeneration(selectedGeneration);
      onFindNewPokemon(selectedGeneration);
    }
  }

  function onCancelFindNewPokemon() {    
    setSelectedGeneration(generation);
    onChangeGameStatus(previousStatus.current);
  }

  function onOpenModals() {
    previousStatus.current = status;
    onChangeGameStatus(GameStatusEnum.PAUSED);
  }

  function shouldShowRevealButton() {
    return (
      status === GameStatusEnum.STANDBY_LOST || 
      status === GameStatusEnum.REVEALED
    );
  }

  function shouldShowTryAgainButton() {
    return status === GameStatusEnum.STANDBY_LOST;
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
            It was not possible to find a Pokémon.
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
                {shouldShowTryAgainButton() && (
                  <Button
                    type={ButtonTypeEnum.PRIMARY}
                    onClick={onTryAgain}
                    icon={<Restart />}
                    ariaLabel={TRY_AGAIN_BUTTON_LABEL}
                  >
                    {TRY_AGAIN_BUTTON_LABEL}
                  </Button>)}
                {shouldShowRevealButton() && (
                  <Button
                    icon={<Eye />}
                    type={ButtonTypeEnum.PRIMARY}
                    onClick={onRevealPokemonName}
                    disabled={status === GameStatusEnum.REVEALED}
                    ariaLabel={status === GameStatusEnum.REVEALED ? REVEALED_NAME_BUTTON_LABEL : REVEAL_NAME_BUTTON_LABEL}
                  >
                    {status === GameStatusEnum.REVEALED ? REVEALED_NAME_BUTTON_LABEL : REVEAL_NAME_BUTTON_LABEL}
                  </Button>
                )}                
                  <Button 
                    ref={findNewPokemonBtnRef}
                    type={ButtonTypeEnum.PRIMARY}
                    icon={<Search />}
                    ariaLabel={FIND_NEW_POKEMON_BUTTON_LABEL}
                  >
                    {FIND_NEW_POKEMON_BUTTON_LABEL}
                  </Button>
                <DialogContextProvider>
                  <Dialog 
                    title="Are you sure?" 
                    triggerRef={findNewPokemonBtnRef} 
                    onOpen={onOpenModals}
                    onConfirm={onConfirmFindNewPokemon}
                    onCancel={onCancelFindNewPokemon}
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
                    onOpen={onOpenModals}
                    onConfirm={() => onResetGame(generation)}
                    onCancel={() => onChangeGameStatus(previousStatus.current)}
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
