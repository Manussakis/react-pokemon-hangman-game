import styled from "styled-components";

export const StyledImage = styled.img`
  display: block;
  width: 100%;
  margin-top: 2rem;
`;

export const StyledButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;

  & > * {
    margin-bottom: 1rem;
  }
`;
