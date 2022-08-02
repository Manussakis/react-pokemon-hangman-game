import  styled, { keyframes }  from 'styled-components'
import { ReactComponent as Pokeball } from '../../assets/pokeball.svg';

const RotatingAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const StyledAvatar = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto;
  border-radius: 999px;
  background-color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (min-width: 480px) {
    width: 250px;
    height: 250px;
  }

  @media only screen and (min-width: 550px) {
    width: 300px;
    height: 300px;
  }
`;

export const StyledImage = styled.img`
  display: block;
  width: 100%;
`;

export const StyledPokeball = styled(Pokeball)`
  width: 100px;
  height: 100px;
  animation-name: ${RotatingAnimation};
  animation-duration: 2s;
  animation-iteration-count: infinite;
`;
