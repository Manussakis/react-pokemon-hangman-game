import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useAppContext } from '../../contexts/AppContext';
import { Button } from '../Button';
import { Container } from '../Container';
import { ReactComponent as Eye } from '../../assets/eye-icon.svg';
import { ReactComponent as Search } from '../../assets/search-icon.svg';
import { ReactComponent as Restart } from '../../assets/restart-icon.svg';
import { ReactComponent as Back } from '../../assets/arrow-back-icon.svg';
import { GameConclusionProps } from './type';
import { GameStatusEnum } from '../../contexts/AppContext/enums';
import { ButtonTypeEnum } from '../Button/enums';
import { ContainerSizesEnum } from '../Container/enums';
import { FIND_NEW_POKEMON_BUTTON_LABEL, GO_BACK_BUTTON_LABEL, REVEAL_NAME_BUTTON_LABEL, TRY_AGAIN_BUTTON_LABEL } from '../../utils/constants';

import { StyledContent, StyledImage, StyledButtons } from './styles';
import './styles.scss';

// https://github.com/reactjs/react-modal/issues/632#issuecomment-378755186
if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#root');
}

const customStyles = {
  content: {
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    border: '0',
    borderRadius: '0',
    backgroundColor: 'transparent'
  },
};

export const GameConclusion = ({ result }: GameConclusionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { 
    gameState: { status }, 
    onFindNewPokemon, 
    onTryAgain,
    onRevealPokemonName,
    onChangeGameStatus,
  } = useAppContext();

  let content;

  function close() {
    setIsOpen(false);
  }

  function handleFindNewPokemon() {
    onFindNewPokemon();
    close();
  }

  function handleTryAgain() {
    onTryAgain();
    close();
  }

  function handleRevealPokemonName() {
    onRevealPokemonName();
    close();
  }

  function handleCloseGameConclusion() {
    if (status === GameStatusEnum.WON) {
      onChangeGameStatus(GameStatusEnum.STANDBY_WON);
    } else {
      onChangeGameStatus(GameStatusEnum.STANDBY_LOST);
    }
    
    close();
  }

  useEffect(() => {
    if (result === GameStatusEnum.WON || result === GameStatusEnum.LOST) {
      setIsOpen(true);
    }
  }, [result])

  if (result === GameStatusEnum.WON) {
    content = <StyledContent>
      <StyledImage src="https://media2.giphy.com/media/xuXzcHMkuwvf2/giphy.gif" alt="Pikachu is sad" />
      <h2>You're a Pokémon expert!</h2>
      <p>Let's see how you do with the next Pokémon.</p>
      <StyledButtons>
        <Button 
          type={ButtonTypeEnum.PRIMARY}
          icon={<Search />}
          onClick={handleFindNewPokemon}
          ariaLabel={FIND_NEW_POKEMON_BUTTON_LABEL}
        >
          {FIND_NEW_POKEMON_BUTTON_LABEL}
        </Button>
        <Button 
          icon={<Back />}
          type={ButtonTypeEnum.LINK} 
          onClick={() => handleCloseGameConclusion()}
          ariaLabel={GO_BACK_BUTTON_LABEL}
        >
          {GO_BACK_BUTTON_LABEL}
        </Button>
      </StyledButtons>
    </StyledContent>
  } else if (result === GameStatusEnum.LOST) {
    content = <StyledContent>
      <StyledImage src="https://media3.giphy.com/media/L95W4wv8nnb9K/giphy.gif" alt="Pikachu is happy" />
      <h2>Game Over!</h2>
      <p>You can either try again or reveal the Pokémon name.</p>
      <StyledButtons>
        <Button 
          icon={<Restart />}
          type={ButtonTypeEnum.PRIMARY}
          onClick={handleTryAgain}
          ariaLabel={TRY_AGAIN_BUTTON_LABEL}
        >
          {TRY_AGAIN_BUTTON_LABEL}
        </Button>
        <Button
          icon={<Eye />}
          type={ButtonTypeEnum.PRIMARY}
          onClick={handleRevealPokemonName}
          disabled={status === GameStatusEnum.REVEALED}
          ariaLabel={REVEAL_NAME_BUTTON_LABEL}
        >
          {REVEAL_NAME_BUTTON_LABEL}
        </Button>
      </StyledButtons>
    </StyledContent>
  }

  return (
    <>
      <img style={{display: 'none'}} src="https://media3.giphy.com/media/L95W4wv8nnb9K/giphy.gif" alt="" />
      <img style={{display: 'none'}} src="https://media2.giphy.com/media/xuXzcHMkuwvf2/giphy.gif" alt="" />
      <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseGameConclusion}
        overlayClassName="game-conclusion__overlay"
        style={customStyles}
        contentLabel="Game result"
        // https://github.com/reactjs/react-modal/issues/632#issuecomment-421114610
        ariaHideApp={process.env.NODE_ENV !== 'test'}
      >
        <Container size={ContainerSizesEnum.SMALL}>
          {content}
        </Container>
      </Modal>
    </>
  );
}
