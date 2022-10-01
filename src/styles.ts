import styled from "styled-components";

export const StyledError = styled.div`
  text-align: center;
  padding-top: 2rem;
`;

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

export const StyledHeaderTop = styled.div`
  margin-top: 1rem;
`;

export const StyledHeaderBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-top: 1rem;
`;

export const StyledMain = styled.main`
  padding-bottom: 3rem;
`;

export const StyledButtons = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;

  button:first-of-type {
    margin-bottom: 1rem;
  }
`;

export const StyledFooter = styled.footer`
  text-align: center;
  background-color: var(--darksurface);
  margin-top: auto;
  padding-top: 2rem;
  padding-bottom: 1rem;
`;

export const StyledFooterContent = styled.p`
  margin-top: 2rem;
`;
