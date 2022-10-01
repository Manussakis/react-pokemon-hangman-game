import styled from "styled-components";
import { ReactComponent as Pokeball } from '../../assets/pokeball.svg';

export const StyledWrapper =  styled.div`
  max-width: 34rem;
  width: 100%;
  margin: 0 auto;
  padding-top: 2rem;
  padding-bottom: 3rem;
  text-align: center;

  @media screen and (min-width: 480px) {
    padding-top: 5rem;
    padding-bottom: 5rem;
  }
`;

export const StyledPokeball =  styled(Pokeball)`
  position: relative;
  left: -10px;
  width: 100px;
  height: 100px;
`;

export const StyledContent =  styled.div`
  margin-bottom: 2rem;
`;
