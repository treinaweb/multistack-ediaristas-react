import { styled } from '@mui/material/styles';
import { Chip } from '@mui/material';
// import { ChipFieldProps } from './ChipField';

export const ChipsContainer = styled('ul')`
    display: flex;
    gap: ${({ theme }) => theme.spacing(2)};
    flex-wrap: wrap;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(2)};
    margin: 0;
    border-radius: ${({ theme }) => theme.shape.borderRadius};
    background-color: ${({ theme }) => theme.palette.grey[50]};
    border: 1px solid ${({ theme }) => theme.palette.grey[100]};
    list-style-type: none;
    box-sizing: border-box;
    color: ${({ theme }) => theme.palette.text.secondary};
    min-height: 68px;
`;

export const ChipStyled = styled(Chip)`
    &.MuiChip-root {
        height: auto;
        padding: ${({ theme }) => theme.spacing() + ' ' + theme.spacing(2)};
        border: 1px solid ${({ theme }) => theme.palette.grey[100]};
        border-radius: ${({ theme }) => theme.shape.borderRadius};
        color: ${({ theme }) => theme.palette.text.secondary};
        background-color: white;
    }

    .MuiChip-label {
        padding: 0;
        white-space: pre-wrap;
    }

    .MuiChip-deleteIcon {
        font-size: 14px;
        margin-left: ${({ theme }) => theme.spacing(3)};
    }
`;
