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
  padding-top: 0.5rem;
`;

export const StyledCollapsebleButton = styled.button<{isOpen: boolean}>`
  display: inline-block;
  vertical-align: middle;
  padding: 0.2rem 0;
  border: 0;
  background-color: transparent;  
  font-size: 1rem;
  
  svg {
    vertical-align: middle;
    transition: transform 0.2s ease-in-out;
    transform: ${props => props.isOpen ? 'rotate(180deg) translate(0, 2px)' : 'rotate(0) translate(0)'};
  }
`;

export const StyledGenerationBarOuter = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const StyledFooterGenerationBar = styled.div`
  margin-top: 1rem;
  text-align: right;
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
