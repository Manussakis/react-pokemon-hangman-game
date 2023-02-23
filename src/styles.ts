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

export const StyledHomeButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  background-color: transparent;
  border: 0;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);

  svg {
    width: 100%;
  }
`;

export const StyledHeaderTop = styled.div`
  margin-top: 0.6rem;
  margin-bottom: 0.1rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-align: center;
  position: relative;
`;

export const StyledHeaderBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-top: 0.5rem;
`;

export const StyledMain = styled.main`
  padding-bottom: 3rem;
`;

export const StyledButtons = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;

  button {
    margin-bottom: 1rem;
  }

  button:last-of-type {
    margin-bottom: 0;
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
