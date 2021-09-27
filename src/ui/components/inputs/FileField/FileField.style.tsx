import { styled } from '@mui/material/styles';
// import {  } from '@mui/material';
// import { FileFieldProps } from './FileField';

export const FileContainer = styled('div')`
    position: relative;
    .MuiTextField-root:last-of-type {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
    }
`;

export const UploadIcon = styled('i')`
    color: ${({ theme }) => theme.palette.text.secondary};
`;
