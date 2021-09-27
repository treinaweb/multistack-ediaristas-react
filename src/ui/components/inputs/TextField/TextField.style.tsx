import { styled } from '@mui/material/styles';
import { TextField, TextFieldProps } from '@mui/material';
// import { TextFieldProps } from './TextField';

export const TextFieldStyled = styled(TextField)<TextFieldProps>`
    .MuiInputBase-root {
        background-color: ${({ theme }) => theme.palette.grey[50]};
    }
    .MuiOutlinedInput-notchedOutline {
        border-color: ${({ theme }) => theme.palette.grey[100]};
    }
`;
