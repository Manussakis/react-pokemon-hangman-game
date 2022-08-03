import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useAppContext } from '../../contexts/AppContext';
import { Button } from '../Button';
import { Container } from '../Container';
import { GameConclusionProps } from './type';
import { GameStatusEnum } from '../../contexts/AppContext/enums';
import { ButtonTypeEnum } from '../Button/enums';
import { ContainerSizesEnum } from '../Container/enums';

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

  const { onFindNewPokemon, onTryAgain } = useAppContext();

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
        <Button type={ButtonTypeEnum.PRIMARY} onClick={handleFindNewPokemon}>Next Pokémon</Button>
        <Button type={ButtonTypeEnum.LINK} onClick={() => close()}>Close</Button>
      </StyledButtons>
    </StyledContent>
  } else if (result === GameStatusEnum.LOST) {
    content = <StyledContent>
      <StyledImage src="https://media3.giphy.com/media/L95W4wv8nnb9K/giphy.gif" alt="Pikachu is happy" />
      <h2>Game Over!<br />Your available attempts have gone.</h2>
      <p>You can either try again or load a new Pokémon.</p>
      <StyledButtons>
        <Button type={ButtonTypeEnum.PRIMARY} onClick={handleTryAgain}>Try again</Button>
        <Button type={ButtonTypeEnum.PRIMARY} onClick={handleFindNewPokemon}>Load new Pokémon</Button>
        <Button type={ButtonTypeEnum.LINK} onClick={() => close()}>Close</Button>
      </StyledButtons>
    </StyledContent>
  }

  return (
    <>
      <img style={{display: 'none'}} src="https://media3.giphy.com/media/L95W4wv8nnb9K/giphy.gif" alt="" />
      <img style={{display: 'none'}} src="https://media2.giphy.com/media/xuXzcHMkuwvf2/giphy.gif" alt="" />
      <Modal
        isOpen={isOpen}
        onRequestClose={close}
        overlayClassName="game-conclusion__overlay"
        style={customStyles}
        contentLabel="Game result"
      >
        <Container size={ContainerSizesEnum.SMALL}>
          {content}
        </Container>
      </Modal>
    </>
  );
}
