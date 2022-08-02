import styled, {css} from 'styled-components';

import { ButtonTypeEnum } from './enums';
import { StyledButtonType, StyledLinkButtonType } from './types';

const buttonDisabledStyle = css`
  opacity: 0.2;
  cursor: not-allowed;
`;

const buttonBaseStyle = css`
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  font-weight: 600;
  font-size: 0.9rem;
  line-height: 1.5;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  color: var(--primary);

  &[disabled] {
    ${buttonDisabledStyle}
  }
`;

const buttonPrimaryStyle = css`
  position: relative;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: var(--white);
  transform: translate(0px, 0px);
  transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
  text-decoration: none;
  border: 2px solid var(--primary);
  box-shadow: 2px 2px 0 var(--primary);

  &:hover,
  &:focus {
    box-shadow: 1px 1px 0 var(--primary);
    transform: translate(1px, 1px);
  }

  &:active,
  &[disabled] {
    box-shadow: 0px 0px 0 var(--primary);
    transform: translate(2px, 2px);
  }

  @media only screen and (min-width: 550px) {
    box-shadow: 4px 4px 0 var(--primary);

    &:hover,
    &:focus {
      box-shadow: 2px 2px 0 var(--primary);
      transform: translate(2px, 2px);
    }

    &:active,
    &[disabled] {
      box-shadow: 1px 1px 0 var(--primary);
      transform: translate(3px, 3px);
    }
  }
`;

const buttonLinkStyle = css`
  border: 0;
  background-color: transparent;
`;

export const StyledLinkButton = styled.a<StyledLinkButtonType>`
  ${buttonBaseStyle}

  ${(props) => (props.buttonType === ButtonTypeEnum.PRIMARY && buttonPrimaryStyle)}
  ${(props) => (props.buttonType === ButtonTypeEnum.LINK && buttonLinkStyle)}
  ${(props) => (props.isDisabled && buttonDisabledStyle)}
`;

export const StyledButton = styled.button<StyledButtonType>`
  ${buttonBaseStyle}

  ${(props) => (props.buttonType === ButtonTypeEnum.PRIMARY && buttonPrimaryStyle)}
  ${(props) => (props.buttonType === ButtonTypeEnum.LINK && buttonLinkStyle)}
`;

export const StyledButtonIcon = styled.span`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
  display: inline-block;
  vertical-align: middle;
`;

export const StyledButtonText = styled.span`
  display: inline-block;
  vertical-align: middle;
`;
