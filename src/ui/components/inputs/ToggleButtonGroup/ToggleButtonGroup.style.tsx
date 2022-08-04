import { styled } from '@mui/material/styles';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
// import { ToggleButtonGroupProps } from './ToggleButtonGroup';

export const ToggleButtonGroupStyled = styled(ToggleButtonGroup)`
    &.MuiToggleButtonGroup-root {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
        gap: ${({ theme }) => theme.spacing(2)};
    }
`;

export const ToggleButtonStyled = styled(ToggleButton)`
    &.MuiToggleButton-root.MuiToggleButtonGroup-groupedHorizontal {
        border-radius: 3px;
        border: 2px solid ${({ theme }) => theme.palette.grey[100]};
        background-color: ${({ theme }) => theme.palette.grey[50]};
        text-transform: none;
        /* algum está selecionado */
        &.Mui-selected {
            background-color: ${({ theme }) => theme.palette.secondary.main};
            color: white;
            border: 2px solid ${({ theme }) => theme.palette.secondary.dark};
            &:hover {
                background-color: ${({ theme }) =>
                    theme.palette.secondary.dark};
            }
        }
    }

    &.MuiToggleButton-root {
        display: grid;
        ${({ theme }) => theme.breakpoints.up('md')} {
            gap: ${({ theme }) => theme.spacing()};
            grid-auto-flow: column;
        }
    }

    i {
        font-size: 25px;
    }
`;
