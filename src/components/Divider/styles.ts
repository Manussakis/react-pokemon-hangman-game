import styled from 'styled-components';
import { DividerSpacingEnum } from './enums';
import { DividerProps } from './types';

export const StyledDivider = styled.div<DividerProps>`
    position: relative;
    padding: ${props => props.spacing === DividerSpacingEnum.SM ? '0.5rem' : DividerSpacingEnum.MD ? '2rem' : 0};

    &:after {
        content: '';
        position: absolute;
        height: 1px;
        top: 50%;
        right: 0;
        left: 0;
        transform: translateY(-50%);
        background-color: rgba(0, 0, 0, 0.1);
    }
`;