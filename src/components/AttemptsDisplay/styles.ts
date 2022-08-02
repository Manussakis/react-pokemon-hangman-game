import styled, { css } from 'styled-components';
import { ReactComponent as Pokeball } from '../../assets/pokeball.svg';
import { ReactComponent as PokeballLight } from '../../assets/pokeball-light.svg';

export const StyledText = styled.div`
  margin-bottom: 6px;
`;

export const StyledNumber = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
`;

export const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
`;

export const StyledItem = styled.li`
  margin-left: 2px;
`;

const iconSizes = css`
  width: 20px;
  height: 20px;
`;

export const StyledPokeball = styled(Pokeball)`
  ${iconSizes}
`;

export const StyledPokeballLight = styled(PokeballLight)`
  ${iconSizes}
`;
